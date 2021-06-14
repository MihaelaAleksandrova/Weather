const KELVIN = 273;
  //API KEY
  const key = "b1a41924de447699dd4f762e454ba912"
  const weather = []
  let place = ''

  const notificationElement = document.querySelector(".notification")

  // check if browser suppports geolocation
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
  } else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't support Geolocation</p>";
  }

  //set user's position
  function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
    getDetails(latitude, longitude);
  }

  //show error when there is an issue with geolocation service
  function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
  }

  // get weather from api
  function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&&appid=${key}`;

    fetch(api)
      .then(function (response) {
        let data = response.json();
        return data;
      })
      .then(function (data) {
        place = data.timezone
        for (let i = 0; i < 3; i++) {
          const dayData = data.daily[i]

          weather.push({
            temperature: Math.floor(dayData.temp.day - KELVIN),
            description: dayData.weather[0].description,
            iconId: dayData.weather[0].icon,
          })
        }
      })
      .then(function(){
        displayWeather();
      })
  }

  //display weather to ui
  function displayWeather(){
    const locationElement = document.querySelector(`.location p`)

    locationElement.innerHTML = `${place}`;

    for (let i = 0; i < weather.length; i++) {
      const iconElement = document.querySelector(`.day-${i + 1} .weather-icon`)
      const tempElement = document.querySelector(`.day-${i + 1} .temperature-value p`)
      const descElement = document.querySelector(`.day-${i + 1} .temperature-description p`)

      const dayData = weather[i]

      iconElement.innerHTML = `<img src = "../static/images/icons/${dayData.iconId}@2x.png"/>`;
      tempElement.innerHTML = `${dayData.temperature}°<span>C</span>`;
      descElement.innerHTML = dayData.description;
    }
  }