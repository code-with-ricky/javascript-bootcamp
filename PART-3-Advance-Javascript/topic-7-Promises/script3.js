// In this script we will learn about following topics:
// Promise.all()
// Promise.race()
// Promise.allSettled();
// Promise.any()

// returns data after 2s
async function fetchProducts(success = true) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                resolve([
                    { id: 1, name: 'Laptop', price: 45000 },
                    { id: 2, name: 'Shoes', price: 3000 },
                    { id: 3, name: 'Watch', price: 6790 },
                    { id: 4, name: 'Keyboard', price: 6999 },
                ]);
            } else {
                reject("Failed fetching products");
            }
        }, 2000);
    });

}

// returns data after 1s
async function fetchTodos(success = true) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                resolve([
                    { id: 1, todo: 'Read a book', isCompleted: true },
                    { id: 2, todo: 'Call mother', isCompleted: false },
                    { id: 3, todo: 'Buy groceries', isCompleted: false },
                ]);
            } else {
                reject("Failed fetching todos");
            }
        }, 1000);
    });



}

// returns data after 3s
async function fetchCurrency(success = true) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                resolve([
                    { id: 1, name: 'Indian Rupees', code: 'INR' },
                    { id: 2, name: 'US Dollar', code: 'USD' },
                    { id: 3, name: 'Euro', code: 'EUR' },
                    { id: 4, name: 'British Pound', code: 'GBP' },
                    { id: 5, name: 'Japanese Yen', code: 'JPY' }
                ]);
            } else {
                reject(new Error("Failed fetching currencies"));
            }
        }, 3000);
    });

}


// Promise.all(): all runs concurrently; all or nothing; even if one Promise reject, Promise.all() rejects with that error
async function loadData() {
    try {
        const [products, todos, currencies] = await Promise.all([
            fetchProducts(),     // success
            fetchTodos(false),   // fails
            fetchCurrency()      // success
        ]);

        console.log('Products:', products);
        console.log('Todos:', todos);
        console.log('Currencies:', currencies);
    } catch (error) {
        console.log('Error message:', error);  // therefore we will go here and get "Error message: Failed fetching todos"
    }
}
loadData();


// Promise.race(): whichever promise settles first we get its response as result
// whether that's a success or a failure.
// The others keep running in the background but their results are ignored.
const result = await Promise.race([
    fetchProducts(),     // 2s
    fetchTodos(),        // 1s
    fetchCurrency()      // 3s
]);

// since fetchTodos take 1s, we will get its data
console.log('Result:', result);


// Promise.allSettled()
// It never rejects. Every single promise's outcome — success or failure — is reported individually.
const allSettledResult = await Promise.allSettled([
    fetchProducts(),     // success
    fetchTodos(false),   // fails
    fetchCurrency()      // success
]);

console.log('AllSettled result:', allSettledResult);
// we get following result
// [
//     { status: "fulfilled", value: [...products] },
//     { status: "rejected", reason: 'Failed fetching todos' },
//     { status: "fulfilled", value: [...currencies] }
// ]

// You then loop through and handle each:
allSettledResult.forEach(function (result) {
    if (result.status === 'fulfilled') {
        console.log('Value:', result.value);
    } else {
        console.log('Reason:', result.reason);
    }
});


// Promise.any(): whichever success first, we get its value, failure is ignored
const anyResult = await Promise.any([
    fetchProducts(false),     // fails
    fetchTodos(),             // success
    fetchCurrency()           // success, but ignored
]);

console.log('Promise.any() result:', anyResult);