// Your code here
function createEmployeeRecord(array){
    const [firstName, familyName, title, payPerHour] = array;
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };    
}

function createEmployeeRecords(array){
    return array.map(createEmployeeRecord)
}

function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date,
    });
    return employee;
  }
  
function createTimeOutEvent(employee, dateStamp){
    const [date, hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });
    return employee
}

function hoursWorkedOnDate(empObj, date){
    //find date of In and Out Event
    let inEvent = empObj.timeInEvents.find(function(e){
        return e.date === date
    })
    let outEvent = empObj.timeOutEvents.find(function(e){
        return e.date === date
    })
    return (outEvent.hour - inEvent.hour) / 100
}
function wagesEarnedOnDate(empObj, date) {
    let wages = empObj.payPerHour * hoursWorkedOnDate(empObj, date)
    return wages
}

function allWagesFor(empObj){
    //get all the clock in dates
    let dates = empObj.timeInEvents.map(function(e){
        return e.date
    })
    // return aggregate pay for all dates
    let totalWages = dates.reduce(function(memo, date){
        return memo + wagesEarnedOnDate(empObj, date)
    }, 0)
    return totalWages
}

function findEmployeeByFirstName(srcArray, firstName) {
   return srcArray.find(function(empObj){
       return empObj.firstName === firstName
   })
}

function calculatePayroll(srcArray){
    return srcArray.reduce(function(memo, empObj) {
        return memo + allWagesFor(empObj)
    }, 0)
}