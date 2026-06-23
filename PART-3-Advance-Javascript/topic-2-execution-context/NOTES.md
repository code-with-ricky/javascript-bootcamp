# Execution Context

## What is an Execution Context?

An Execution Context is the environment in which JavaScript code is evaluated and executed.

It contains everything JavaScript needs to run the code, including:

* Variables
* Function declarations
* Scope information
* The value of `this`

### Simple Definition

> Execution Context is the environment where JavaScript code is executed.

---

## Real-Life Analogy

Imagine a chef preparing food in a kitchen.

Before cooking starts, the chef needs:

* Ingredients
* Utensils
* Recipe
* Workspace

Only after everything is prepared does cooking begin.

Similarly, before JavaScript executes code, it creates an Execution Context containing:

* Variables
* Functions
* Scope information
* `this`

After preparation is complete, code execution begins.

---

## Types of Execution Context

JavaScript mainly creates three types of execution contexts:

### 1. Global Execution Context (GEC)

Created when the JavaScript file starts running.

Every JavaScript program has exactly one Global Execution Context.

```javascript
let username = "Ricky";

function greet() {
    console.log("Hello");
}

greet();
```

Before any line executes, JavaScript creates the Global Execution Context.

---

### 2. Function Execution Context (FEC)

Created whenever a function is invoked.

```javascript
function greet() {
    let message = "Hello";
    console.log(message);
}

greet();
```

When `greet()` is called, JavaScript creates a new Function Execution Context specifically for that function.

---

### 3. Eval Execution Context

Created when code is executed using `eval()`.

```javascript
eval("let x = 10");
```

This is rarely used in modern JavaScript applications.

---

# How JavaScript Executes Code

Every execution context goes through two phases:

1. Memory Creation Phase
2. Execution Phase

---

## Phase 1: Memory Creation Phase

Before executing any code, JavaScript scans the entire scope and allocates memory.

During this phase:

* Variables declared with `var` are initialized with `undefined`
* Function declarations are stored completely in memory
* `let` and `const` are hoisted but remain uninitialized (Temporal Dead Zone)
* Scope chain is established
* `this` is determined

No code is executed during this phase.

---

## Phase 2: Execution Phase

After memory allocation is complete, JavaScript executes code line by line.

Values are assigned and statements are executed.

---

## Example: Memory Creation and Execution

```javascript
console.log(x);

var x = 10;

function greet() {
    console.log("Hello");
}

greet();
```

---

### Memory Creation Phase

JavaScript creates memory for identifiers:

| Identifier | Initial Value              |
| ---------- | -------------------------- |
| x          | undefined                  |
| greet      | Entire Function Definition |

Conceptually:

```javascript
x = undefined;

greet = function greet() {
    console.log("Hello");
};
```

---

### Execution Phase

#### Line 1

```javascript
console.log(x);
```

Output:

```text
undefined
```

---

#### Line 2

```javascript
var x = 10;
```

Now:

```javascript
x = 10;
```

---

#### Line 3-5

Function already exists in memory.

Nothing happens immediately.

---

#### Line 7

```javascript
greet();
```

Output:

```text
Hello
```

---

### Final Output

```text
undefined
Hello
```

---

# Why Hoisting Happens

Hoisting is a result of the Memory Creation Phase.

Consider:

```javascript
console.log(x);

var x = 10;
```

During memory creation:

```javascript
x = undefined;
```

Therefore:

```javascript
console.log(x);
```

prints:

```text
undefined
```

instead of:

```text
ReferenceError
```

---

# let, const and the Temporal Dead Zone (TDZ)

Consider:

```javascript
console.log(x);

let x = 10;
```

Many developers say:

> let is not hoisted.

This is not technically correct.

`let` and `const` are hoisted, but they are not initialized during the Memory Creation Phase.

Instead, they remain in a special state called the:

## Temporal Dead Zone (TDZ)

Conceptually:

```javascript
x = <uninitialized>;
```

Therefore:

```javascript
console.log(x);
```

results in:

