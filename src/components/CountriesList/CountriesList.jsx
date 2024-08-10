/**
 *  Project: worldwise
 *  File: CountriesList.jsx
 *  Created: 3:14 CH, 09/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import Spinner     from '../Spinner/Spinner.jsx';
import Message     from '../Message/Message.jsx';
import CountryItem from '../CountryItem/CountryItem.jsx';
import styles      from './CountriesList.module.css';
import { useCities } from '../../contexts/CitiesContext.jsx';


function CountriesList() {
	const { cities, isLoading } = useCities()
	
	if (isLoading) return <Spinner />;
	
	if (!cities.length) return <Message
			message="Please add your first city by clicking on a city on the map!" />;
	
	const countries = cities.reduce((arr, city) => {
		if (!arr.map((el) => el.country).includes(city.country))
			return [...arr, { country: city.country, emoji: city.emoji }];
		else return arr;
	}, []);
	
	return <ul className={styles.countryList}>
		{countries.map(country => <CountryItem country={country} key={country.country} />)}
	</ul>;
}

export default CountriesList;
