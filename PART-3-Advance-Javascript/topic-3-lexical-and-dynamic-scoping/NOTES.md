# Lexical Scoping vs Dynamic Scoping

## What is Scoping?

Scoping determines how JavaScript resolves variables and functions.

In simple terms:

> Scoping defines where JavaScript should look for a variable when that variable is used.

Example:

```javascript
const username = "Ricky";

function greet() {`
    console.log(username);
}

greet();
```

When JavaScript encounters `username` inside `greet()`, it needs rules to determine where that variable exists.

These rules are known as **scoping rules**.

---

# Types of Scoping

Programming languages generally use one of two scoping models:

1. Lexical Scoping (Static Scoping)
2. Dynamic Scoping

JavaScript uses:

> Lexical Scoping (Static Scoping)

---

# Lexical Scoping (Static Scoping)

## Definition

In lexical scoping, variable lookup depends on:

> Where a function is defined in the source code.

It does **not** depend on where the function is called.

The word **lexical** refers to the physical structure of the code.

---

## Example 1

```javascript
const username = "Ricky";

function greet() {
    console.log(username);
}

greet();
```

### Output

```text
Ricky
```

### Why?

Because `greet()` was defined inside the global scope.

Therefore, it has access to variables available in the global scope.

### Scope Structure

```text
Global Scope
│
├── username
│
└── greet()
```

When JavaScript cannot find `username` inside `greet()`, it looks in the outer lexical scope (Global Scope).

---

## Example 2

```javascript
const x = 10;

function outer() {

    const y = 20;

    function inner() {
        console.log(x);
        console.log(y);
    }

    inner();
}

outer();
```

### Output

```text
10
20
```

### Scope Structure

```text
Global Scope
│
├── x
│
└── outer()
      │
      ├── y
      │
      └── inner()
```

### Variable Lookup

When `inner()` needs `x`:

```text
inner()
   ↑
outer()
   ↑
Global Scope
```

JavaScript searches outward through lexical scopes until it finds the variable.

---

# Most Important Rule of Lexical Scoping

> A function remembers where it was defined, not where it was called.

This is one of the most important rules in JavaScript and forms the foundation of closures.

---

## Example

```javascript
const x = 10;

function first() {
    console.log(x);
}

function second() {
    const x = 20;

    first();
}

second();
```

### Output

```text
10
```

Many developers initially expect:

```text
20
```

But JavaScript prints:

```text
10
```

---

## Why?

Because `first()` was defined in the global scope:

```javascript
const x = 10;

function first() {
    console.log(x);
}
```

Therefore, when `first()` executes, it looks for variables according to its lexical environment.

It does not care where it was called.

### Scope Structure

```text
Global Scope
│
├── x = 10
│
├── first()
│
└── second()
      │
      └── x = 20
```

When `first()` executes:

```text
first()
   ↑
Global Scope
```

It never searches inside `second()`.

Result:

```text
10
```

---

# Dynamic Scoping

Dynamic Scoping follows a different rule.

## Definition

In dynamic scoping, variable lookup depends on:

> Where a function is called.

Instead of following the source code structure, the language follows the function call chain.

JavaScript does NOT use dynamic scoping.

---

## Same Example Under Dynamic Scoping

```javascript
const x = 10;

function first() {
    console.log(x);
}

function second() {
    const x = 20;

    first();
}

second();
```

If JavaScript used dynamic scoping:

### Output

```text
20
```

### Why?

Because:

```text
first()
called from
second()
```

And `second()` contains:

```javascript
const x = 20;
```

So the variable would be resolved from the caller's scope.

---

# Dynamic Scope Uses Call History

Dynamic scoping asks:

```text
Who called me?
```

Lexical scoping asks:

```text
Where was I defined?
```

This is the easiest way to remember the difference.

---

# Lexical vs Dynamic Scoping

| Feature                       | Lexical Scoping           | Dynamic Scoping          |
| ----------------------------- | ------------------------- | ------------------------ |
| Based On                      | Code Structure            | Function Call Chain      |
| Variable Lookup               | Where Function Is Defined | Where Function Is Called |
| Predictable                   | ✅ Yes                     | ❌ Less Predictable       |
| Used By JavaScript            | ✅ Yes                     | ❌ No                     |
| Used By Most Modern Languages | ✅ Yes                     | ❌ Rare                   |

---

# Real-Life Analogy

Imagine you ask:

> "Who is my manager?"

---

## Lexical Scoping

Answer:

> The manager assigned to your department.

The answer remains the same regardless of who asks.

This is predictable and fixed.

---

## Dynamic Scoping

Answer:

> Whoever is supervising you right now.

The answer changes depending on the current situation.

This is similar to how dynamic scoping works.

---

# Why JavaScript Uses Lexical Scoping

Lexical scoping makes programs easier to understand and reason about.

Consider:

```javascript
function calculateTax() {
    console.log(rate);
}
```

With lexical scoping, you can determine where `rate` comes from by reading the source code.

With dynamic scoping, you would need to inspect the entire runtime call chain to understand where `rate` is coming from.

Lexical scoping therefore provides:

* Predictability
* Better readability
* Easier debugging
* Better optimization opportunities for JavaScript engines

---

# Proof That JavaScript Uses Lexical Scoping

```javascript
const city = "Mumbai";

function showCity() {
    console.log(city);
}

function run() {
    const city = "Delhi";

    showCity();
}

run();
```

### Actual Output

```text
Mumbai
```

### If JavaScript Were Dynamically Scoped

```text
Delhi
```

Since the actual output is:

```text
Mumbai
```

JavaScript is clearly lexically scoped.

---

# Connection with Closures

Closures are built on top of lexical scoping.

Example:

```javascript
function outer() {

    let count = 0;

    function inner() {
        count++;
        console.log(count);
    }

    return inner;
}

const fn = outer();

fn();
fn();
fn();
```

### Output

```text
1
2
3
```

Why can `inner()` still access `count`?

Because JavaScript uses lexical scoping.

`inner()` remembers the scope where it was originally defined.

This behavior is the foundation of closures.

---

# Mental Model

Whenever you see a function, ask:

```text
Where was this function defined?
```

Do not ask:

```text
Where was this function called?
```

For JavaScript variable lookup:

> Definition location wins over call location.

---

# Interview Definition

> JavaScript uses lexical (static) scoping, meaning variable resolution is determined by where a function is defined in the source code, not where it is called. A function has access to its own scope and all outer lexical scopes that existed when the function was created.

---

# Summary

* Scoping determines where JavaScript looks for variables.
* There are two major scoping models:

  * Lexical Scoping
  * Dynamic Scoping
* JavaScript uses Lexical Scoping.
* Lexical Scoping depends on where a function is defined.
* Dynamic Scoping depends on where a function is called.
* A function remembers its lexical environment at the time of creation.
* Lexical scoping makes code predictable and easier to understand.
* Closures are built on top of lexical scoping.
* The key rule is:

> A function remembers where it was defined, not where it was called.
