// const ask = (question) => {
//     if (confirm(question)) {
//         console.log("Yes");
//     }else {
//         console.log("No");
//     }
// }

// const myProfile = () => {
//     return {name: "John", age: 10}
// }
// const myProfile = () => ({ name: "John", age: 10 })

// const sum = (a, b) => a + b;

// ask("Ishlar qalay");
// console.log(myProfile());
// console.log(sum(5, 5));

// const toqmi = (num) => num % 2 == 1;

// function rec(num) {
//     console.log(num);
//     if (num == 0 || num == null) {
//         return;
//     }

//     rec(num - 1);
// }

// let number = prompt("Please enter a number");
// rec(number);

// ! Qo'shilma
function plus(num) {
    if (num == 0) {
        return 0;
    }

    return num + plus(num - 1);
}

// console.log(plus(10));

// ! Ko'paaytma
function mult(num) {
    if (num == 1) {
        return 1;
    }

    return num * mult(num - 1);
}

// console.log(mult(5));

// ! Daraja 
function powing(num, pow) {
    if (pow > 0) {
        return num * powing(num, pow - 1);
    }
    return 1;
}

console.log(powing(2, 5));

// 2 , 16
// 2 , 8
// 2 , 4
// 2 , 2
// 2 , 1