import createEvent from "./Event";


const createWeatherPrediction = (time,place,max, min, type, unit) => {

    const event = createEvent(time, place);
    return Object.assign({}, event, {
        max,
        min,
        type,
        unit,
        matches: (data) => {
            return data.type === type && data.unit === unit;
        }
    });
}

export default createWeatherPrediction;