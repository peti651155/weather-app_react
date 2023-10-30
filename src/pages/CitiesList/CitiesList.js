import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCities, removeCity } from '../../redux/cities/citiesSlice';
import { useNavigate, Link } from 'react-router-dom';

function CitiesList() {
    const cities = useSelector(selectCities);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = (city) => {
        dispatch(removeCity(city));
    };

    return (
        <div className='container'>
            <h2>
                <ul>
                    {cities.map(city => (
                        <li key={city}>
                            <Link to={`/city/${city}`}>{city}</Link>
                            <button className="vdelete" onClick={() => handleDelete(city)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </h2>
            <center><button className="plusButton" onClick={() => navigate('/AddCity')}>+</button></center>
        </div>
    );
}

export default CitiesList;
