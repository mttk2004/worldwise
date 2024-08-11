/**
 *  Project: worldwise
 *  File: useGeolocation.js
 *  Created: 10:55 SA, 11/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import { useState } from 'react';


function useGeolocation(defaultLocation = null) {
	const [isLoading, setIsLoading] = useState(false);
	const [position, setPosition] = useState(defaultLocation);
	const [error, setError] = useState(null);
	
	function getPosition() {
		if (!navigator.geolocation)
			return setError('Your browser does not support geolocation');
		
		setIsLoading(true);
		navigator.geolocation.getCurrentPosition(
				(pos) => {
					setPosition({
												lat: pos.coords.latitude,
												lng: pos.coords.longitude
											});
					setIsLoading(false);
				},
				(error) => {
					setError(error.message);
					setIsLoading(false);
				}
		);
	}
	
	return { isLoading, position, error, getPosition };
}

export { useGeolocation };
