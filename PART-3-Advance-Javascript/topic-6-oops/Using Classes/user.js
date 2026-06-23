class User {
    constructor(name, email, username) {
        this.name = name;
        this.email = email;
        this.username = username;
        this.role = 'User';
    }

    write(text) {
        let h1 = document.createElement("h1");
        h1.textContent = `${this.username}: ${text}`;
        document.body.appendChild(h1);
    }

    checkRole() {
        console.log(`My role is ${this.role}`);
    }
}

// extend keyword is used to inherit parent class
class Admin extends User {
    constructor(name, email, username){
        super(name, email, username); // this will call the constructor function of Parent class (User)
        this.role = "Admin";
    }

    remove(){
        document.querySelectorAll("h1").forEach(function(ele){
            ele.remove();
        });
    }

    checkRole() {
        super.checkRole();
        console.log("Admin have called!");
    }
}

const user1 = new User("Srivaths Iyer", "sri@example.com", "sri");
const user2 = new User("Ramani Vemula", "ramani@example.com", "rama");
const user3 = new User("Riddhi Dethe", "riddhi@example.com", "riddhi");
const admin = new Admin("Amrik Bhadra", "amrik@example.com", "ricky");

user1.write("Vannakam");
user2.write("Kaise ho");
user3.write("Kasa kai");

// admin.remove();

admin.checkRole();
user1.checkRole();