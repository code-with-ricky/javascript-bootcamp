let obj = {};
let obj2 = new Object();

obj = {
    name: "Amrik",
    age: 23,
    gender: 'M'
};

// access object elements
console.log(obj.name);    // dot ke baar jo likho exact vhi as key search hoga object mei
console.log(obj['age']);

obj['department'] = 'Computer Engineering';
console.log(obj);

//Note if you want to have a variable to store key names and then use that variable to get value of respective key then use [] rather than dot
let myKey = 'name';
console.log(obj.myKey);  // it searches myKey as key inside obj
console.log(obj[myKey]);  // it searches myKey value ie name as key in obj


// nesting
const user = {
    name: "Amrik",
    email: "amrik.bhadra@gmail.com",
    address: {
        city: "Pune",
        pin: 412105,
        location: {
            lat: 23.2,
            lng: 77.4
        },
    },
};
console.log(user.address.location.lat);  // deep access

// objet destruture
let { city, pin, location } = user.address;
console.log(city);
console.log(pin);
console.log(location);


// looping in object
for (let key in user) {
    console.log(key, "-->", user[key]);
}

// Object.keys(object_name) --> gives array of keys of object
console.log(Object.keys) // [Function: keys]

// Object.entries(object_name) --> gives array of arrays. each array element is array of key and value
console.log(Object.entries); // [Function: entries]
// [
//     ["name", "Amrik"],
//     ["email", "amrik.bhadra@gmai.com"],
//     ["address", { city: "Pune", pin: 412105, location: { lat: 23.2, lng: 77.4 } }]
// ]

Object.keys(user).forEach((key) => console.log(key, "-->", user[key]));


// Object.assign
let user2 = Object.assign({}, user);  // help to assign key-value of
user2.name = 'Koyel';
Object.freeze(user2);   // this freezes the object so cant edit anymore
user2.email = 'koyel.bhadra@gmail.com';
console.log(user2);


// shallow copy
let originalUser = {
    name: "Amrik",
    roll: 45,
    email: "amrik.bhadra@gmail.com",
    address: {
        city: "Pune",
        state: "Maharashtra",
        pincode: 412105
    }
}

let copyUser = { ...originalUser };

// here the main issue is when nested object comes it if referenced
copyUser.name = "Rohan",
copyUser.address.city = "Amravati"
console.log(copyUser);
console.log(originalUser); // original object also got modified (city)

// Deep Clone
let deepCopy = JSON.parse(JSON.stringify(originalUser));
deepCopy.address.city = "Pune";
console.log(deepCopy)
console.log(originalUser);


// Optional Chaining
console.log(originalUser?.address?.city);  // if originalUser is not there; if address is not there then rather than giving error it will give 'undefined'


// if want to make a variables value as key of object then
let roleKey = "role";
let demoObj = {
    name: "Amrik",
    [roleKey]: "admin"
}
console.log(demoObj);   // { name: 'Amrik', role: 'admin' }


// Destructre the key "first-name" as variable called firstName
const myUser = {
    "first-name": "Amrik"
}
let { "first-name": firstName } = myUser;
console.log(firstName);