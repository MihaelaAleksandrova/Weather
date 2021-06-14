  const iconElement = document.querySelector(".weather-icon");
  const tempElement = document.querySelector(".temperature-value p");
  const descElement = document.querySelector(".temperature-description p");
  const locationElement = document.querySelector(".location p");
  const notificationElement = document.querySelector(".notification");

  const weather = {}
    weather.temperature = {
      unit : "celsius"
    }
    weather.tempMAX = {
      unit: "celsius"
    }
    weather.tempMIN = {
      unit: "celsius"
    }
    weather.tempfeel = {
      unit: "celsius"
    }


    const KELVIN = 273;
    //API KEY
    const key = "b1a41924de447699dd4f762e454ba912"
    // check if browser suppports geolocation
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition(setPosition, showError);
    }else{
      notificationElement.style.display = "block";
      notificationElement.innerHTML = "<p>Browser doesn't support Geolocation</p>";
    }
    //set user's position
    function setPosition(position){
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;

      getWeather(latitude, longitude);
      getDetails(latitude,longitude);
    }
    //show error when there is an issue with geolocation service
    function showError(error){
      notificationElement.style.display = "block";
      notificationElement.innerHTML = `<p> ${error.message} </p>`;
    }  
    // get weather from api
    function getWeather(latitude, longitude){
      let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}` ;
      
      fetch(api)
         .then(function(response){
           let data = response.json();
           return data;
         })
         .then(function(data){
           weather.temperature.value = Math.floor(data.main.temp - KELVIN);
           weather.description = data.weather[0].description;
           weather.iconId = data.weather[0].icon
           weather.city = data.name;
           weather.country = data.sys.country;
         })
         .then(function(){
           displayWeather();
         })
    }
    //display weather to ui
    function displayWeather(){
      iconElement.innerHTML = `<img src = "../static/images/icons/${weather.iconId}@2x.png"/>`;
      tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
      descElement.innerHTML = weather.description;
      locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    }

  const feelslikeElement = document.querySelector(".feels-like p");
  const maxtempElement = document.querySelector(".max-temperature p");
  const mintempElement = document.querySelector(".min-temperature p");
  const windElement = document.querySelector(".wind p");
  const humidityElement = document.querySelector(".humidity p");
  
    // get details
    function getDetails(latitude, longitude){
      let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}` ;
      fetch(api)
         .then(function(response){
           let data = response.json();
           return data;
         })
         .then(function(data){
           weather.tempfeel.value = Math.floor(data.main.feels_like - KELVIN);
           weather.tempMAX.value = Math.floor(data.main.temp_max - KELVIN);
           weather.tempMIN.value = Math.floor(data.main.temp_min - KELVIN);
           weather.wind = data.wind.speed
           weather.humidity = data.main.humidity;
           
         })
         .then(function(){
           displayDetails();
         })
    }
    function displayDetails(){

      feelslikeElement.innerHTML = `${weather.tempfeel.value}°<span>C</span>`;
      maxtempElement.innerHTML = `${weather.tempMAX.value}°<span>C</span>`;
      mintempElement.innerHTML = `${weather.tempMIN.value}°<span>C</span>`;
      windElement.innerHTML = weather.wind;
      humidityElement.innerHTML = weather.humidity;
      
    }

    