// "use strict";  // this is global

// The "use strict" directive was new in ECMAScript version 5.
// It defines that JavaScript code should be executed in "strict mode".

// x = 3.14; // gives ReferrenceError: x is not defined


// now temporarily comment line 1
// then run below
x = 3.14;  // this will not cause error
myFunc();

function myFunc() {
    "use strict";
    // y = 22;  // this will cause error
}


/*
    NOT ALLOWED IN STRICT MODE

    -> Using a variable, without declaring it
    -> Using an object, without declaring it
    -> Deleting a variable (or object) is not allowed.
    -> Deleting a function is not allowed.
    -> Duplicating a parameter name is not allowed
    -> Octal numeric literals are not allowed
    -> Octal escape characters are not allowed
    -> Writing to a read-only property is not allowed
    -> Writing to a get-only property is not allowed
    -> Deleting an undeletable property is not allowed
    -> The word eval cannot be used as a variable
    -> The word arguments cannot be used as a variable
    -> The with statement is not allowed
    
*/


// Writing to a read-only property is not allowed
const obj = {};
Object.defineProperty(obj, "x", {value: 0, writable: false});
obj.x = 3.14;  // this will cause error