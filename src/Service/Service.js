import createWeatherData from "../Models/WeatherData";
import createWeatherForecast from "../Models/WeatherForecast";

export async function getWeatherData(place) {
    const url = `http://localhost:8080/data/${place}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
    };

    try {
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            return data.map((dataItem) => {

                return createWeatherData(dataItem.time, dataItem.place, dataItem.value, dataItem.type, dataItem.unit);
            });
        } else {
            console.error('Request failed with status:', response.status);
            return [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getMaxTemperature(place) {
    const url = `http://localhost:8080/data/${place}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
    };

    try {
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();

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
        } else {
            console.error('Request failed with status:', response.status);
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }


}

export async function getMinTemperature(place) {
    const url = `http://localhost:8080/data/${place}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
    };

    try {
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();


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
        } else {
            console.error('Request failed with status:', response.status);
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getAverageWindSpeed(place) {
    const url = `http://localhost:8080/data/${place}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
    };

    try {
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();

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
        } else {
            console.error('Request failed with status:', response.status);
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getTotalPrecipitation(place) {
    const url = `http://localhost:8080/data/${place}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
    };

    try {
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();

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
        } else {
            console.error('Request failed with status:', response.status);
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getWeatherForecastData(place) {
    const url = `http://localhost:8080/forecast/${place}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
    };

    try {
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            return data.map((dataItem) => {

                return createWeatherForecast(dataItem.time, dataItem.place, dataItem.from, dataItem.to, dataItem.unit, dataItem.type);
            });
        } else {
            console.error('Request failed with status:', response.status);
            return [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}