```text
ReferenceError: Cannot access 'x' before initialization
```

---

# Function Execution Context

Whenever a function is called, JavaScript creates a new execution context for that function.

Example:

```javascript
let username = "Ricky";

function greet() {
    let message = "Hello";

    console.log(message);
}

greet();
```

---

## Step 1: Global Execution Context

Memory:

| Identifier | Value     |
| ---------- | --------- |
| username   | undefined |
| greet      | function  |

Execution:

```javascript
username = "Ricky";
```

---

## Step 2: Function Call

```javascript
greet();
```

A new Function Execution Context is created.

Memory:

| Identifier | Value     |
| ---------- | --------- |
| message    | undefined |

Execution:

```javascript
message = "Hello";
```

Output:

```text
Hello
```

After the function completes, its execution context is removed from memory.

Control returns to the Global Execution Context.

---

# Call Stack

JavaScript uses a Call Stack to manage execution contexts.

The Call Stack follows the:

> LIFO (Last In, First Out)

principle.

The most recently added execution context is removed first.

---

## Example

```javascript
function one() {
    two();
}

function two() {
    three();
}

function three() {
    console.log("Done");
}

one();
```

---

### Initial Stack

```text
┌───────────────┐
│    Global     │
└───────────────┘
```

---

### After Calling one()

```text
┌───────────────┐
│     one()     │
├───────────────┤
│    Global     │
└───────────────┘
```

---

### After Calling two()

```text
┌───────────────┐
│     two()     │
├───────────────┤
│     one()     │
├───────────────┤
│    Global     │
└───────────────┘
```

---

### After Calling three()

```text
┌───────────────┐
│    three()    │
├───────────────┤
│     two()     │
├───────────────┤
│     one()     │
├───────────────┤
│    Global     │
└───────────────┘
```

Output:

```text
Done
```

---

### Context Removal

After execution completes:

```text
three() removed
```

```text
two() removed
```

```text
one() removed
```

Finally:

```text
┌───────────────┐
│    Global     │
└───────────────┘
```

---

# Complete Example

```javascript
var x = 1;

function a() {
    var y = 2;

    function b() {
        var z = 3;

        console.log(x, y, z);
    }

    b();
}

a();
```

---

## Global Execution Context

Memory:

```javascript
x = undefined;
a = function;
```

Execution:

```javascript
x = 1;
```

---

## Function a() Context

Memory:

```javascript
y = undefined;
b = function;
```

Execution:

```javascript
y = 2;
```

---

## Function b() Context

Memory:

```javascript
z = undefined;
```

Execution:

```javascript
z = 3;
```

Output:

```text
1 2 3
```

---

## Why Can b() Access x and y?

Because JavaScript uses lexical scoping and scope chaining.

When JavaScript cannot find a variable in the current scope, it searches outer scopes until the variable is found.

This topic will be discussed in detail in the Lexical Scope & Scope Chain section.

---

# Execution Context Lifecycle

Every execution context follows the same lifecycle:

### Step 1

Create Execution Context

↓

### Step 2

Memory Creation Phase

* Allocate memory for variables
* Store function definitions
* Setup scope chain
* Setup `this`

↓

### Step 3

Execution Phase

* Execute code line by line
* Assign values
* Run functions

↓

### Step 4

Destroy Execution Context

* Function execution context is removed after execution completes
* Global execution context remains until the program finishes

---

# Summary

* Execution Context is the environment where JavaScript code executes.
* JavaScript creates a Global Execution Context when a script starts.
* A new Function Execution Context is created whenever a function is invoked.
* Every execution context has two phases:

  * Memory Creation Phase
  * Execution Phase
* Hoisting occurs during the Memory Creation Phase.
* `var` is initialized as `undefined`.
* `let` and `const` remain in the Temporal Dead Zone until initialization.
* JavaScript uses a Call Stack to manage execution contexts.
* Function execution contexts are created when functions are called and destroyed after execution completes.
* Understanding Execution Context is essential for understanding hoisting, scope chains, closures, the `this` keyword, and the Call Stack.
