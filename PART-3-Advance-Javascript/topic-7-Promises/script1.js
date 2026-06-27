/*
    Problem being solved:
    -> Js is single threaded
    -> Oner call stack, one thing executing at a time
    -> Our application needs to do time consuming operations -> fetch data from a server or file operations
    -> This operations should not freeze everything

    -> so this slow operations are handed over to browser/Node runtime (Web APIs)
    -> so that js can continue executing on other code
    -> when the slow operation completes, runtime needs a way to tell your code "I am done, here is your result".
    -> this is being solved by promises
*/

// before Promise, 'callbacks' was used
// but it causes callback hell
// getUser(userId, function(user) {
//     getOrders(user.id, function(orders) {
//         getOrderDetails(orders[0].id, function(details) {
//             console.log(details);
//             // callback hell
//         });
//     });
// });


// for above is solved by Promise
// Promise is not a value its a placeholder object which represents a value thar will eventually obtained or an error that will eventually occur

// Promise has 3 states
// Pending -> operation has not finished yet
// Fulfilled -> oepration succeded and now have a value
// Rejected -> it failed and now has a reason

// NOTE: once a promise is in Success or Reject state; it never go back to Pending state

console.log("Start");
const promise = new Promise(function (resolve, reject) {
    // function we pass to new Promise(), runs synchronously, runs now
    // only the resolve/reject is delayed
    console.log('Inisde promise function');
    setTimeout(() => {
        const success = true;
        if (success) {
            resolve("Order #123 is ready");  // move to fulfilled
        } else {
            reject(new Error("Order failed")); // moves to rejected
        }
    }, 2000); // after 2 seconds either success or error happens, here success will
    // after 2 sec we get following:
    // Promise {<fulfilled>: 'Order #123 is ready'} as value of 'promise'

    // before 2000, promise is in pending state and we have following value in variable 'promise'
    // Promise {<pending>}
});
console.log("End");


// Consuming a promise
// we register a call back to get value or error when promise settle
// we use .then() to get value when promise fulfilled
// we use .catch() to get error message when promise fails

promise.then(
    // whatever is there inside resolve we obtain its value in the paramater passed to the function in then()
    (value) => console.log(value)
).catch(
    // whatever is there inside reject we obtain its value in the paramater passed to the function in catch()
    (error) => console.log(error)
);


function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id == 1) resolve({ id: id, name: "Ricky" });
            else reject("User Not found");
        }, 1000);
    });
}

function getOrders(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId == 1) {
                const orders = [
                    { id: 101, userId: userId, item: "Laptop" },
                    { id: 102, userId: userId, item: "Mouse" }
                ];

                resolve(orders);
            } else {
                reject("Failed to find orders");
            }
        }, 1000);
    });
}

function getOrderDetails(orderId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (orderId == 101 || orderId == 102) {
                resolve({
                    id: orderId,
                    item: "Laptop",
                    price: 1200,
                    status: "Delivered"
                });
            } else {
                reject("Failed to find order details");
            }
        }, 1000);
    })
}

// promise chaining
// .then() itself returns a new Promise
// there we can chain
getUser(1)
    .then((user) => getOrders(user.id))
    .then((orders) => getOrderDetails(orders[0].id))
    .then((order) => console.log(`Order item name: ${order.item} and its price is: ${order.price}`))
    .catch((error) => console.log(error)); // this catch catches error coming from any step mentioned above


// NOTE: if we forget to return in .then(), the next .then() gets 'undefined' and not the value we are expecting
// this is a bug
getUser(1)
    .then((user) => {
        getOrders(user.id);
    })
    .then((orders) => {
        console.log('Value of orders: ', orders); // here we get undefined
    });



// async/await
// -> async/await does not replaces Promise
// -> under the hood it use Promises only
// -> async returns a Promise
// -> await pauses the execution until the Promise settles

async function getOrderFlow() {
    try {
        const user = await getUser(1);                                 // wait for 1s and then settle, then goes to orders
        const orders = await getOrders(user.id);                       // wait for 1s and then settle, then goes to orderDetails
        const orderDetails = await getOrderDetails(orders[0].id);      // wait for 1s and then settle, then goes to return
        return orderDetails;
    } catch (error) {
        console.log(error);
    }
}

// NOTE: await can be used in two places:
// 1. inside async function
// 2. At the top level of an ES module (type="module" in browsers or .mjs / "type": "module" in Node.js).
// so i added type = "module" in index.html where i added js script
const result = await getOrderFlow();
console.log('result: ', result);