const prompt = require('prompt-sync')();

const employees = [
    {name: 'John', salary: {basic: 20000, bonus: 5000}},
    {name: 'Alice', salary: {basic: 25000}},
    {name: 'Bob'},
    {name: 'Carol', salary: {basic: 30000, bonus: 10000}},  
];

// console.log('hello ')

function getEmployeeSalary(employeeName) {
   
    const emp = employees.find(emp => emp.name === employeeName);

    if(!emp){
        return `Employee ${employeeName} not found.`;
    }
    if(!emp.salary || !emp.salary.basic){
        return `Salary details not available for ${employeeName}.`;
    }
    return `Total salary of ${employeeName} is ${emp.salary.basic + (emp.salary.bonus || 0)}`;
}

//  const details = getEmployeeSalary('John');   // To call the fn.  Also, the fn. is returning somthing, so we need to store it in a variable.

const name = prompt('Enter employee name: ');  // To take input from the user
const details = getEmployeeSalary(name);  // To call the function with user input
 console.log(details);  // To print the result of the function call