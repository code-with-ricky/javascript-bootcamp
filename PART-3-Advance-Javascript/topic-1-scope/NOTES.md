# Advanced JavaScript

## Scope

### What is Scope?

Scope determines the accessibility (visibility) of variables and functions in your code.

In simple terms:

> Scope defines where a variable or function can be accessed or used.

---

## Types of Scope

JavaScript has three main types of scope:

1. Global Scope
2. Function Scope
3. Block Scope

---

## 1. Global Scope

A variable declared outside of any function or block belongs to the global scope.

Global variables can be accessed from anywhere in the program.

```javascript
var myNum = 20; // Global Scope

function showNumber() {
    console.log(myNum);
}

showNumber(); // 20
console.log(myNum); // 20
```

---

## 2. Function Scope

Variables declared with `var`, `let`, or `const` inside a function are accessible only within that function.

```javascript
function myFunc() {
    var x = 10; // Function Scope

    console.log("Inside myFunc:", x);
}

myFunc(); // 10

// console.log(x);
// ReferenceError: x is not defined
```

### Key Point

A function creates its own scope.

Variables declared inside a function cannot be accessed outside that function.

---

## 3. Block Scope

A block is any code enclosed within curly braces `{}`.

Examples:

```javascript
if (true) {
    // block
}

for (let i = 0; i < 5; i++) {
    // block
}

{
    // block
}
```

ES6 introduced `let` and `const`, which are block-scoped.

Variables declared with `let` or `const` inside a block can only be accessed within that block.

```javascript
{
    const myName = "Amrik";

    console.log(myName); // Amrik
}

// console.log(myName);
// ReferenceError: myName is not defined
```

---

### Example: Block Scope in if-else

```javascript
const isLoggedIn = true;

if (isLoggedIn) {
    const username = "Ricky";

    console.log(`${username} logged in!`);
} else {
    const username = "User";

    console.log(`${username} not logged in`);
}
```

The `username` variable exists only inside its respective block.

---

## var and Block Scope

A common misconception is that `var` is block-scoped.

It is NOT.

`var` is function-scoped, not block-scoped.

Therefore, a block (`{}`) does not create a new scope for variables declared using `var`.

```javascript
{
    var petName = "Tommy";
}

console.log(petName); // Tommy
```

### Why does this work?

Because `var` ignores block boundaries and belongs to the nearest function scope (or global scope if no function exists).

You can think of the above code as:

```javascript
var petName;

{
    petName = "Tommy";
}

console.log(petName); // Tommy
```

---

## Scope Comparison

| Declaration | Global Scope | Function Scope | Block Scope |
| ----------- | ------------ | -------------- | ----------- |
| var         | ✅            | ✅              | ❌           |
| let         | ✅            | ✅              | ✅           |
| const       | ✅            | ✅              | ✅           |

---

## Important Notes

### 1. Functions Create Scope

```javascript
function test() {
    const name = "Ricky";
}

console.log(name); // ReferenceError
```

---

### 2. Blocks Create Scope Only for let and const

```javascript
{
    let age = 25;
}

// ReferenceError
console.log(age);
```

---

### 3. var Ignores Block Scope

```javascript
if (true) {
    var city = "Mumbai";
}

console.log(city); // Mumbai
```

---

## Summary

* Scope determines where variables and functions can be accessed.
* Global scope variables are accessible everywhere.
* Function scope variables are accessible only inside their function.
* Block scope variables are accessible only inside their block (`{}`).
* `let` and `const` are block-scoped.
* `var` is function-scoped and does not respect block boundaries.
* Every function creates a new scope.
* Blocks create scope only for `let` and `const`.
---


# Strict Mode (`"use strict"`)

## What is Strict Mode?

Strict Mode was introduced in **ECMAScript 5 (ES5)**.

It enables a stricter set of rules for writing JavaScript and helps catch common mistakes that would otherwise fail silently.

```javascript
"use strict";
```

When Strict Mode is enabled, JavaScript becomes less forgiving and throws errors for unsafe or problematic code.

---

## Why Use Strict Mode?

Benefits of Strict Mode:

* Helps catch coding mistakes early.
* Prevents accidental creation of global variables.
* Makes code more secure.
* Improves code maintainability.
* Eliminates some silent JavaScript errors.

