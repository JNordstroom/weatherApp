//Dagligt väder med lat och long samt efter sökning

const iconElement = document.getElementById('iconID');
const tempElement = document.getElementById('tempID');
const cityElement = document.getElementById('cityID');
const weatherInfoElement = document.getElementById('weatherInfoID');
const humidityElement = document.getElementById('humidityID');
const windElement = document.getElementById('windID');
const sunriseElement = document.getElementById('sunriseID');
const sunsetElement = document.getElementById('sunsetID');
let errorMessageElement;




function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
             const latitude = position.coords.latitude;
             const longitude = position.coords.longitude;
            fetchWeatherData(latitude, longitude);
            fetchFiveDayWeatherData(latitude, longitude);
        }, error => {
            console.log('Error:', error);
        });
    } else {
        console.log('Geolocation kan inte användas på din browser.');
        errorMessageElement.textContent = 'Geolocation kan inte användas på din browser.';
        return;
    }
}


function fetchWeatherData(lat, long, city){
    let apiUrl = '';
    
    if(lat && long){
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&lang=sv&appid=5f8720cba1f10e09507ee30899b138a5`;
        
    }
    else if(city){
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=sv&appid=5f8720cba1f10e09507ee30899b138a5`;
        
    }
    else{
        console.log('Felaktig inmatning!')
        errorMessageElement.textContent = 'Felaktig inmatning, försök igen!';
    }
    
    
    
    
    fetch(apiUrl)
    .then((Response) => Response.json())
    .then((data) => {
        cityElement.textContent = `${data.name}`;

        const temperature = Math.round(data.main.temp);
        tempElement.textContent = `${temperature.toString()}`;

        weatherInfoElement.textContent = `${data.weather[0].description}`;

        humidityElement.textContent = ` ${data.main.humidity} %`;

        const wind = Math.round(data.wind.speed)
        windElement.textContent = ` ${wind} m/s`;

        const timestampSunrise = data.sys.sunrise;
        const dateSunRiseObject = new Date(timestampSunrise * 1000);
        const convertedSunriseTime = dateSunRiseObject.toLocaleTimeString();
        sunriseElement.textContent = ` ${convertedSunriseTime.toString()}`;

        const timestampSunset = data.sys.sunset;
        const dateSunsetObject = new Date(timestampSunset * 1000);
        const convertedSunsetTime = dateSunsetObject.toLocaleTimeString();
        sunsetElement.textContent = ` ${convertedSunsetTime.toString()}`;

        if(data.weather[0].main == 'Clouds'){
            iconElement.src = 'images/clouds.png';
        }
        else if(data.weather[0].main == 'Clear'){
            iconElement.src = 'images/clear.png';
        }
        else if(data.weather[0].main == 'Rain'){
            iconElement.src = 'images/rain.png';
        }
        else if(data.weather[0].main == 'Drizzle'){
            iconElement.src = 'images/drizzle.png';
        }
        else if(data.weather[0].main == 'Mist'){
            iconElement.src = 'images/mist.png';
        }
        else if(data.weather[0].main == 'Snow'){
            iconElement.src = 'images/snow.png';
        }
        errorMessageElement.textContent = ''; 

        weatherInfoElement.style.display = 'block';
    })
    .catch(error => {
        console.log('Error:', error);
        errorMessageElement.textContent = 'Felaktig inmatning, försök igen!';
    }); 
};
function searchWeatherByCity() {
    const searchInput = document.getElementById('inputID');
    const searchButton = document.getElementById('buttonID');

    function searchWays() {
        const city = searchInput.value.trim();
        if (city) {
            fetchWeatherData(null, null, city);
            fetchFiveDayWeatherData(null, null, city);
        }
        else {
            console.log('Skriv in en befintlig stad')
            errorMessageElement.textContent = 'Felaktig inmatning, försök igen!';
            
        }
        
    };

    searchButton.addEventListener('click', searchWays);

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            searchWays();
        }
    });
}



//veckoväder med lat och long samt efter sökning

const dayOneDateElement = document.getElementById('boxOneDateID');
const boxOneTempElement = document.getElementById('boxOneTempID');
const boxOneWeatherInfoElement = document.getElementById('boxOneWeatherInfoID');

