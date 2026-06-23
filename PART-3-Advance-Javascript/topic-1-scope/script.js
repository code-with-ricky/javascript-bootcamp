// Scope -> determines the accessibility (visibility) of variables
// kaha tak hum apne variables and functions ko use kr skte hai -> that is its scope

// 3 types of scope -> functional scope, global scope and block scope
// functional scope -> can be used inside parent function only
// global scope -> can be used anywhere in the entire code
// block scope -> can be used inisde {} curly braces


// if your code is not inisde any {}, then its in global scope
var myNum = 20;  // it is global scoped variable


function myFunc() {
    var x = 10; // functional scope
    console.log("Inside myFunc: ", x);  // here we can access x
}
// console.log("Outside myFunc: ", x);  // here we cannot access x, we get ReferenceError: x is not defined

myFunc();


// BLOCK SCOPE:
// Before ES6, JavaScript variables could only have Global Scope or Function Scope.
// ES6 introduced two important new JavaScript keywords: let and const.
// These two keywords provide Block Scope in JavaScript.
// Variables declared with let and const inside a code block are "block-scoped," meaning they are only accessible within that block.
{
    const myName = "Amrik"; // block scoped // accessible inside this curly braces itself
    console.log(myName);
}
// console.log(myName); // here we get ReferenceError as let and const has block scope

const isLoggedIn = true;
if(isLoggedIn) {
    const username = "Ricky"; // block scope
    console.log(`${username} logged in!`);
}else{
    const username = "User";  // block scope
    console.log(`${username} not logged in`);
}



{
    var petName = "Tommy";  // var has function scope, so curly braces {} doesnot create scope for petName
}
console.log('Outside {}: ', petName); // therefore its accessible here