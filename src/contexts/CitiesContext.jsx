/**
 *  Project: worldwise
 *  File: CitiesContext.jsx
 *  Created: 3:59 CH, 10/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import { createContext, useContext, useEffect, useReducer } from 'react';


const BASE_URL = 'http://localhost:8888';

const CitiesContext = createContext(undefined);

const initialState = {
	cities     : [],
	isLoading  : false,
	currentCity: {},
	error      : ''
};

const reducer = function (state, action) {
	switch (action.type) {
	case 'loading':
		return { ...state, isLoading: true };
	case 'cities/loaded':
		return { ...state, isLoading: false, cities: action.payload };
	case 'city/created':
		return { ...state, isLoading: false, cities: [...state.cities, action.payload], currentCity: action.payload };
	case 'city/deleted':
		return {
			...state,
			isLoading: false,
			cities   : state.cities.filter(city => city.id !== action.payload),
			currentCity: {}
		};
	case 'city/loaded':
		return { ...state, isLoading: false, currentCity: action.payload };
	case 'rejected':
		return { ...state, isLoading: false, error: action.payload };
	default:
		throw new Error('Unknown action');
	}
};

function CitiesProvider({ children }) {
	const [{ cities, currentCity, isLoading, error }, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		const fetchCities = async () => {
			const res = await fetch(`${BASE_URL}/cities`);
			return res.json();
		};
		
		const loadCities = async () => {
			dispatch({ type: 'loading' });
			
			try {
				const data = await fetchCities();
				
				if (!data) throw new Error('No data found!');
				
				dispatch({ type: 'cities/loaded', payload: data });
			}
			catch (err) {
				console.log(err);
				dispatch({ type: 'rejected', payload: 'There was an error loading cities!' });
			}
		};
		
		loadCities();
	}, []);
	
	async function getCity(id) {
		if (+id === currentCity.id) return;
		
		dispatch({ type: 'loading' });
		
		try {
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await res.json();
			
			if (!data) throw new Error('No data found!');
			
			dispatch({ type: 'city/loaded', payload: data });
		}
		catch (err) {
			console.log(err);
			dispatch({ type: 'rejected', payload: 'There was an error loading city!' });
		}
	}
	
	async function createCity(newCity) {
		dispatch({ type: 'loading' });
		
		try {
			const res = await fetch(`${BASE_URL}/cities`, {
				method : 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body   : JSON.stringify(newCity)
			});
			const data = await res.json();
			
			if (!data) throw new Error('Something went wrong when trying to create city!');
			
			dispatch({ type: 'city/created', payload: data });
		}
		catch (err) {
			console.log(err);
			dispatch({ type: 'rejected', payload: 'There was an error creating city!' });
		}
	}
	
	async function deleteCity(id) {
		dispatch({ type: 'loading' });
		
		try {
			await fetch(`${BASE_URL}/cities/${id}`, {
				method: 'DELETE',
			});
			
			dispatch({ type: 'city/deleted', payload: id });
		}
		catch (err) {
			console.log(err);
			dispatch({ type: 'rejected', payload: 'There was an error deleting city!' });
		}
	}
	
	return <CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				error,
				getCity,
				createCity,
				deleteCity
			}}>
		{children}
	</CitiesContext.Provider>;
}

function useCities() {
	const context = useContext(CitiesContext);
	if (!context) {
		throw new Error('useCities must be used within a CitiesProvider');
	}
	return context;
}

export { CitiesProvider, useCities };
