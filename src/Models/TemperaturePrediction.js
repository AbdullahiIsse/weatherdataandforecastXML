import createWeatherPrediction from "./WeatherPrediction";


const temperaturePrediction = (time,place,max, min, type, unit) => {
    const weatherPrediction = createWeatherPrediction(time, place, max, min, type, unit);
    return Object.assign({}, weatherPrediction, {
        convertToF: () => {
            if (weatherPrediction.unit === 'C') {
                weatherPrediction.value = (weatherPrediction.value * 9/5) + 32;
                weatherPrediction.unit = 'F';
            }
        } ,
        convertToC: () => {
            if (weatherPrediction.unit === 'F') {
                weatherPrediction.value = (weatherPrediction.value - 32) * 5/9;
                weatherPrediction.unit = 'C';
            }
        }
    } );
}

export default temperaturePrediction;