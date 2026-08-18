let shoppingList = [
    "Milk",
    "Eggs",
    "Bread",
    ["Apples", "Bananas", "Oranges"],
    ["Potatoes", "Tomatoes", "Onions"]
];

// array Tasks
console.log(shoppingList[0]);
shoppingList.push("Carrots")
console.log(shoppingList);
shoppingList.pop()
console.log(shoppingList);
shoppingList[4].splice(1,2,"Cucumbers","Bell Peppers")
console.log(shoppingList);

// object tasks

let student = {
    name: "Amit",
    age: 20,
    grade: "A",
    address: {
        street: "123 Main St",
        city: "Anytown",
        country: "India"
    }
};

console.log(student.name);
student.phone = "123-456-7890"
console.log(student.phone);
delete student.grade;
console.log(student);
student.age = 21
console.log(student.age);


// conditinals task

// task 1
function numberType(num){
    if(num>0){
        return "Positive";
    }else if(num<0){
        return "Negative";
    }else{
        return "Zero";
    }
}

console.log(numberType(34));
console.log(numberType(-34));
console.log(numberType(0));


// task 2
const student1 = 34
const student2 = 94
const student3 = 64
const student4 = 84

function calcGrade(num){
    if(num>89){
        return "A"
    }else if(num>79){
        return "B"
    }else if(num>69){
        return "C"
    }else if(num>59){
        return "D"
    }else{
        return "F"
    }
}

console.log(calcGrade(student1));
console.log(calcGrade(student2));
console.log(calcGrade(student3));
console.log(calcGrade(student4));


// task 3

function isTruthy(str){
    if(!str.length){
        return "Falsy"
    }else{
        return "Truthy"
    }
}

console.log(isTruthy("Anuj"));
console.log(isTruthy(""));









