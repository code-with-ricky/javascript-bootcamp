// function statement
function add(a, b){
    console.log("Sum =", a + b);
}

// function expression
let multiply = function(a, b){
    return a * b;
}

// arrow function
let checkIsAdult = (age) => {
    return age >= 18 ? true : false;
}

// function definition has parameters
// function call has arguments
add(4, 5);
console.log(multiply(2, 3));
console.log("Is I am adult? :", checkIsAdult(45));


// default values in function
// why needed
// function opt(val1, val2){
//     console.log(val1 + val2); // undefined + undefined = NaN
// }

// opt(); // passed nothing, therefore val1 = undefine, val2 = undefined

function opt(val1 = 0, val2 = 0){
    console.log(val1 + val2); // undefined + undefined = NaN
}
opt();  // 0
opt(1); // 1
opt(1,2); // 3


// Rest & Spread operators (...)
// Rest Operator --> when used in function parameters
function acceptNumbers(...nums){
    console.log(nums);
}

acceptNumbers(1, 2, 3);
acceptNumbers(30)
acceptNumbers(100, 200, 300, 400, 500);


function acceptNumbersV2(a, b, c, ...remaining){
    console.log(a, b, c, remaining);
}
acceptNumbersV2(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// Spread Operator --> when used with arrays and objects


// First Class Functions --> functions ko values ki tarah treat car skte h
// example 1
let greetings = function(){
    console.log("Hello");
}

//example 2: can pass function as other function's paramter
function demo(greet){
    greet();
}
demo(function(){
    console.log("Good morning");
});


// Higher Order Function: Function who accepts function as parameter or returns a function as return value
function parent(){
    return function child(){
        console.log("I am child");
    }
}
parent()();


// Pure vs impure function
// Pure --> function that doesnot change outside value
let a = 10;
function abcd(a){
    console.log(a);
}
abcd(a);
console.log(a);

// Impure --> function that cchanges outside value
function xyz(a){
    return ++a;
}
a = xyz(a);
console.log(a);



// Closures  --> a setup of parent child function setup in which parent function returns a child function and child function need to use any of parent function's variable
function closureDemo(){
    let a = 1200;
    return function(){
        console.log(a);
    }
}
closureDemo()();

// lexical scoping
// 'a' accessible inside fun1, fun2, fun3
// 'b' accessible inside fun2 and fun3
// 'c' accessible inside fun3
function fun1(){
    let a = 12;
    console.log("fun1 - a:", a);
    function fun2(){
        let b = 13;
        console.log("fun2 - a:", a);
        console.log("fun2 - b:", b);
        function fun3(){
            let c = 14;
            console.log("fun3 - a:", a);
            console.log("fun3 - b:", b);
            console.log("fun3 - c:", c);
        }
    }
}


// IIFE (Immediately Invoked Function Expression)
(
    function(){
        console.log("This is IIFE");
    }
)();


// Hoisting in functions
// function statements / declaration can be hoisted

hoistedFuncCall()

function hoistedFuncCall(){
    console.log("Hello");
}

// function expressions are not hoisted

// printName("Amrik"); // ReferenceError: Cannot access 'printName' before initialization

let printName = function(name){
    console.log("My name is", name);
}

// printAge(56); // ReferenceError: Cannot access 'printAge' before initialization

let printAge = (age) => {
    console.log(age);
}