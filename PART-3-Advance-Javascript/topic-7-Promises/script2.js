async function fetchUsers() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        return response.json();
    } catch (error) {
        console.log('Error in fetching users: ', error);
    }
}

async function fetchComments() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/comments");
        return response.json();
    } catch (error) {
        console.log('Error in fetching comments: ', error);
    }
}

async function fetchPosts() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        return response.json();
    } catch (error) {
        console.log('Error in fetching posts: ', error);
    }
}

// The Sequential vs Parallel Trap
// suppose we have 3 api calls and 3 are independent of each other
// if we do following sequential flow
// Each await blocks the next line from starting until it resolves.
// if fetchPost doesn't depend on fetch users, then 2s are wasted
async function loadDashboardData() {
    try {
        const users = await fetchUsers();            // 1s
        const posts = await fetchPosts();          // 1s
        const comments = await fetchComments();    // 1s

        console.log('Users:', users);
        console.log('\nPosts:', posts);
        console.log('\nComments:', comments);
    } catch (error) {
        console.log('Error in loading dashboard data');
    }
}

loadDashboardData();


// Solution: Parallel flow
async function loadDashboardDataParallel() {
    try {
        const usersPromise = fetchUsers();    // starts immediately, doesn't wait
        const postsPromise = fetchPosts();    // starts immediately too
        const commentsPromise = fetchComments(); // and this too — all 3 running concurrently now

        const users = await usersPromise;     // just waits for completion, doesn't restart it
        const posts = await postsPromise;
        const comments = await commentsPromise;

        console.log('Parallel users:', users)
        console.log('\nParallel Posts:', posts);
        console.log('\nParallel Comments:', comments);
    } catch (error) {
        console.log('Error in loading dashboard data');
    }
}

loadDashboardDataParallel()