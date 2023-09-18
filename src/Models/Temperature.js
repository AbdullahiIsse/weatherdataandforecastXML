import createWeatherData from "./WeatherData";

const temperature = (time,place,value, type, unit) => {
    const weatherData = createWeatherData(time, place, value, type, unit);

    return Object.assign({}, weatherData, {
        convertToF: () => {
            if (weatherData.unit === 'C') {
                weatherData.value = (weatherData.value * 9/5) + 32;
                weatherData.unit = 'F';
            }
        },
        convertToC: () => {
            if (weatherData.unit === 'F') {
                weatherData.value = (weatherData.value - 32) * 5/9;
                weatherData.unit = 'C';
            }
        },
    });
};

export default temperature;
