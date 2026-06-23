// any function which is returned by a parent function / outer function and that inner function uses any of the outer function's variable is called closure

function outer() {
    let count = 10;

    // 'inner' function, which is returned by its parent 'outer' function
    return function inner() {
        // inner function is using 'count' which is 'outer' function's variable
        console.log(count);
    }
}

let innerFunc = outer();
innerFunc();
innerFunc();


/*
    at line number 13, outer() 's execution context gets over, so all its variables are also destroyed
    so logicially, count variable which is defined in outer should also been destroyed

    so inner() which is returned and stored in innerFunc variable, when called, then in console.log(count) -> it should have printed undefined
    
    but we get the value 10 as output! HOW!!

    this is what specially happens in case of closure

    When javascript sees a closure, it creates a backlink having name [[environment]], this is how data of outer function is preserved

    kind of copy of 'count' is created you can think of
*/


// Use cases:
// 1. private variables
// 2. encapsulation

function count() {
    let count = 0;

    return function () {
        count++;
        console.log(count);
    }
}

let counter1 = count();
counter1(); // 1
counter1(); // 2

let counter2 = count();
counter2(); // 1
counter2(); // 2
counter2(); // 3
counter2(); // 4
counter2(); // 5

// this happens because whenever you will call count() -> parent function, a separate block is created which is having its own count, initialised with 0


// Encapsulation -> hiding inner logic from users, and not allowing users to edit private members
// only giving limited functionalities for users to perform
function rateLimiter() {
    let rounds = 0; // this is private variable as from outside we cannot change its value

    return function () {
        if (rounds < 3) {
            rounds++;
            console.log(`API called ${rounds} times`);
        }else{
            throw new Error("LIMIT REACHED.");
        }
    }
}

const rl = rateLimiter();
rl();
rl();
rl();
rl();