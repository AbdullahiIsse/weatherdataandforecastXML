import createWeatherPrediction from "./WeatherPrediction";


const cloudCoveragePrediction = (time,place,max, min, type, unit) => {
    return createWeatherPrediction(time, place, max, min, type, unit);
}

export default cloudCoveragePrediction;