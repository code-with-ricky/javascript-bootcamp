class CreatePen {
    // constructor function
    constructor(brand, name, color, price) {
        this.brand = brand;
        this.name = name;
        this.color = color;
        this.price = price;
    }

    // methods
    write() {
        let h1 = document.createElement("h1");
        h1.textContent = `Content written by ${this.brand} ${this.name}`;
        h1.style.color = this.color
        document.body.appendChild(h1);
    }

    erase() {
        document.querySelectorAll("h1").forEach((ele) => {
            if(ele.style.color === this.color){
                ele.remove();
            }
        });
    }
}

const pen1 = new CreatePen("Reynolds", "Trimax", "red", 45);
const pen2 = new CreatePen("Cello", "Butterflow", "blue", 20);

pen1.write();
pen2.write();
pen1.write();
pen2.write();
pen1.write();
pen2.write();