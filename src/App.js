import React, { useEffect, useState } from 'react'
import { FetchByCityName } from './FetchByCity/FetchByCityName';
import { getWeather } from './FetchByLocation/FetchByLocation';
import cold from './assets/cold.jpg'
import hot from './assets/hot.jpg'
import Bottom from './components/Bottom';
import History from './HistoryFetch/History';


export default function App() {

  const [weather, setweather] = useState()
  const [input, setinput] = useState('New York')
  const [img1, setimg] = useState(hot)
  const [historyData, sethistoryData] = useState([])
  // const [temp, settemp] = useState(22)

  const enterKey = (e) => {
    if (e.keyCode === 13) {
      setinput(e.currentTarget.value)
      e.currentTarget.blur()
    }


  }

  const result = async () => {
    const Data = await FetchByCityName(input)
    setweather(Data);
    let temp = 20;
    if (temp >= Data.temp) { setimg(cold) }
    else { setimg(hot) }
    // console.log(Data);
  }


  const Live = async () => {
    const data = getWeather()
    setweather(data);
    let temp = 20;
    if (temp >= data.temp) { setimg(cold) }
    else { setimg(hot) }

  }
  const history = async () => {
    const data = await History({ weather })
    sethistoryData(data)
    console.log(historyData);
  }

  const changeTime = (unix) => {

    const date = new Date(unix * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return day + "/" + month + "/" + year
  }


  useEffect(() => {
    result()
    history()

  }, [input])
  useEffect(() => {
    Live()
    history()
  }, [])


  return <>

    <div className='backgrounndIm' style={{ backgroundImage: `url(${img1})` }}>
      <div className='main_win'>

        <div className='container'>

          <div className='common inputdiv'>

            <input type="text" name='city' placeholder='enter city' onKeyDown={enterKey} />
            <button onClick={() => { Live(); history() }}>Get Current Location Weather</button>

          </div>

          {weather && <>
            <div className='common center'>
              <div className='cityNicon'>
                <h3>{weather.name},{weather.country}</h3>
                <h3></h3>
                <img src={weather.iconURL} alt='img'></img>
              </div>

              <div className='temp'>
                <h2>{weather.temp.toFixed()}°C</h2>
                <br></br>
                <h2>{weather.description}</h2>
              </div>
            </div>
            <div className='bottom'>
              <Bottom weather={weather} />
            </div>
            <div className='historical'>



              <h3 className='h3'>Historical Data</h3>
              <div className="mainBox">
                {
                  historyData.map((item) => <>

                    <div className="box">

                      <h6>{changeTime(item.dt)}</h6>
                      <small>Temp:{item.temp.toFixed()}°C</small>
                      <small>Humidity {item.humidity}%</small>
                      <small>{item.weather[0].description} </small>
                    </div>
                  </>)
                }
              </div>
            </div>
          </>}

        </div>
      </div>
    </div >

  </>
}
