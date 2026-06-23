# JavaScript `this` Keyword - Complete Notes

## Introduction

The `this` keyword is one of the most important and often misunderstood concepts in JavaScript.

Unlike many programming languages where `this` always refers to the current object instance, JavaScript determines the value of `this` **at runtime**, based on **how a function is called**.

### Key Rule

> The value of `this` depends on the execution context, not where the function is written.

---

# 1. Global Scope

When `this` is used in the global scope of a browser environment, it refers to the global object.

```js
console.log(this);
```

Output:

```js
Window
```

Because:

```js
this === window // true
```

### Example

```js
console.log("Global Scope:", this);
```

Output:

```js
Global Scope: Window
```

---

# 2. Function Scope

In a regular function call (non-strict mode), `this` also points to the global object.

```js
function myFunc() {
    console.log(this);
}

myFunc();
```

Output:

```js
Window
```

### Why?

Because the function is called directly:

```js
myFunc();
```

No object is calling it.

---

## Strict Mode Difference

```js
"use strict";

function myFunc() {
    console.log(this);
}

myFunc();
```

Output:

```js
undefined
```

In strict mode, JavaScript prevents accidental binding of `this` to the global object.

---

# 3. Method Scope

A function stored inside an object is called a **method**.

When a method is called using an object, `this` refers to that object.

### Example

```js
let userObj = {
    name: "Amrik",

    greet: function() {
        console.log(this);
        console.log(this.name);
    }
};

userObj.greet();
```

Output:

```js
{
    name: "Amrik",
    greet: f
}

Amrik
```

### Why?

Because:

```js
userObj.greet();
```

The object before the dot (`userObj`) becomes the value of `this`.

Think:

```js
object.method()
```

↓

```js
this = object
```

---

# 4. Arrow Functions and `this`

Arrow functions behave differently.

They do **not create their own `this`**.

Instead, they inherit `this` from their surrounding scope.

### Example

```js
let userObj = {
    name: "Amrik",

    sayName: () => {
        console.log(this);
    }
};

userObj.sayName();
```

Output:

```js
Window
```

Not:

```js
userObj
```

### Why?

Arrow functions use lexical binding.

They look outside themselves for `this`.

In this case:

```js
userObj
```

does not become `this`.

The surrounding scope is the global scope.

Therefore:

```js
this === window
```

---

## Important Interview Question

### Wrong

```js
let obj = {
    name: "John",

    greet: () => {
        console.log(this.name);
    }
};
```

### Correct

```js
let obj = {
    name: "John",

    greet() {
        console.log(this.name);
    }
};
```

Use regular functions for object methods.

---

# 5. Nested Functions

Consider:

```js
let userObj = {
    outerMethod: function() {

        function innerMethod() {
            console.log(this);
        }

        innerMethod();
    }
};
```

Output:

```js
Window
```

### Why?

Because:

```js
innerMethod();
```

is a regular function call.

No object is calling it.

Therefore:

```js
this = Window
```

---

## Solution 1: Arrow Function

```js
let userObj = {
    outerMethod: function() {

        let innerArrowMethod = () => {
            console.log(this);
        };

        innerArrowMethod();
    }
};
```

Output:

```js
userObj
```

### Why?

Arrow functions inherit `this` from the surrounding function.

The surrounding function's `this` is:

```js
userObj
```

Therefore:

```js
innerArrowMethod -> userObj
```

---

# 6. Event Handlers

Inside a regular event listener callback, `this` refers to the element on which the event listener is attached.

### Example

```js
document.querySelector("h1")
.addEventListener("click", function() {
    console.log(this);
});
```

Output:

```html
<h1>...</h1>
```

### Rule

```js
element.addEventListener(...)
```

Inside callback:

```js
this === element
```

---

## Equivalent

```js
document.querySelector("h1")
.addEventListener("click", function() {

    console.log(this);

});
```

is similar to:

```js
const h1 = document.querySelector("h1");

console.log(h1);
```

---

## Arrow Function Caveat

```js
document.querySelector("h1")
.addEventListener("click", () => {
    console.log(this);
});
```

