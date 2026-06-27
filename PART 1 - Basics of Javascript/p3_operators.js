// Arithematic Operators
// +, -, *, %, /, **

console.log(4 + 2);
console.log(4 - 2);
console.log(4 * 2);
console.log(4 / 2);  // quotient
console.log(4 % 2);  // remainder
console.log(4 ** 2); // exponentiation --> power

// comparison operators
// ==, ===, !=, !==, >=, <=, >, <
// == : it checks just value and not type
// === : it checks value and type both
console.log(12 == 12)     // true
console.log(12 === 12)    // true
console.log(12 == "12")   // true
console.log(12 === "12")  // false

console.log(12 != 13)      // false
console.log(12 !== "12");  // true
console.log(12 != "12");   // false

console.log(12 > 5);
console.log(12 < 23);
console.log(22 <= 22);

// assignment operator: =, +=, -=, *=, /=, **=, %=
let a = 45;
a += 3;
a -= 8;
a /= 4;
a %= 4;
a **= 2;

// Logical Operators: &&, ||, !
// && --> both condition true --> then true else false
// || --> either condition true --> then true else false
// !  --> if true then false --> if false then true


// Unary operators --> works with one operand only
// ++, --, typeof, + , - , !

// if you have a string which is having a number eg: "10", "565" etc
console.log(+"565");  // this becomes 565 as number
console.log(typeof +"565");
console.log(+"amrik");  // NaN

// if you want to negate any value, add '-' in front of it
let x = 100;
let y = -x;
console.log(y);

// a++ --> post increment --> first use then increment
// ++a --> pre increment --> first increment then use
// --a --> pre decrement --> first decrease then use
// a-- --> post decrement --> first use then decrease


// Ternary operators --> ? :

// condition ? true case code : false case code
console.log(12 > 13 ? "true" : "faaah!");


// instanceof  --> works with reference types only and not primitive
// typeof is used only with primitive type
let arr = [45,43,25];
console.log(arr instanceof Array);  // true

let b = {};
console.log(b instanceof Object); // true
console.log(b instanceof Array); // false

let n = 32;
console.log(n instanceof Number);  // false
console.log(typeof n == 'number'); // true

