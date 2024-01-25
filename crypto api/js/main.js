const subForm = document.getElementById('subForm');
const wrap = document.getElementById('wrap');

subForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let selected = e.target[0];
    let pizzaSize = e.target[1].checked ? 
        e.target[1].id : e.target[2].checked ? e.target[2].id : e.target[3].id

    if (selected.value != "none") {
        const obj = {
            selected: selected.value,
            pizzaSize
        }

        wrap.innerHTML = `
            <h1 style="text-transform: capitalize;">${obj.selected}</h1>
            <h1>${obj.pizzaSize}</h1>
        `

        console.log(obj);
    }else {
        alert("Please select a pizza");
    }
});