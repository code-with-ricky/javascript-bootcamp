// this is a keyword, whose value or nature changes based on where and how it is used

// global scope
console.log('Global Scope: ', this); // Window

// Function scope
function myFunc(){
    console.log('Function Scope: ', this); // Window
}
myFunc();


// method scoped
// function which is inside object is called method
let userObj = {
    name: "Amrik",

    // following is greet method
    greet: function() {
        console.log('Method Scope: ', this); // userObj  // {name: 'Amrik', greet: ƒ}
        console.log(`Hello Everyone, I'm ${this.name}`);
    },

    // NOTE: if we use ES6 arrow function as method, 'this' looses its value
    // it will no longer = userObj (in this example), but will be = Window
    sayName: () => {
        console.log('Inside arrow function: ', this);
    },
    
    // NOTE 2: if we create nested method
    outerMethod: function(){
        console.log('Outer Method: ', this);

        // in ES5 syntaxed inner method, 'this' looses its value, and becomes = to Window
        function innerMethod() {
            console.log('Inner ES5 Method: ', this);
        }
        innerMethod();

        // but if we create arrow function, 'this' is = to object
        let innerArrowMethod = () => {
            console.log('Inner Arrow Method: ', this);
        }
        innerArrowMethod();
    }
}
userObj.greet();
userObj.sayName();
userObj.outerMethod();


// Event Handler Scoped
document.querySelector("h1")
.addEventListener("click", function(){
    alert('Event Handler Scoped: ', this); // this -> element on which event is added
                 // anything before .addEventListener()
                 // here: document.querySelector("h1")
    console.log(this.style.color = "red");
});


// class scoped
class Demo {
    constructor() {
        console.log('Class Scoped: ', this); // blank object {} of class Demo
        this.username = "Ricky";
        this.age = 33;
        console.log('Class Scoped: ', this); // Demo {username: 'Ricky', age: 33}
    }
}
let obj = new Demo();


// call, bind, apply
function abcd(){
    console.log('Inside abcd function: ', this);
}

let carObj = {
    brand: "BMW",
    model: "M5",
    color: "Cherry-Red",
    year: 2025
};

// if we call abcd function
abcd(); // this -> Window

// if use '.call()' to call the function, we can set value for this by passing it as parameters
abcd.call(carObj);

// if the function has parameters also then .call() should pass value for this then pass value for function parameters
function xyz(a, b, c) {
    console.log('Inside xyz method: ', this);
    console.log('a: ', a);
    console.log('b: ', b);
    console.log('c: ', c);
}
xyz.call(carObj, 1, 2, 3);

// .apply(value_for_this, function_parameters_values_in_array)
xyz.apply(carObj, [100, 200, 300]);

// .bind() -> same as .call() but it doesnot call the function but returns a new function where this -> carObj
let func = xyz.bind(carObj, 1000, 2000, 3000);
func();