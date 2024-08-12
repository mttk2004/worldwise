/**
 *  Project: worldwise
 *  File: useUrlPosition.js
 *  Created: 1:34 CH, 12/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */
import { useSearchParams } from 'react-router-dom';


function UseUrlPosition() {
	const [searchParams] = useSearchParams();
	const lat = searchParams.get('lat');
	const lng = searchParams.get('lng');
	
	return [lat, lng];
}

export default UseUrlPosition;
