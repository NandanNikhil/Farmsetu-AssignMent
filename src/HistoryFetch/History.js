import axios from "axios";

let arr = [];
const History = async ({ weather }) => {
    // if (weather.lat && weather.lon) { console.log("ahe") }
    // else {
    //     weather.lat = 40.7143
    //     weather.lon = -74.006;
    //}
    if (arr.length > 1) {
        arr = []
        // console.log("aal");
    }
    console.log(weather.lat);
    console.log(weather.lon);
    console.log(arr);
    let d = new Date();
    for (let i = 1; i < 6; i++) {

        var now_utc = new Date(Date.UTC(d.getFullYear(), d.getMonth(), (d.getDate() - i)))
        //  console.log(now_utc);

        const unixtimestamp = Math.floor(now_utc.getTime() / 1000);
        // console.log(unixtimestamp);
        const url = (`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${weather.lat}&lon=${weather.lon}&dt=${unixtimestamp}&units=metric&appid=7facebd2cd201249fb820ac63ed905e5`)
        const { data } = await axios.get(url)
        arr.unshift(data.current)
    }

    return arr
}


export default History