import createWeatherData from "./WeatherData";


const precipitation = (time,place,value,type,unit,precipitationType) => {

    const weatherData = createWeatherData(time, place, value, type, unit);
    return Object.assign([],weatherData,{
        precipitationType,
        convertToInches: () => {
            if (weatherData.unit === 'mm') {
                weatherData.value = weatherData.value / 25.4;
                weatherData.unit = 'inches';
            }
        },
        convertToMM: () => {
            if (weatherData.unit === 'inches') {
                weatherData.value = weatherData.value * 25.4;
                weatherData.unit = 'mm';
            }
        }
    })
}

export default precipitation;