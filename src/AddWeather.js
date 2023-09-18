import React, { useState } from "react";
import './App.css';
import {postData} from "./Service/Service";

function App() {
    const [formData, setFormData] = useState({
        type: "",
        time: "",
        place: "",
        value: "",
        unit: "",
        precipitation_type: "",
        direction: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await postData([formData]);
        if (response) {
            console.log('POST request successful:', response);
            setFormData( {
                type: "",
                time: "",
                place: "",
                value: "",
                unit: "",
                precipitation_type: "",
                direction: "",
            })

        } else {
            console.log('POST request failed.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Send Data</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Type:</label>
                        <input
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Time:</label>
                        <input
                            type="text"
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Place:</label>
                        <input
                            type="text"
                            name="place"
                            value={formData.place}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Value:</label>
                        <input
                            type="text"
                            name="value"
                            value={formData.value}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Unit:</label>
                        <input
                            type="text"
                            name="unit"
                            value={formData.unit}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Precipitation Type:</label>
                        <input
                            type="text"
                            name="precipitation_type"
                            value={formData.precipitation_type}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Direction:</label>
                        <input
                            type="text"
                            name="direction"
                            value={formData.direction}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </header>
        </div>
    );
}

export default App;
