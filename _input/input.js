const formElement = document.getElementById("form");
const answerElement = document.getElementById("answer");
const loaderElement = document.getElementById("loader");

formElement.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = event.target.name.value;

    // Перед запросом скроем старый ответ и покажем лоадер
    answerElement.style.display = "none";
    loaderElement.style.display = "block";

    try {
        const genderData = await loadGender(name);

        const { name: firstName, gender, probability } = genderData;

        // Ожидание некоторое время перед отображением результата (для имитации задержки)
        await sleep(1000);

        // Скроем лоадер и отобразим ответ
        loaderElement.style.display = "none";
        answerElement.textContent = `Имя: ${firstName} Пол: ${gender} С вероятностью: ${probability}`;
        answerElement.style.display = "block";
    } catch (error) {
        loaderElement.style.display = "none";
        answerElement.textContent = `Ошибка: ${error.message}`;
        answerElement.style.display = "block";
    }
});

async function loadGender(name) {
    const res = await fetch(`https://api.genderize.io/?name=${name}`);
    if (!res.ok) {
        throw new Error("Что-то пошло не так. Попробуйте еще раз.");
    }
    return res.json();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
