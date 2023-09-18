import createEvent from "./Event";

const createWeatherForecast = (time, place, from ,to,unit,type) => {

    const event = createEvent(time, place);
    return Object.assign({}, event, {
        from,
        to,
        unit,
        type,
    } );
}

export default createWeatherForecast;