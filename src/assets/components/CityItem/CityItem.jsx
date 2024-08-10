/**
 *  Project: worldwise
 *  File: CityItem.jsx
 *  Created: 1:38 CH, 09/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import styles              from './CityItem.module.css';
import { Link } from 'react-router-dom';


const formatDate = (date) =>
		new Intl.DateTimeFormat("en", {
			day: "numeric",
			month: "long",
			year: "numeric",
			weekday: "long",
		}).format(new Date(date));

function CityItem({ city }) {
	const { cityName, country, emoji, date, notes, position: {lat, lng}, id } = city;
	
	return <li>
		<Link className={styles.cityItem} to={`${id}?lat=${lat}&lng=${lng}`}>
		<span className={styles.emoji}>{emoji}</span>
		<h3 className={styles.name}>{cityName}</h3>
		<time className={styles.date}>{formatDate(date)}</time>
		<button className={styles.deleteBtn}>&times;</button>
		</Link>
	</li>;
}

export default CityItem;
