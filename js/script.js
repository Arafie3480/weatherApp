let city = 'rafsanjan'
const API_KEY = "2a465e7e2b04fb45150cc9ea72aa72dc";
const CURRENT_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
let currentData = {};

const cityAsked = document.getElementById('city-name');
const searchBtn = document.getElementById('search');
const currentDate = document.getElementById('current-date');
const currentMainWeather = document.getElementById('main-weather');
const realFeel = document.getElementById('current-real-feel');
const currentTime = document.getElementById('current-time');
const currentHumidity = document.getElementById('current-humidity');
const currentWindSpeed = document.getElementById('current-wind-speed');


const currentWeatherFormat = async () =>{

    cityAsked.value === ''? city='rafsanjan ' : city = cityAsked.value ;
    const CURRENT_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const today = new Date();
    //const newToday = today.slice( 4 , 11)
    let newDate = String(today);
    newDate = newDate.slice( 4 , 10)
    newDate = newDate.replace(' ' , ',')
    console.log( newDate ,today )
    const dayOfWeek = today.getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayName = days[dayOfWeek];
    const url = await fetch(CURRENT_WEATHER_URL);
    currentData = await url.json();
    console.log(currentData)
    let newFormat = {
        cityName : currentData.name ,
        main : currentData.weather[0].description,
        temp : currentData.main.temp ,
        minTemp : currentData.main.temp_min ,
        maxTemp : currentData.main.temp_max ,
        feelsLike : currentData.main.feels_like ,
        humidity : currentData.main.humidity,
        today : currentDayName ,
        windSpeed : currentData.wind.speed ,
        weatherImgSrc : `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`  
    }
    cityAsked.value = '';

    document.querySelector('h1').innerText = 'Weather Forcast ' + newFormat.cityName
    document.getElementById('title-day').innerHTML = newFormat.today;
    document.getElementById('today-icon').src = newFormat.weatherImgSrc;
    document.getElementById('current-temp').innerText = newFormat.temp + '\u00B0C';
    currentDate.innerText = newDate + 'th';
    currentMainWeather.innerText = newFormat.main;
    realFeel.innerText = newFormat.feelsLike + '\u00B0C';
    currentTime.innerText = (today.getHours()) +':'+ (today.getMinutes());
    currentHumidity.innerText = newFormat.humidity + '%';
    currentWindSpeed.innerText = newFormat.windSpeed + 'm/s';
    console.log(newFormat);
    console.log('Humidity value:', newFormat.humidity);
    console.log('Humidity element:', document.getElementById('current-humidity'));
    console.log('Wind speed value:', newFormat.windSpeed);
    console.log('Wind speed element:', document.getElementById('current-wind-speed'));

    return newFormat;
    
    
}
const currentWeather = currentWeatherFormat() ;
searchBtn.addEventListener("click" , currentWeatherFormat)
