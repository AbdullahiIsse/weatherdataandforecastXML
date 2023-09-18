import createWeatherPrediction from "./WeatherPrediction";


const windPrediction = (time,place,max, min, type, unit,expectedDirections) => {

    const weatherPrediction = createWeatherPrediction(time, place, max, min, type, unit);

    return Object.assign({}, weatherPrediction, {
        expectedDirections,
        matches: (data) => {
            return data.type === type && data.unit === unit;
        },
        convertToMPH: () => {
            if (weatherPrediction.unit === 'ms') {
                weatherPrediction.value = weatherPrediction.value * 2.237;
                weatherPrediction.unit = 'mph';
            }
        },
        convertToMS: () => {
            if (weatherPrediction.unit === 'mph') {
                weatherPrediction.value = weatherPrediction.value / 2.237;
                weatherPrediction.unit = 'ms';
            }
        }
    } );
}

export default windPrediction;