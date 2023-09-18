import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Weather from './weather';
import AddWeather from './AddWeather';


function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navbar />}>
                    <Route index element={<Weather />} />
                    <Route path="/AddWeather" element={<AddWeather />} />

                    {/* Route path "*" means whatever other route you go to will redirect to the Error page. */}
                    <Route path="*" element={<h1>Error page</h1>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
