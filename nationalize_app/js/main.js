const predictForm = document.querySelector('#predictForm');
const mainWrapper = document.querySelector('#mainWrapper');


// let nationalizeData = JSON.parse(localStorage.getItem('nationalize')) || [];

async function predictApiURL(url) {
    const response = await fetch(url);
    const data = response.json();

    return data;
}

function maxProbabilityCountry(data) {
    let maxProbabilityCountry = { countryCode: "None", probability: 0 };
    data.forEach(country => {
        if (maxProbabilityCountry.probability < country.probability) {
            maxProbabilityCountry.countryCode = country.country_id;
            maxProbabilityCountry.probability = country.probability;
        }
    });

    return maxProbabilityCountry;
}

function renderEls(where, data) {
    switch (where) {
        case "main":
            let maxProbability = maxProbabilityCountry(data.country || []);

            const template = `
                <div
                    class="w-[30%] lg:w-[40%] md:w-[50%] sm:w-[80%] block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <a href="#!">
                        <img class="rounded-t-lg w-full" src="https://flagsapi.com/${maxProbability.countryCode}/flat/64.png"
                            alt="${maxProbability.countryCode}" />
                    </a>
                    <div class="p-6">
                        <h3 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                            Count: ${data.count}
                        </h3>
                        <h4 class="mb-2 text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                            Name: ${data.name}
                        </h4>
                        <h5 class="mb-2 text-md font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                            Country: ${maxProbability.countryCode} 
                        </h5>
                        <h5 class="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                            Probability: ${maxProbability.probability} 
                        </h5>
                        <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </p>
                    </div>
                </div>
            `
            mainWrapper.innerHTML = template;
            break;
        case "history":
            let maxProbabilityHistory = maxProbabilityCountry(data.country);

            
            break;
    }
}

predictForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = e.target[0];

    if (name.value) {
        predictApiURL(`https://api.nationalize.io/?name=${name.value}`)
            .then((data) => {
                console.log(data);

                // localStorage.setItem('nationalize', JSON.stringify(data));

                renderEls("main", data);
            }).catch((err) => {
                console.log(err);
            })
    }
})