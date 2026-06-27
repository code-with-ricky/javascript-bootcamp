// variables

var a = 12;  // global variable
console.log("a:",a);

// Note: a = 12 can be used to declare variable and assign value but don't use it 

var b; // declaration
b = 30;
var c = 45; // initialize: pehli value dena

// issue of var
// can be redeclared again and error will not come
var a = 500;
console.log("a:", a);

// function scoped hota hai
function demo(){
    var x = 56; // can be used anuwhere inside this function
                // functional scope

    if(x == 56){
        var y = 100; // can be accessed outside the block (inside the demo function anywhere)
                    // block
    }
}


// reassign
var t = 5;
t = 54;

let s = 56;
s = 67

// re delaration
var m = 56;
var m = 54;

let n = 90;
// let n = 45;  // not allowed; will give error



// Temporal dead zone
// console.log(username);   // gives: ReferenceError: Cannot access 'username' before initialization
//                         // js knows username is there but he thinks its not initialised so it cannot be accessed in this place
// let username = 'Amrik'; // here we initialise it

// hoisted
console.log(password);  // here it gives 'undefined'
                        // variable password gets hoisted

var password = 'password@123';


// console.log(userid)   // ReferenceError: Cannot access 'userid' before initialization
// const userid = 404;
