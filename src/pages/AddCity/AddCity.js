import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCity, selectCities } from '../../redux/cities/citiesSlice';
import { useNavigate } from 'react-router-dom';
import allCapitals from './capitals';
import Select from 'react-select';

function AddCity() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const cities = useSelector(selectCities);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const options = allCapitals.filter(city => !cities.includes(city)).map(city => {
        const regex = new RegExp(`(${inputValue})`, 'gi');
        const label = city.replace(regex, '<span class="highlight">$1</span>');
        return { value: city, label: label };
    });

    const handleChange = (option) => {
        // A kijelölt opciót kettéosztjuk: a value az eredeti érték, a label pedig a HTML-kódos kiemelés
        setSelectedOption({ value: option.value, label: option.value });
    };

    const handleSave = () => {
        if (selectedOption) {
            dispatch(addCity(selectedOption.value));
            navigate('/');
        }
    };

    const handleInputChange = (value) => {
        setInputValue(value);
        return value;
    };

    const customStyles = {
        control: (base, state) => ({
            ...base,
            borderColor: state.isFocused ? 'transparent' : 'transparent',
            boxShadow: 'none'
        }),
        option: (provided, state) => ({
            ...provided,
        }),
        singleValue: (provided, state) => ({
            ...provided,
            display: 'flex',
            alignItems: 'center',
        }),
    };

    // Definiáljuk az Option komponenst
    const Option = (props) => {
        return (
            <div {...props.innerProps}>
                <div dangerouslySetInnerHTML={{ __html: props.data.label }} />
            </div>
        );
    };

    return (
        <div>
            <button className='backButton' onClick={() => navigate('/')}>
                <img src={require('./../../vissza.png')} alt="Back" />
            </button>
            <div className="container_addcity">
                <Select 
                    value={selectedOption}
                    onChange={handleChange}
                    onInputChange={handleInputChange}
                    options={options}
                    placeholder="Select city.."
                    classNamePrefix="custom-select"
                    styles={customStyles}
                    components={{ Option }}
                /><br />
                {selectedOption && <center><button className="vsave" onClick={handleSave}>Save</button></center>}
            </div>
        </div>
    );
}

export default AddCity;
