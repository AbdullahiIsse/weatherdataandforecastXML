import createWeatherData from "../Models/WeatherData";
import createWeatherForecast from "../Models/WeatherForecast";

function sendHttpRequest(method, url, headers, body) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);

        for (const key in headers) {
            xhr.setRequestHeader(key, headers[key]);
        }

        xhr.responseType = 'json';
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(`Request failed with status ${xhr.status}`);
            }
        };

        xhr.onerror = () => {
            reject('Request failed with a network error');
        };

        if (body) {
            xhr.send(JSON.stringify(body));
        } else {
            xhr.send();
        }
    });
}

export async function getWeatherData(place) {
    const url = `http://localhost:8080/data/${place}`;
    const headers = {
        accept: 'application/json',
    };

    try {
        const response = await sendHttpRequest('GET', url, headers);
        return response.map((dataItem) => {
            return createWeatherData(dataItem.time, dataItem.place, dataItem.value, dataItem.type, dataItem.unit);
        });
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getMaxTemperature(place) {
    const url = `http://localhost:8080/data/${place}`;
    const headers = {
        accept: 'application/json',
    };

    try {
        const response = await sendHttpRequest('GET', url, headers);
        const data = response;

        const latestDate = new Date(Math.max(...data.map((dataItem) => new Date(dataItem.time))));
        const startOfLastDay = new Date(latestDate);
        startOfLastDay.setDate(startOfLastDay.getDate() - 1);

        const lastDayTemperatureData = data.filter((dataItem) => {
            const dataDate = new Date(dataItem.time);
            return dataDate >= startOfLastDay && dataItem.type === 'temperature';
        });

        if (lastDayTemperatureData.length === 0) {
            console.warn('No temperature data found for the last day.');
            return null;
        }

        return Math.max(...lastDayTemperatureData.map((dataItem) => dataItem.value));
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getMinTemperature(place) {
    const url = `http://localhost:8080/data/${place}`;
    const headers = {
        accept: 'application/json',
    };

    try {
        const response = await sendHttpRequest('GET', url, headers);
        const data = response;

        const latestDate = new Date(Math.max(...data.map((dataItem) => new Date(dataItem.time))));
        const startOfLastDay = new Date(latestDate);
        startOfLastDay.setDate(startOfLastDay.getDate() - 1);

        const lastDayTemperatureData = data.filter((dataItem) => {
            const dataDate = new Date(dataItem.time);
            return dataDate >= startOfLastDay && dataItem.type === 'temperature';
        });

        if (lastDayTemperatureData.length === 0) {
            console.warn('No temperature data found for the last day.');
            return null;
        }

        return Math.min(...lastDayTemperatureData.map((dataItem) => dataItem.value));
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getAverageWindSpeed(place) {
    const url = `http://localhost:8080/data/${place}`;
    const headers = {
        accept: 'application/json',
    };

    try {
        const response = await sendHttpRequest('GET', url, headers);
        const data = response;

        const latestDate = new Date(Math.max(...data.map((dataItem) => new Date(dataItem.time))));
        const startOfLastDay = new Date(latestDate);
        startOfLastDay.setDate(startOfLastDay.getDate() - 1);

        const lastDayWindSpeedData = data.filter((dataItem) => {
            const dataDate = new Date(dataItem.time);
            return dataDate >= startOfLastDay && dataItem.type === 'wind speed';
        });

        if (lastDayWindSpeedData.length === 0) {
            console.warn('No wind speed data found for the last day.');
            return null;
        }

        const sumWindSpeed = lastDayWindSpeedData.reduce((total, dataItem) => total + dataItem.value, 0);
        return sumWindSpeed / lastDayWindSpeedData.length;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getTotalPrecipitation(place) {
    const url = `http://localhost:8080/data/${place}`;
    const headers = {
        accept: 'application/json',
    };

    try {
        const response = await sendHttpRequest('GET', url, headers);
        const data = response;

        const latestDate = new Date(Math.max(...data.map((dataItem) => new Date(dataItem.time))));
        const startOfLastDay = new Date(latestDate);
        startOfLastDay.setDate(startOfLastDay.getDate() - 1);

        const lastDayPrecipitationData = data.filter((dataItem) => {
            const dataDate = new Date(dataItem.time);
            return dataDate >= startOfLastDay && dataItem.type === 'precipitation';
        });

        if (lastDayPrecipitationData.length === 0) {
            console.warn('No precipitation data found for the last day.');
            return null;
        }

        return lastDayPrecipitationData.reduce((total, dataItem) => total + dataItem.value, 0);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getWeatherForecastData(place) {
    const url = `http://localhost:8080/forecast/${place}`;
    const headers = {
        accept: 'application/json',
    };

    try {
        const response = await sendHttpRequest('GET', url, headers);
        return response.map((dataItem) => {
            return createWeatherForecast(dataItem.time, dataItem.place, dataItem.from, dataItem.to, dataItem.unit, dataItem.type);
        });
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function postData(data) {
    const url = 'http://localhost:8080/data';
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const response = await sendHttpRequest('POST', url, headers, data);
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}
