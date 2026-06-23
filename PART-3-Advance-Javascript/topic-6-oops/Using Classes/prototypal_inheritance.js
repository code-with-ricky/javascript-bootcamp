// Prototypal inheritance -> object to object inheritance
let coffee = {
    color: "dark",
    drink: function() {
        console.log("gut gut gut");
    }
}

let arabianCoffee = Object.create(coffee); // this will add all fields of coffee in prototype of arabianCoffee

arabianCoffee.taste = "bitter";
arabianCoffee.drink();