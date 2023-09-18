import createWeatherData from "./WeatherData";


const cloudCoverage = (time,place,value, type, unit) => {
    return  createWeatherData(time, place, value, type, unit);
}

export default cloudCoverage;