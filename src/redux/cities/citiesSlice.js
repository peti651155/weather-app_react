// citiesSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cities: JSON.parse(localStorage.getItem('cities')) || [],
};

export const citiesSlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        addCity: (state, action) => {
            state.cities.push(action.payload);
            localStorage.setItem('cities', JSON.stringify(state.cities));
        },
        removeCity: (state, action) => {
            state.cities = state.cities.filter(city => city !== action.payload);
            localStorage.setItem('cities', JSON.stringify(state.cities));
        },
    },
});

export const { addCity, removeCity } = citiesSlice.actions;

export const selectCities = state => state.cities.cities;

export default citiesSlice.reducer;
