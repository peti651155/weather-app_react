import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import AddCity from './pages/AddCity/AddCity';
import CitiesList from './pages/CitiesList/CitiesList';
import CityDetails from './pages/CityDetails/CityDetails';
// Feltételezem, hogy a Page3 és Page1 komponensek is importálásra kerülnek innen, így hozzáadom őket:
// import Page1 from './path-to-Page1';
// import Page3 from './path-to-Page3';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/addcity" element={<AddCity />} />
                    <Route path="/city/:cityName" element={<CityDetails/>} />
                    <Route path="/" element={<CitiesList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