---

## Enabling Strict Mode

### 1. Global Strict Mode

Placing `"use strict"` at the top of a file enables Strict Mode for the entire script.

```javascript
"use strict";

x = 3.14; // ReferenceError: x is not defined
```

### What happened?

Normally JavaScript would create a global variable named `x`.

In Strict Mode, using a variable without declaring it is not allowed.

Correct version:

```javascript
"use strict";

let x = 3.14;
```

---

### 2. Function-Level Strict Mode

Strict Mode can also be applied to a specific function.

```javascript
function myFunc() {
    "use strict";

    // y = 22;
    // ReferenceError: y is not defined
}
```

Only the code inside that function follows Strict Mode rules.

```javascript
x = 3.14; // Allowed (outside strict mode)

function myFunc() {
    "use strict";

    // y = 22; // Error
}
```

---

## Example: Accidental Global Variables

### Without Strict Mode

```javascript
x = 100;

console.log(x); // 100
```

JavaScript automatically creates a global variable.

---

### With Strict Mode

```javascript
"use strict";

x = 100;

// ReferenceError: x is not defined
```

The variable must be declared first.

```javascript
"use strict";

let x = 100;
```

---

## Rules Enforced by Strict Mode

### 1. Using Undeclared Variables is Not Allowed

```javascript
"use strict";

x = 10;

// ReferenceError
```

---

### 2. Duplicate Parameter Names are Not Allowed

```javascript
"use strict";

function add(a, a) {
    return a + a;
}

// SyntaxError
```

---

### 3. Deleting Variables is Not Allowed

```javascript
"use strict";

let age = 25;

// delete age;
// SyntaxError
```

---

### 4. Deleting Functions is Not Allowed

```javascript
"use strict";

function greet() {}

// delete greet;
// SyntaxError
```

---

### 5. Octal Literals are Not Allowed

```javascript
"use strict";

let num = 010;

// SyntaxError
```

Use modern syntax instead:

```javascript
let num = 8;
```

---

### 6. The `with` Statement is Not Allowed

```javascript
"use strict";

const obj = { name: "Ricky" };

with (obj) {
    console.log(name);
}

// SyntaxError
```

---

### 7. `eval` Cannot Be Used as a Variable Name

```javascript
"use strict";

let eval = 10;

// SyntaxError
```

---

### 8. `arguments` Cannot Be Used as a Variable Name

```javascript
"use strict";

let arguments = 10;

// SyntaxError
```

---

### 9. Writing to Read-Only Properties is Not Allowed

```javascript
"use strict";

const obj = {};

Object.defineProperty(obj, "x", {
    value: 0,
    writable: false
});

obj.x = 3.14;

// TypeError:
// Cannot assign to read only property 'x'
```

Without Strict Mode, this assignment fails silently.

---

## Common Strict Mode Errors

| Code                          | Error          |
| ----------------------------- | -------------- |
| `x = 10`                      | ReferenceError |
| `function(a, a){}`            | SyntaxError    |
| `delete variableName`         | SyntaxError    |
| `010`                         | SyntaxError    |
| `with(obj){}`                 | SyntaxError    |
| `eval = 5`                    | SyntaxError    |
| `arguments = 5`               | SyntaxError    |
| Writing to read-only property | TypeError      |

---

## Important Notes

### Strict Mode Does NOT Create a New Scope

```javascript
"use strict";

{
    let name = "Ricky";
}
```

The block scope above exists because of `let`, not because of Strict Mode.

Strict Mode changes JavaScript's rules but does not create new scopes.

---

### Modern JavaScript Modules Are Strict By Default

ES Modules automatically run in Strict Mode.

```javascript
// file.js

export const name = "Ricky";
```

No need to write:

```javascript
"use strict";
```

inside ES modules.

---

## Summary

* Strict Mode was introduced in ES5.
* Enable it using `"use strict"`.
* It can be applied globally or to a specific function.
* Prevents accidental global variables.
* Converts many silent JavaScript mistakes into errors.
* Disallows duplicate parameters.
* Disallows deleting variables and functions.
* Disallows octal literals and `with` statements.
* Prevents writing to read-only properties.
* Does not create new scopes.
* ES Modules use Strict Mode automatically.
