// DOM --> Document Object Model
let abcd = document.getElementById("abcd");
console.log(abcd);
// console.dir(abcd);


let paragraph = document.getElementsByClassName("paragraph"); 
console.log(paragraph);  // HTMLCollection [p.paragraph]
// HTMLCollection(3) [p.paragraph, p.paragraph, p.paragraph]
// 0: p.paragraph
// 1:p.paragraph
// 2:p.paragraph
// length:3
// [[Prototype]]:HTMLCollection


let firstPara = document.querySelector("p"); // body ke ander pehla h1 select krega
console.dir(firstPara);

let allPara = document.querySelectorAll("p"); // body ke ander saare p elements select krega
console.log(allPara)  // NodeList(3) [p.paragraph, p.paragraph, p.paragraph]

allPara.forEach((para) => {
    console.log(para.innerText);
});


// change heading text
let h1 = document.querySelector("h1");
h1.textContent = "I am Amrik";             // change content of html element,  // works same as innerText
h1.innerHTML = "<i>Hey I am Amrik</i>";   // add html element
console.dir(h1);

// h1.hidden = true; // hides the html ement from he dom tree, will not be visible in the page

// in html element tag anything other than tag name is attribute
// eg: src, href, lang, content etc

let a = document.querySelector("a");
// a.href = "https://www.google.com";
a.setAttribute("href", "https://www.google.com");
console.log(a.getAttribute("href")); // gives the value of any attribute's value

let img = document.querySelector("img");
img.setAttribute("src", "https://unsplash.com/photos/a-butterfly-on-a-flower-4UeoE3Wn-oE");
img.setAttribute("alt", "Butterfly image");



// Dynamic DOM Manipulation
let h2 = document.createElement("h2");
h2.innerText = "This is second heading";
console.log(h2);
document.body.appendChild(h2); // add at end
document.querySelector("body").prepend(h2); // add at starting

// remove the element from the body
document.body.removeChild(h1);


// change css via js
h2.style.color = "red";
h2.style.fontFamily = "Gilroy";
h2.style.textTransform = "uppercase";

h2.classList.add("heading2");
h2.classList.remove("heading2");
h2.removeAttribute("class");

h2.classList.toggle("my-heading");  // agar hai toh hta do, nhi hai toh lga do