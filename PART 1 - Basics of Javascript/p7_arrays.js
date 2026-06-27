let marks = [10, 40, 50, 54, 37, 93];
console.log(marks);
console.log(marks[4]);
console.log(marks[15]); // undefined

// another way
let arr = new Array();

// modify values in array
marks[2] = 100;
console.log(marks);


// array methods
console.log(marks.length);

arr.push(50);  // adds at end
arr.pop();     // removes one element from end
arr.shift();   // removes one element from front
arr.unshift(45);  // adds element at front
arr.splice(2,1); // from index 2, remove 1 element
                 // that is element at index 2

arr.splice(2, 3);  // from index 2, remove 3 elements
                   // that is element at index 2, 3, 4

newArr = arr.slice(2, 1);  // act same as splice just it doesnot change original array and return new array

arr.reverse();
let ascArr = arr.sort(function(a, b){ return a-b });  // sort in ascending order
let descArr = arr.sort((a, b) => b-a);  // sort in descending order



// Array traversing
let nums = [1, 2, 3, 4, 5];

// 1. forEach(function (){})
nums.forEach(function (num){
    console.log(num + 1);
});

// 2. map(function (){})
// map sirf tab use krna hai jab aplo ek new array banana hai based on original data
// new arr length = old arr length
let multiply5 = nums.map((num) => num * 5);
console.log(multiply5);
console.log(nums);

// 3. filter(function(){})
// creates a new array of only those elemnts that satisfies the condition we write
let evenNums = nums.filter(function (num){
    return num % 2 == 0
});
console.log(evenNums);


// 4. reduce(function(accumulator, currentValue){}, intial_value_of_accumulator);
// used when you want to get a single final value from an array
// value of return gets stored in the accumulator itself for next iteration
let sum = nums.reduce(function(accumulator, currentValue){
    return accumulator + currentValue;
}, 0);

console.log("Sum of arr elements:", sum);

// 5. find(function(){})
// returns a single value from the array, for which the condition get satidfied in first occurenece
// if the element not present satisfying the conition then value is undefined as final output.
let va = nums.find((val) => {
    return val === 1000;
});
console.log(va);


// 6. some(function(){})
// give a single boolean value as output if condition satisfies for any value in the array
let hasEven = nums.some((num) => num % 2 == 0);
console.log(hasEven);


// destructure an array
let nums2 = [1, 2, 3, 4, 5];
let [a, b, c] = nums;
console.log(a, ",", b, ",", c);  // 1, 2, 3


// spread operator --> used to create copy of original array
let arr1 = [1, 2, 3, 4]
let arr2 = [...arr1];   // this solves the reference issue, so now editing arr2 will not affect arr1