// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import { useEffect, useState } from 'react';

import styles         from './Form.module.css';
import Button         from '../Button/Button.jsx';
import ButtonBack     from '../BackButton/ButtonBack.jsx';
import useUrlPosition from '../../hooks/useUrlPosition.js';
import Spinner        from '../Spinner/Spinner.jsx';
import Message        from '../Message/Message.jsx';
import DatePicker     from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useCities }  from '../../contexts/CitiesContext.jsx';
import { useNavigate } from 'react-router-dom';


const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

export function convertToEmoji(countryCode) {
	const codePoints = countryCode
			.toUpperCase()
			.split('')
			.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

function Form() {
	const [lat, lng] = useUrlPosition();
	const [cityName, setCityName] = useState('');
	const [country, setCountry] = useState('');
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState('');
	const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(false);
	const [emoji, setEmoji] = useState(null);
	const [geolocationError, setGeolocationError] = useState('');
	
	const { createCity, isLoading } = useCities();
	
	const navigate = useNavigate()
	
	useEffect(() => {
		if (!lat || !lng) return;
		
		const fetchLocationData = async function () {
			try {
				setGeolocationError('');
				setIsLoadingGeolocation(true);
				const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
				const data = await res.json();
				
				if (!data.countryName) throw new Error('Not found any city, please click somewhere else!');
				
				setCityName(data.city || data.locality || '');
				setCountry(data.countryName);
				setEmoji(convertToEmoji(data.countryCode));
			}
			catch (err) {
				console.error(err);
				setGeolocationError(err.message);
			}
			finally {
				setIsLoadingGeolocation(false);
			}
		};
		fetchLocationData();
	}, [lat, lng]);
	
	
	if (isLoadingGeolocation) return <Spinner />;
	if (!lat || !lng) return <Message message="Start by clicking on a city on the map!" />;
	if (geolocationError) return <Message message={geolocationError} />;
	
	async function handleSubmit(e) {
		e.preventDefault();
		
		if (!cityName || !date) return;
		
		const newCity = {
			cityName, country, date, notes, emoji, position: { lat, lng }
		};
		
		await createCity(newCity)
		
		navigate('/app/cities')
	}
	
	return (
			<form className={`${styles.form} ${isLoading && styles.loading}`} onSubmit={handleSubmit}>
				<div className={styles.row}>
					<label htmlFor="cityName">City name</label>
					<input
							id="cityName"
							onChange={(e) => setCityName(e.target.value)}
							value={cityName}
					/>
					<span className={styles.flag}>{emoji}</span>
				</div>
				
				<div className={styles.row}>
					<label htmlFor="date">When did you go to {cityName}?</label>
					<DatePicker onChange={date => setDate(date)} selected={date} />
				</div>
				
				<div className={styles.row}>
					<label htmlFor="notes">Notes about your trip to {cityName}</label>
					<textarea
							id="notes"
							onChange={(e) => setNotes(e.target.value)}
							value={notes}
					/>
				</div>
				
				<div className={styles.buttons}>
					<Button type="primary">Add</Button>
					<ButtonBack />
				</div>
			</form>
	);
}

export default Form;
