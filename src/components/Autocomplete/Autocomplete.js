import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCity } from "../redux/cities/citiesSlice";

function Autocomplete() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const dispatch = useDispatch();
  const addedCities = useSelector((state) => state.cities.list);

  useEffect(() => {
    if (query.length > 2) {
      handleSearch();
    }
  }, [query]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/find?q=${query}&units=metric&appid=39fcfbebbee3c502b73e6062ba8c4eb8`);
      const data = await response.json();
      const filteredResults = data.list.filter(city => !addedCities.includes(city.name));
      setResults(filteredResults);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const handleSelect = (city) => {
    dispatch(addCity(city));
    setResults([]);
  };

  return (
    <div>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <ul>
        {results.map(city => (
          <li key={city.id} onClick={() => handleSelect(city)}>
            {city.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Autocomplete;
