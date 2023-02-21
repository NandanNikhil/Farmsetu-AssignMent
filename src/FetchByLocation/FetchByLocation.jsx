let latitude,longitude
let Data;
  const makeIconURL = (iconId) =>`https://openweathermap.org/img/wn/${iconId}@2x.png`;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (data) {
      // console.log(data);
      latitude = data.coords.latitude
      longitude= data.coords.longitude

      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=709e924c4f4339b0236a946826faa97e`)
        .then(function (res) {
          return res.json()
        }).then(function (data) {

        }).catch(function (err) {
          console.log(err);
        })
    }, function (error) {
      console.log(error);
    }, { enableHighAccuracy: true, })
  } else {
    console.log("geo location not supported");
  }

  function getWeather() {
    

    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=46039f025691707d3db2adc57b3cd3bb&units=metric`

    fetch(url)
      .then(
        function (response) {
          return response.json()
        })

      .then(function (data) {
         Data=data;
        // console.log(data);
      })
       .catch(
        function (err) {
          console.log(err);
        })
  
      const {
        weather,
        coord:{lat,lon},
        main: { temp, feels_like, temp_min, temp_max, humidity },
        wind: { speed },
        sys: { country },
        name,
      } = Data;
    
      const { description, icon } = weather[0];

      return {
        description,
        iconURL: makeIconURL(icon),
        lat,
        lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        speed,
        country,
        name
  
    };
  }

  export {getWeather}