/**
 *  Project: worldwise
 *  File: Map.jsx
 *  Created: 8:55 SA, 10/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */


import styles                           from './Map.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';


function Map() {
	const [searchParams, setSearchParams] = useSearchParams()
	const lat = searchParams.get('lat')
	const lng = searchParams.get('lng')
	
	const navigator = useNavigate()
	
	return <div className={styles.mapContainer} onClick={() => navigator('form')}>
		<h1>{lat}/{lng}</h1>
		<button onClick={() => setSearchParams({lat: 3, lng: 4})}>change position</button>
	</div>;
}

export default Map;