Output:

```js
Window
```

Arrow functions do not bind their own `this`.

Therefore regular functions are generally preferred in event handlers.

---

# 7. Class Scope

Inside a class constructor, `this` refers to the newly created object instance.

### Example

```js
class Demo {

    constructor() {

        console.log(this);

        this.username = "Ricky";
        this.age = 33;

        console.log(this);
    }
}
```

Creating instance:

```js
let obj = new Demo();
```

Output:

```js
Demo {}
```

then

```js
Demo {
    username: "Ricky",
    age: 33
}
```

### Explanation

When:

```js
new Demo();
```

runs:

1. Empty object is created
2. `this` points to that object
3. Properties are attached
4. Object is returned

Equivalent idea:

```js
const obj = {};
obj.username = "Ricky";
obj.age = 33;
```

---

# 8. call()

`call()` allows us to manually set the value of `this`.

### Syntax

```js
function.call(thisValue, arg1, arg2, arg3);
```

---

### Example

```js
function abcd() {
    console.log(this);
}

let carObj = {
    brand: "BMW"
};

abcd.call(carObj);
```

Output:

```js
{
    brand: "BMW"
}
```

### Without call()

```js
abcd();
```

Output:

```js
Window
```

---

# 9. apply()

`apply()` works exactly like `call()`.

The only difference is how arguments are passed.

### Syntax

```js
function.apply(thisValue, [args]);
```

### Example

```js
xyz.apply(carObj, [100, 200, 300]);
```

Equivalent:

```js
xyz.call(carObj, 100, 200, 300);
```

---

# 10. bind()

`bind()` creates a new function with a permanently bound `this`.

Unlike `call()` and `apply()`, it does not execute immediately.

### Syntax

```js
const newFunction = oldFunction.bind(thisValue);
```

---

### Example

```js
let func = xyz.bind(
    carObj,
    1000,
    2000,
    3000
);
```

No execution yet.

Execute later:

```js
func();
```

Output:

```js
this -> carObj
```

---

# call vs apply vs bind

| Feature              | call            | apply | bind            |
| -------------------- | --------------- | ----- | --------------- |
| Sets `this`          | ✅               | ✅     | ✅               |
| Executes Immediately | ✅               | ✅     | ❌               |
| Returns Function     | ❌               | ❌     | ✅               |
| Arguments Format     | Comma Separated | Array | Comma Separated |

### Examples

```js
xyz.call(carObj, 1, 2, 3);

xyz.apply(carObj, [1, 2, 3]);

let fn = xyz.bind(carObj, 1, 2, 3);
fn();
```

---

# Quick Cheat Sheet

| Context                 | Value of `this`                          |
| ----------------------- | ---------------------------------------- |
| Global Scope            | `window`                                 |
| Regular Function        | `window` (or `undefined` in strict mode) |
| Object Method           | Object before `.`                        |
| Arrow Function          | Inherits from surrounding scope          |
| Nested Regular Function | `window`                                 |
| Nested Arrow Function   | Parent's `this`                          |
| Event Listener Callback | Element receiving event                  |
| Class Constructor       | Current instance                         |
| call()                  | Explicitly assigned value                |
| apply()                 | Explicitly assigned value                |
| bind()                  | Permanently assigned value               |

---

# Golden Rules

### Rule 1

Regular functions determine `this` based on how they are called.

---

### Rule 2

Arrow functions do not have their own `this`.

They inherit it from the surrounding scope.

---

### Rule 3

For object methods, use regular functions.

```js
greet() {
    console.log(this.name);
}
```

---

### Rule 4

For nested callbacks inside methods, prefer arrow functions.

```js
setTimeout(() => {
    console.log(this);
}, 1000);
```

---

### Rule 5

Use `bind()` when you need a function with a permanently fixed `this`.

```js
const handler = myFunc.bind(obj);
```

---

# Interview Summary

When asked:

> "What is `this` in JavaScript?"

A concise answer:

> `this` is a special keyword whose value is determined by the execution context. In regular functions it depends on how the function is called, while arrow functions inherit `this` from their surrounding lexical scope.
