/**
 *  Project: worldwise
 *  File: CitiesContext.jsx
 *  Created: 3:59 CH, 10/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import { createContext, useContext, useEffect, useState } from 'react';


const BASE_URL = 'http://localhost:8888';
const CitiesContext = createContext(undefined);

function CitiesProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentCity, setCurrentCity] = useState({});
	
	useEffect(() => {
		const fetchCities = async () => {
			const res = await fetch(`${BASE_URL}/cities`);
			return res.json();
		};
		
		const loadCities = async () => {
			try {
				setIsLoading(true);
				const data = await fetchCities();
				if (!data) throw new Error('No data found!');
				setCities(data);
			}
			catch (err) {
				console.log(err);
			}
			finally {
				setIsLoading(false);
			}
		};
		
		loadCities();
	}, []);
	
	async function getCity(id) {
		try {
			setIsLoading(true);
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await res.json();
			if (!data) throw new Error('No data found!');
			setCurrentCity(data);
		}
		catch (err) {
			console.log(err);
		}
		finally {
			setIsLoading(false);
		}
	}
	
	return <CitiesContext.Provider
			value={{
				cities, setCities, isLoading, setIsLoading, currentCity, setCurrentCity, getCity
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
