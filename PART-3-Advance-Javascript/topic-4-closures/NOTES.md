# Closures

## What is a Closure?

A closure is created when:

> A function remembers and continues to access variables from its outer (lexical) scope even after the outer function has finished executing.

In simple terms:

> A closure allows a function to "remember" the variables that were available when it was created.

---

# Why Do Closures Exist?

Closures exist because JavaScript uses **Lexical Scoping**.

Recall the most important rule from lexical scoping:

> A function remembers where it was defined, not where it was called.

Because of this behavior, an inner function can continue to access variables from its outer scope even after the outer function has completed execution.

---

# Closure Definition (Interview Version)

> A closure is the combination of a function and the lexical environment in which that function was created.

The lexical environment includes all variables that were in scope when the function was created.

---

# Basic Example

```javascript
function outer() {
    let username = "Ricky";

    function inner() {
        console.log(username);
    }

    return inner;
}

const fn = outer();

fn();
```

### Output

```text
Ricky
```

---

# What Happens Internally?

### Step 1

```javascript
const fn = outer();
```

`outer()` executes.

Memory inside `outer()`:

```javascript
username = "Ricky"
inner = function
```

---

### Step 2

```javascript
return inner;
```

The function itself is returned.

```javascript
fn = inner;
```

---

### Step 3

Normally, after `outer()` finishes:

```javascript
username
```

should be destroyed.

However, JavaScript notices that:

```javascript
inner()
```

still depends on:

```javascript
username
```

Therefore JavaScript keeps the variable alive.

---

### Step 4

```javascript
fn();
```

Output:

```text
Ricky
```

Even though `outer()` has already completed execution.

This behavior is called a **Closure**.

---

# Visual Representation

```text
outer()
│
├── username = "Ricky"
│
└── inner()
       │
       └── uses username
```

After:

```javascript
const fn = outer();
```

JavaScript preserves:

```text
username = "Ricky"
```

because `inner()` still references it.

---

# Most Important Closure Example

```javascript
function outer() {

    let count = 0;

    function inner() {
        count++;
        console.log(count);
    }

    return inner;
}

const counter = outer();

counter();
counter();
counter();
```

### Output

```text
1
2
3
```

---

# Why?

When `outer()` runs:

```javascript
count = 0
```

The returned function remembers that variable.

Every call:

```javascript
counter();
```

uses the same preserved `count`.

---

### Internal State

First call:

```javascript
count = 1
```

Second call:

```javascript
count = 2
```

Third call:

```javascript
count = 3
```

The variable remains alive because the closure keeps a reference to it.

---

# Each Closure Gets Its Own State

```javascript
function createCounter() {

    let count = 0;

    return function() {
        count++;
        console.log(count);
    };
}

const counter1 = createCounter();
const counter2 = createCounter();

counter1();
counter1();

counter2();
counter2();
```

### Output

```text
1
2
1
2
```

---

# Why?

Each call to:

```javascript
createCounter()
```

creates a completely new lexical environment.

### Counter 1

```javascript
count = 0
```

### Counter 2

```javascript
count = 0
```

They do not share state.

---

# Closures and Data Privacy

Closures can be used to create private variables.

```javascript
function createBankAccount() {

    let balance = 1000;

    return {
        getBalance() {
            return balance;
        },

        deposit(amount) {
            balance += amount;
        }
    };
}

const account = createBankAccount();

console.log(account.getBalance());

account.deposit(500);

console.log(account.getBalance());
```

### Output

```text
1000
1500
```

---

# Can We Access balance Directly?

```javascript
console.log(account.balance);
```

Output:

```text
undefined
```

because:

```javascript
balance
```

is private inside the closure.

---

# Closure with Parameters

```javascript
function multiplyBy(x) {

    return function(y) {
        return x * y;
    };
}

const double = multiplyBy(2);

console.log(double(5));
```

### Output

```text
10
```

---

# Explanation

When:

```javascript
const double = multiplyBy(2);
```

JavaScript remembers:

```javascript
x = 2
```

Later:

```javascript
double(5);
```

becomes:

```javascript
2 * 5
```

Result:

```text
10
```

---

# Common Interview Example

```javascript
function outer() {

    let x = 10;

    function inner() {
        console.log(x);
    }

    return inner;
}

const fn = outer();

fn();
```

### Output

```text
10
```

### Why?

Because `inner()` closes over:

```javascript
x
```

and remembers it after `outer()` has finished execution.

---

# Closures and Memory

Closures keep variables alive.

Example:

```javascript
function outer() {

    let largeData = new Array(1000000);

    return function() {
        console.log("Using closure");
    };
}
```

Even though the returned function doesn't use `largeData`, keeping unnecessary references may increase memory usage.

Modern JavaScript engines perform optimizations, but developers should still be mindful of memory retention caused by closures.

---

# Real-Life Analogy

Imagine a student graduates from a school.

Normally:

```text
School Finished
↓
School Data Removed
```

But suppose the student keeps a notebook containing all important information from school.

Even after leaving school, the student still has access to those notes.

Closures work similarly.

The outer function finishes execution, but the inner function keeps access to variables from that outer scope.

---

# Closures vs Normal Functions

## Without Closure

```javascript
function test() {
    let x = 10;
}

test();

// x is gone
```

After execution:

```text
x is destroyed
```

---

## With Closure

```javascript
function test() {

    let x = 10;

    return function() {
        console.log(x);
    };
}
```

After execution:

```text
x remains alive
```

because the returned function still needs it.

---

# Common Use Cases of Closures

Closures are widely used for:

### 1. Counters

```javascript
let count = 0;
```

---

### 2. Data Privacy

```javascript
private variables
```

---

### 3. Function Factories

```javascript
multiplyBy(2)
multiplyBy(5)
```

---

### 4. Event Handlers

```javascript
button.addEventListener(...)
```

---

### 5. Callbacks

```javascript
setTimeout(...)
```

---

### 6. React Hooks

Examples:

```javascript
useState()
useEffect()
```

Closures are heavily used internally by React.

---

# Relationship Between Concepts

Understanding closures requires understanding:

```text
Execution Context
        ↓
Lexical Scoping
        ↓
Scope Chain
        ↓
Closures
```

Closures are built on top of lexical scoping.

Without lexical scoping, closures would not exist.

---

# Summary

* A closure is created when a function remembers variables from its outer lexical scope.
* Closures are possible because JavaScript uses lexical scoping.
* A closure keeps required variables alive even after the outer function has completed execution.
* Each closure gets its own independent state.
* Closures are commonly used for counters, private data, callbacks, event handlers, and function factories.
* Closures are one of the most important concepts in JavaScript.

### Golden Rule

> A closure is a function along with the lexical environment in which it was created.
