// constructor function
// used to create object/instances
function CreatePen(brand, name, color) {
    this.brand = brand;
    this.name = name;
    this.color = color;
    this.write = function(){
        let h1 = document.createElement("h1");
        h1.textContent = `Content written by ${this.brand} ${this.name}`;
        h1.style.color = this.color
        document.body.appendChild(h1);
    }
}

// when we call function, this -> Window
// but when we do using 'new' keyword, then this -> {} empty object
// and that empty object is returned to variable pen1, pen2 etc

const pen1 = new CreatePen("Reynolds", "Trimax", "red");
pen1.write();

const pen2 = new CreatePen("Cello", "Butterflow", "green");
pen2.write();


// prototype -> if any field is added to constructor function's prototype, then whatever instance is created using that constructor function, will get that field automatically
CreatePen.prototype.seller = "Ricky Stationary";

console.log('Pen1 Seller: ', pen1.seller);
console.log('Pen2 Seller: ', pen2.seller);