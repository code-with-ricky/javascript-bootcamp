// Primitive types
// 1. String: '', "", ``(backticks)
let username = "amrik_bhadra";
let nickname = 'ricky';
let gender = `male`;

// 2. number
let age = 45;
let pi = 3.14;

// 3. boolean
let isAdult = true;
let isMinor = false;

// 4. null --> means you knowingly didnot give its value
// aage jaake value kya h pta chalegi
// value null set krna prta h, by default nhi hoti
let noOfTrophies = null;

// 5. undefined --> variable create kiya but value assign nhi ki so bydefault jo value milta h
let myVal = undefined;

// 6. symbol  --> unique immutable value
// future mei hum koi libraries use krenge ab is case mei un libraries mei kai baar kchh fields hoti hai jinse similar hum bhi bana dete hai aur galti se humari banai hui fields us lib ki original fields ko change kr dete hai

let u1 = Symbol("uid")
let u2 = Symbol("uid");
console.log(u1 === u2);  // false

// 7. bigint
let bigNumber = 9007199254740991n;  // attach 'n'
bigNumber += bigNumber + 5n;
console.log(bigNumber);

// Number.max_integer
// Number.max_safe_integer

// ----------------------------------------------------


// dynamic typing: js does not have static typing, like we have for other languages
// whatever value we put in variable, it becomes of that data type
let a = 5;
console.log(typeof a);  // number
a = "Amrik";
console.log(typeof a);  // string
a = true;
console.log(typeof a);  // boolean


// typeof quirk


// type coercion --> concept jisme k type automatically convert ho jaega
let val = "5" + 1;  // 51
console.log("val:", 5, "; typeof val:", typeof val);

// '+' does 2 things "concat" or "addition"
// if any of the operand is string it will do concatenation else addition

// "5" - 1  = 4 


// Truthy vs Falsy values
// 0, false, "", null, undefined, NaN, document.all --> falsy
if(null){
    console.log('if block runs');
}else{
    console.log('else block runs');
}

console.log(true + false);
console.log(null + 1);
console.log(5 + "5");
console.log(!!undefined);
