let city = 'tehran'
const API_KEY = "2a465e7e2b04fb45150cc9ea72aa72dc";
const CURRENT_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
const testApi =async () => {
    const url = await fetch(CURRENT_WEATHER_URL);
    const data = await url.json()
    console.log(data)
}
testApi()