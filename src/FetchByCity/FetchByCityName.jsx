const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const FetchByCityName = async (city) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=709e924c4f4339b0236a946826faa97e&units=metric`;

  const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);
 const {
    weather,
    coord:{lat,lon},
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = data;

  const { description, icon } = weather[0];

  return {
    lat,lon,
    description,
    iconURL: makeIconURL(icon),
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    speed,
    country,
    name,
  };
};

export { FetchByCityName };