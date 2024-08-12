/**
 *  Project: worldwise
 *  File: Map.jsx
 *  Created: 8:55 SA, 10/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */


import styles                                                           from './Map.module.css';
import { useNavigate }                                                  from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import {
	useCities
}                                                                       from '../../contexts/CitiesContext.jsx';
import { useEffect, useState }                                          from 'react';
import {
	useGeolocation
}                                                                       from '../../hooks/useGeolocation.js';
import Button                                                           from '../Button/Button.jsx';
import useUrlPosition
																																				from '../../hooks/useUrlPosition.js';


function Map() {
	const { cities } = useCities();
	const [position, setPosition] = useState([0, 0]);
	const {
					isLoading: isLoadingPosition,
					getPosition,
					position: geolocationPosition
				} = useGeolocation();
	
	const [lat, lng] = useUrlPosition();
	
	useEffect(() => {
		if (lat && lng) setPosition([lat, lng]);
	}, [lat, lng]);
	
	useEffect(() => {
		if (geolocationPosition) setPosition([geolocationPosition.lat, geolocationPosition.lng]);
	}, [geolocationPosition]);
	
	return <div className={styles.mapContainer}>
		{!geolocationPosition && <Button type="position" onClick={getPosition}>
			{isLoadingPosition ? 'Loading...' : 'Use your location'}
		</Button>}
		
		<MapContainer className={styles.map} center={position} zoom={8} scrollWheelZoom={true}>
			<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
			/>
			
			{
				cities.map(city => {
					const { cityName, position: { lat, lng }, id } = city;
					const pos = [lat, lng];
					return <Marker position={pos} key={id}>
						<Popup>
							{cityName}
						</Popup>
					</Marker>;
				})
			}
			
			<ChangePosition position={position} />
			<ClickDetecter />
		</MapContainer>
	</div>;
}

function ChangePosition({ position }) {
	const map = useMap();
	map.setView(position);
	return null;
}

function ClickDetecter() {
	const navigate = useNavigate();
	
	useMapEvents({
								 click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
							 });
	
	return null;
}

export default Map;
