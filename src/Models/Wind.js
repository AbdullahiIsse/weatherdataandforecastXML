import createWeatherData from "./WeatherData";


const wind = (time,place,value, type, unit, direction) => {
    const weatherData = createWeatherData(time, place, value, type, unit);
    return Object.assign([],weatherData,{
        direction,
        convertToMPH: () => {
            if (weatherData.unit === 'MS') {
                weatherData.value = weatherData.value * 2.237;
                weatherData.unit = 'MPH';
            }
        },
        convertToMS: () => {
            if (weatherData.unit === 'MPH') {
                weatherData.value = weatherData.value / 2.237;
                weatherData.unit = 'MS';
            }
        }
    })
}

export default wind;