let marks = 67;
if(marks >= 90){
    console.log("Grade: A");
}else if(marks >= 75){
    console.log("Grade: B");
}else if(marks >= 55){
    console.log("Grade: C");
}else{
    console.log("Grade: Fail");
}


let day = 5;
switch(day){
    case 1:
        console.log("Sunday");
        break;
    case 2:
        console.log("Monday");
        break;
    case 3:
        console.log("Tuesday");
        break;
    case 4:
        console.log("Wednesday");
        break;
    case 5:
        console.log("Thursday");
        break;
    case 6:
        console.log("Friday");
        break;
    case 7:
        console.log("Saturday");
        break;
    default:
        console.log("Invalid option");
}


// early return pattern
function getVal(val){
    if(val > 90) return 'A'
    else if(val > 75) return 'B';
    else if(val > 50) return 'C';
    else return 'D';
}

console.log(getVal(89));