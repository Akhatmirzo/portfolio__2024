// var text = "userhjshj hjhsjhs jhdjhs";
// document.body.innerHTML = "";
// document.body.innerHTML = `
//     <h1 class='text'>Hello, world!</h1>
//     <h1 class="text">${text}</h1>
// `;

// document.write("<h1 class='text'>Hello, world!</h1>");
// var isConfirm = confirm("Sizning yoshingiz 18 dan oshganmi?");

// if (isConfirm) {
//     alert("Welcome to my web site?");
// }else { 
//     alert("No, go Home!");
// }

// function darkMode() {
//     document.body.style.backgroundColor = '#000';
//     document.body.style.color = 'white';
// }

// function lightMode() {
//     document.body.style.backgroundColor = '#fff';
//     document.body.style.color = 'black';
// }

// let a = 5;
// let b = 10;

// let c = a * b;

// console.log("jhsdfjkhsdsfjkdhsfjkds");

// alert(c);

// prompt("Salom");

// function posNeg(a, b, negative) {
//     if (!negative && a < 0 && b < 0) {
//         return false;
//     }
//     else if (!negative && (a < 0 || b < 0)) {
//         return true;
//     } else {
//         return false;
//     }
// }

// console.log(posNeg(1, -1, true));

// function frontBack(str) {
//     let str2 = "";
//     for (let i = 0; i < str.length; i++) {
//         let first = str[0];
//         if (i == 0) {
//             str2 += str[str.length - 1];
//         }else if (i == str.length - 1) {
//             str2 += first;
//         }else {
//             str2 += str[i];
//         }
//     }

//     return str2;
// }

// console.log(frontBack('code'));





// const btn = document.querySelector('#btn');
// const h1 = document.querySelector('h1');

// btn.addEventListener('click', function() {
//     h1.classList.toggle('btn-primary');
// })


var week = prompt("please enter a number for 1 to 7")

switch (week) {
    case '1':
        console.log("dushanba");
        break;
    case '2':
        console.log("seshanba");
        break;
    case '3':
        console.log("chorshanaba");
        break;
    case '4':
        console.log("payshanba");
        break;
    case '5':
        console.log("jum'a");
        break;
    case '6':
        console.log("shanba");
        break;
    case '7':
        console.log("yakshanba");
        break;
    default: 
        console.log("idiot?");
}