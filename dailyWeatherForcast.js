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


window.addEventListener('load', () => {
  errorMessageElement = document.getElementById('errorMessageID');
  getLocation();
  searchWeatherByCity();
});


searchWeatherByCity();