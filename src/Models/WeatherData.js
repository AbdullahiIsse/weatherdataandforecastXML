import createEvent from "./Event";

const createWeatherData = (time, place, value, type, unit) => {
    const event = createEvent(time, place);
    return Object.assign({}, event, {
        value,
        type,
        unit,
    });
};

export default createWeatherData;
