/**
 *  Project: worldwise
 *  File: ProtectedRoute.jsx
 *  Created: 10:52 SA, 13/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import { useEffect }   from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth }     from '../contexts/FakeAuthContext.jsx';


function ProtectedRoute({ children }) {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();
	
	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/login');
		}
	}, [isAuthenticated]);
	
	return isAuthenticated ? children : null;
}

export default ProtectedRoute;
