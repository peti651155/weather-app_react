import React from 'react';
// import ReactDOM from 'react-dom/client'; // Ügyelj arra, hogy ez az új import helyes-e
import ReactDOM from 'react-dom';

import './styles/styles.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';

// Létrehozzuk a root-ot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendereljük az alkalmazást a Redux store segítségével
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

// Az alábbi kód a teljesítmény méréséhez szükséges, ha nem kívánod használni, akkor kommentezd ki vagy töröld
reportWebVitals();
