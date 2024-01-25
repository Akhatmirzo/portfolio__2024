const submitForm = document.getElementById('submitForm');

const randomTeamMember = document.getElementById('randomTeam');
const team1 = document.getElementById('team1');
const team2 = document.getElementById('team2');

const urlBase = "https://crudcrud.com/api/19d54ecd7db445d9a1c7574d35c7e252";

submitForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let name = e.target[0];

    if (!name.value.includes(" ")) {
        if (name.value) {
            fetch(`${urlBase}/users`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: name.value })
            }).then(res => {
                return res.json();
            }).then(data => {
                console.log(data);
            }).catch(err => {
                console.log(err);
            })
        } else {
            alert("Please enter a name");
        }
    } else {
        alert("Invalid team name");
    }
})

function randomTeamSeperator(data) {
    let teamMember = data;

    if (teamMember.length % 2 == 0) {
        let firstTeam = [];
        let secondTeam = [];

        for (let i = 0; i < teamMember.length / 2; i++) {
            const randomNumber = Math.floor(Math.random() * teamMember.length);
            firstTeam.push(teamMember[randomNumber]);
            teamMember.splice(randomNumber, 1);
        }

        secondTeam = teamMember;

        const teams = [firstTeam, secondTeam];
        return teams;
    } else {
        console.log("Odamlar soni toq");
    }
}

//todo -----> POST /teams data
async function teamPost(data) {
    try {
        const response = await fetch(`${urlBase}/teams`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                teamMember: data,
            })
        })

        if (!response.ok) {
            throw new Error("Error posting" + response.status)
        } else {
            const res = await response.json();
            return res;
        }

    } catch (error) {
        console.log(error);
    }
}

// todo -----> GET /teams render
async function teamRender() {
    try {
        const response = await fetch(`${urlBase}/teams`);

        if (!response.ok) {
            throw new Error("Error get teams" + response.status);
        } else {
            const data = await response.json();

            if (data != []) {
                team1.innerHTML = "";
                team2.innerHTML = "";

                let firstTeam = {};
                let secondTeam = {};

                // Random team 1
                const randomTeam = Math.floor(Math.random() * data.length);
                firstTeam = data[randomTeam];
                data.splice(randomTeam, 1);

                for (let i = 0; i < data.length; i++) {
                    const randomTeam1 = Math.floor(Math.random() * data.length);

                    let isteamLength = data[randomTeam1].teamMember.length == firstTeam.teamMember.length;
                    
                    if (isteamLength) {
                        secondTeam = data[randomTeam1];
                    }
                }


                firstTeam.teamMember.forEach(team => {
                    team1.innerHTML += `
                        <li>${team.name}</li>
                    `
                });
                secondTeam.teamMember.forEach(team => {
                    team2.innerHTML += `
                        <li>${team.name}</li>
                    `
                });
            } else {
                alert("Foydalanuvchilar mavjud emas!");
            }
        }

    } catch (error) {
        console.log(error);
    }
}

randomTeamMember.addEventListener('click', () => {
    fetch(`${urlBase}/users`)
        .then(res => res.json())
        .then(data => {
            const Randomteams = randomTeamSeperator(data);
            console.log(Randomteams);
            teamPost(Randomteams[0])
            teamPost(Randomteams[1])

            teamRender();
        })
});