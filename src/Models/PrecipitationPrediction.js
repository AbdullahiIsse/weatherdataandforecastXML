import createWeatherPrediction from "./WeatherPrediction";


const precipitationPrediction = (time,place, max, min, type, unit,expectedTypes) => {
    const weatherPrediction = createWeatherPrediction(time, place, max, min, type, unit);
    return Object.assign({}, weatherPrediction, {
        expectedTypes,
        matches: (data) => {
            return data.type === type && data.unit === unit;
        },
        convertToInches: () => {
            if (weatherPrediction.unit === 'mm') {
                weatherPrediction.value = weatherPrediction.value / 25.4;
                weatherPrediction.unit = 'inches';
            }
        },
        convertToMM: () => {
            if (weatherPrediction.unit === 'inches') {
                weatherPrediction.value = weatherPrediction.value * 25.4;
                weatherPrediction.unit = 'mm';
            }
        }

    });
}

export default precipitationPrediction;