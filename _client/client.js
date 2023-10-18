
const clientContainer = document.getElementById("clientContainer");
const jsonServerURL = "https://loginofff.github.io/student-api/clients.json";

fetch(jsonServerURL)
    .then(response => response.json())
    .then(data => {
       
        data.forEach(client => {
            const clientCard = document.createElement("div");
            clientCard.classList.add("client-card");
            clientCard.innerHTML = `
                <h2>${client.name}</h2>
                <p>Возраст: ${client.age} лет</p>
                <p>Email: ${client.email}</p>
            `;
            clientContainer.appendChild(clientCard);
        });
    })
    .catch(error => {
        console.error("Произошла ошибка при загрузке данных о клиентах:", error);
    });
