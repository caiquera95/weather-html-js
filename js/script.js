const apiKey = "0988328c9b80fd39926528611c31a7ac";
const apiCountryUrl = "https://countryflagsapi.com/png/";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data")

const getWeatherData =  async (city) => {
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
    const res = await fetch(apiWeatherUrl)
    const data = await res.json();
    console.log(data)

    return data;
}


const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    if (data.cod === "404") {
        alert("Cidade não encontrada");
        document.querySelector("#city-input").value = "";
        return;
    }

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", 
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", apiCountryUrl + data.sys.country);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = parseInt(`${data.wind.speed}`) + ' km/h';

    document.querySelector("#city-input").value = "";
    
    weatherContainer.classList.remove("hide")
}

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
    
});

cityInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter"){
        const city = e.target.value;
        showWeatherData(city);
    }
})