const dayTwoDateElement = document.getElementById('boxTwoDateID');
const boxTwoTempElement = document.getElementById('boxTwoTempID')
const boxTwoWeatherInfoElement = document.getElementById('boxTwoWeatherInfoID')

const dayThreeDateElement = document.getElementById('boxThreeDateID');
const boxThreeTempElement = document.getElementById('boxThreeTempID');
const boxThreeWeatherInfoElement = document.getElementById('boxThreeWeatherInfoID');

const dayFourDateElement = document.getElementById('boxFourDateID');
const boxFourTempElement = document.getElementById('boxFourTempID');
const boxFourWeatherInfoElement = document.getElementById('boxFourWeatherInfoID');

const dayFiveDateElement = document.getElementById('boxFiveDateID');
const boxFiveTempElement = document.getElementById('boxFiveTempID');
const boxFiveWeatherInfoElement = document.getElementById('boxFiveWeatherInfoID');

function fetchFiveDayWeatherData(lat, long, city){
    let fiveDayApiUrl = '';
    
    if(lat && long){
        fiveDayApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&lang=sv&appid=5f8720cba1f10e09507ee30899b138a5`;
        
    }
    else if(city){
        fiveDayApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=sv&appid=5f8720cba1f10e09507ee30899b138a5`;
        
    }
    else{
        console.log('Felaktig inmatning!')
        errorMessageElement.textContent = 'Felaktig inmatning, försök igen!';
    }
    
    
    var daysOfWeek = ['Söndag','Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
    
    fetch(fiveDayApiUrl)
    .then((Response) => Response.json())
    .then((data) => {
        var currentDate = new Date();

        var dayOneDate = new Date(data.list[7].dt_txt);
        var dayOneName = (currentDate.getDate()) ? "Imorgon" : daysOfWeek[dayOneDate.getDay()];
        dayOneDateElement.textContent = dayOneName;
        const boxOneTemp = Math.round(data.list[7].main.temp);
        boxOneTempElement.textContent = `${boxOneTemp.toString()}°C`;
        boxOneWeatherInfoElement.textContent = `${data.list[7].weather[0].description}`;

        var dayTwoDate = new Date(data.list[15].dt_txt);
        var dayTwoName = daysOfWeek[dayTwoDate.getDay()];
        dayTwoDateElement.textContent = dayTwoName;
        const boxTwoTemp = Math.round(data.list[15].main.temp);
        boxTwoTempElement.textContent = `${boxTwoTemp.toString()}°C`;
        boxTwoWeatherInfoElement.textContent = `${data.list[15].weather[0].description}`;


        var dayThreeDate = new Date(data.list[23].dt_txt);
        var dayThreeName = daysOfWeek[dayThreeDate.getDay()];
        dayThreeDateElement.textContent = dayThreeName;
        const boxThreeTemp = Math.round(data.list[23].main.temp);
        boxThreeTempElement.textContent = `${boxThreeTemp.toString()}°C`;
        boxThreeWeatherInfoElement.textContent = `${data.list[23].weather[0].description}`;

        var dayFourDate = new Date(data.list[31].dt_txt);
        var dayFourName = daysOfWeek[dayFourDate.getDay()];
        dayFourDateElement.textContent = dayFourName;
        const boxFourTemp = Math.round(data.list[31].main.temp);
        boxFourTempElement.textContent = `${boxFourTemp.toString()}°C`;
        boxFourWeatherInfoElement.textContent = `${data.list[31].weather[0].description}`;
        
        var dayFiveDate = new Date(data.list[39].dt_txt);
        var dayFiveName = daysOfWeek[dayFiveDate.getDay()];
        dayFiveDateElement.textContent = dayFiveName;
        const boxFiveTemp = Math.round(data.list[39].main.temp);
        boxFiveTempElement.textContent = `${boxFiveTemp.toString()}°C`;
        boxFiveWeatherInfoElement.textContent = `${data.list[39].weather[0].description}`;
        
        
    });
}

//Attribution popoup


function toggleAttibutionBox(){
    var attributionBox = document.querySelector('.attributionBox');

    if( attributionBox.style.display === "block"){
        attributionBox.style.display ="none";

    }
    else{
        attributionBox.style.display = "block";
    }
}

window.addEventListener('load', () => {
  errorMessageElement = document.getElementById('errorMessageID');
  getLocation();
  searchWeatherByCity();
});




