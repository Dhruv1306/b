// Date:- 19.07.2025

const employees = [
    {name: 'John', salary: {basic: 20000, bonus: 5000}},
    {name: 'Alice', salary: {basic: 25000}},
    {name: 'Bob'},
    {name: 'Carol', salary: {basic: 30000, bonus: 10000}},  
];

const employeesName = 'John';  // The name of the employee to check about

// TASK:-  In the code, we only try to check wheather the employee exists or not.


// 1. Normal fn.   /   Synchronous fn.

const detail = check(employees, employeesName);  // here, we are passing the entire "employees array"  NOT the "employee Object" and the "name of the employee" to check.
console.log(detail);

function check(employees, employeesName){         // Named fn.
    console.log(employees.name); // employees is an array, so employees.name is undefined
    return employees.name === employeesName;  // undefined === 'John' is false. Therefore it will return false.
}

/* How to solve it  

i)We need to loop throught the array
ii) We can use the find method to search for the employee in the array. For this , we need the "Arrow fn."
*/


// 2. Arrow fn.

const details = employees.find(emp => check(emp, employeesName));  // It will LOOPS through each employee in the "employees" array & call the CHECK function to find the employee.
console.log(details);

/* 
here, "emp", is the "employee object" that we are passing to the check function. 
.find returns the first "employee object" that matches, or undefined if none match. */


// 3. Asynchronous fn.

const detailsAsync = employees.find(function(emp){      // Unnamed fn.
    console.log(emp.name);  
    return emp.name === employeesName;  // This will return the first employee object that matches the name.
});
console.log(detailsAsync);