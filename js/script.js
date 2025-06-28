let city = 'rafsanjan'
const API_KEY = "2a465e7e2b04fb45150cc9ea72aa72dc";
const CURRENT_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
let currentData = {};

const API_KEY2 = "a151042e302b4279a36132643252606";
const DAILY_WEATHER_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY2}&q=${city}&days=7&aqi=no&alerts=no`;
let dailyData = [];

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
    //console.log(currentData)
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

    return newFormat;
    
    
}

const dailyWeatherFormat = async () => {
    
    const DAILY_WEATHER_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY2}&q=${city}&days=7&aqi=no&alerts=no`;
    const url = await fetch(DAILY_WEATHER_URL);
    const data = await url.json();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    data.forecast.forecastday.forEach((d)=>{
        const date =new Date(d.date)
        newFormat = {
            weekDay : days[date.getDay()],
            avTemp : d.day.avgtemp_c,
            imgSrc : `https:${d.day.condition.icon}`
        } 
        dailyData.push(newFormat)
    })
    document.querySelector('.future-container').innerHTML=''
    for (let i = 1; i < dailyData.length; i++) {
        document.querySelector('.future-container').innerHTML += `
            <div class="future-box">
                <p class="future-box-day">
                    ${dailyData[i].weekDay}
                </p>
                <div class ='future-box-detail'>
                    <div class='future-box-avtemp'>
                        ${dailyData[i].avTemp}
                    </div>
                    <img src ='${dailyData[i].imgSrc}' class = 'future-box-icon'>
                </div>
            </div>`
        
    }
    dailyData = []
    
    console.log( dailyData)
}

const currentWeather = currentWeatherFormat() ;
const dailyWeather = dailyWeatherFormat();
searchBtn.addEventListener("click" , currentWeatherFormat)
searchBtn.addEventListener("click" , dailyWeatherFormat)
