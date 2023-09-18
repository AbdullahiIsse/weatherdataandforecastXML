import React, {useEffect, useState} from "react";
import {
    getAverageWindSpeed,
    getMaxTemperature,
    getMinTemperature,
    getTotalPrecipitation,
    getWeatherData
} from "./Service/Service";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './App.css';

function App() {
    const options = [
        'Horsens', 'Aarhus', 'Copenhagen'
    ];

    const [data, setData] = useState([]);
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [maxTemperature, setMaxTemperature] = useState(null);
    const [minTemperature, setMinTemperature] = useState(null);
    const [averageWindSpeed, setAverageWindSpeed] = useState(null);
    const [totalPrecipitation, setTotalPrecipitation] = useState(null);


    useEffect(() => {
        async function fetchData() {
            const weatherData = await getWeatherData(selectedOption);
            setData(weatherData);
            console.log(weatherData);
        }

        async function fetchMaxTemperature() {
            const maxTemperature = await getMaxTemperature(selectedOption);
            setMaxTemperature(maxTemperature);
            console.log(maxTemperature);
        }

        async function fetchMinTemperature() {
            const minTemperature = await getMinTemperature(selectedOption);
            setMinTemperature(minTemperature);
            console.log(minTemperature);
        }

        async function fetchAverageWindSpeed() {
            const averageWindSpeed = await getAverageWindSpeed(selectedOption);
            setAverageWindSpeed(averageWindSpeed);
            console.log(averageWindSpeed);
        }
        async function fetchTotalPrecipitation() {
            const totalPrecipitation = await getTotalPrecipitation(selectedOption);
            setTotalPrecipitation(totalPrecipitation);
            console.log(totalPrecipitation);
        }

        fetchData();
        fetchMaxTemperature();
        fetchMinTemperature();
        fetchAverageWindSpeed();
        fetchTotalPrecipitation();
    }, [selectedOption]);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Weather Data</h1>

                <div className="Dropdown-container">
                    <Dropdown options={options} onChange={(option) => setSelectedOption(option.value)}
                              value={selectedOption} placeholder="Select a City"/>
                </div>
                <div className="max-temperature-container">
                    <h2>Max Temperature</h2>
                    <p>{maxTemperature} C</p>
                </div>

                <div className="min-temperature-container">
                    <h2>Min Temperature</h2>
                    <p>{minTemperature} C</p>
                </div>

                <div className="average-wind-speed-container">
                    <h2>Average Wind Speed</h2>
                    <p>{averageWindSpeed} m/s</p>
                </div>

                <div className="total-precipitation-container">
                    <h2>Total Precipitation</h2>
                    <p>{totalPrecipitation} mm</p>
                </div>
                <div className="flex-container">
                <div className="table-container">
                    <table>
                        <thead>
                        <tr>
                            <th>Place</th>
                            <th>Time</th>
                            <th>Value</th>
                            <th>Type</th>
                            <th>Unit</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((dataItem, index) => (
                            <tr key={index}>
                                <td>{dataItem.place}</td>
                                <td>{dataItem.time}</td>
                                <td>{dataItem.value}</td>
                                <td>{dataItem.type}</td>
                                <td>{dataItem.unit}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                    <div className="table-container2">
                        <table>
                            <thead>
                            <tr>
                                <th>Place</th>
                                <th>Time</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Unit</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((dataItem, index) => (
                                <tr key={index}>
                                    <td>{dataItem.place}</td>
                                    <td>{dataItem.time}</td>
                                    <td>{dataItem.value}</td>
                                    <td>{dataItem.type}</td>
                                    <td>{dataItem.unit}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

        </div>
            </header>


        </div>
    );
}

export default App;
