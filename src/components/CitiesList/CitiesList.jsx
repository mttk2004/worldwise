/**
 *  Project: worldwise
 *  File: CityList.jsx
 *  Created: 11:06 SA, 09/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */


import styles   from './CitiesList.module.css';
import Spinner  from '../Spinner/Spinner.jsx';
import CityItem from '../CityItem/CityItem.jsx';
import Message  from '../Message/Message.jsx';
import { useCities } from '../../contexts/CitiesContext.jsx';


function CitiesList() {
	const { cities, isLoading } = useCities()
	
	if (isLoading) return <Spinner />;
	
	if (!cities.length) return <Message
			message="Please add your first city by clicking on a city on the map!" />;
	
	return <ul className={styles.cityList}>
		{cities.map(city => <CityItem city={city} key={city.id} />)}
	</ul>;
}

export default CitiesList;
