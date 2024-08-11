/**
 *  Project: worldwise
 *  File: ButtonBack.jsx
 *  Created: 9:14 SA, 11/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import Button          from '../Button/Button.jsx';
import { useNavigate } from 'react-router-dom';


function ButtonBack() {
	const navigate = useNavigate();
	
	return <Button
			type="back" onClick={e => {
		e.preventDefault();
		navigate(-1);
	}}>&larr; Back</Button>;
}

export default ButtonBack;
