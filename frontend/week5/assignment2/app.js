// assignment 1
console.log("ASSIGNMENT 1 BELOW");


let numbers = [2, 4, 6, 8, 10, 12];
for(let i = 0 ; i < numbers.length ; i++){
    console.log(numbers[i]*numbers[i]);
}

// assignment 2
console.log("ASSIGNMENT 2 BELOW");

let prices = [500, 1200, 999, 2500, 750];
const calculateDiscount = price => price - (price*0.15)
prices.forEach(price=>console.log(calculateDiscount(price)))

// assignment 3
console.log("ASSIGNMENT 3 BELOW");

let users = [
  { name: "Aman", age: 16 },
  { name: "Priya", age: 22 },
  { name: "Rahul", age: 18 },
  { name: "Neha", age: 14 },
  { name: "Karan", age: 27 }
];


users.forEach(user=>user.age>17?console.log(user.name):null)

// assignment 4
console.log("ASSIGNMENT 4 BELOW");

let employees = [
  { name: "Aman", salary: 50000 },
  { name: "Priya", salary: 75000 },
  { name: "Rahul", salary: 62000 },
  { name: "Neha", salary: 48000 },
  { name: "Karan", salary: 90000 }
];

const calculateNetSalary = (name,salary) => salary - (salary*0.15)

employees.forEach(employee=>{
    const inHand = calculateNetSalary(employee.name,employee.salary);
    console.log(`Employee name: ${employee.name}\nEmployee salary: ${employee.salary}\nEmployee In Hand salary: ${inHand}`);
})

// assignment 5
console.log("ASSIGNMENT 5 BELOW");

let users2 = [
  { name: "Aman", age: 16 },
  { name: "Priya", age: 22 },
  { name: "Rahul", age: 18 },
  { name: "Neha", age: 14 },
  { name: "Karan", age: 27 },
  { name: "Simran", age: 31 },
  { name: "Vikram", age: 45 },
  { name: "Riya", age: 19 }
];

console.log("Total users: ", users2.length);

let adults = 0, minors = 0, oldestUserAge = 0, oldestUserName = 0, totalAgeOfUsers = 0;

users2.forEach(user=>{
    totalAgeOfUsers+=user.age
    if(user.age>17)adults++
    else minors++
    if(oldestUserAge<user.age){
        oldestUserAge=user.age
        oldestUserName=user.name
    }
})


console.log("Number of adults (18+) ", adults);
console.log("Number of minors (<18) ", minors);
console.log("Name of the oldest user ", oldestUserName);
console.log("Average age of all users ", totalAgeOfUsers/users2.length);

