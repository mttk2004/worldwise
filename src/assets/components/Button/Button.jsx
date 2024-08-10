/**
 *  Project: worldwise
 *  File: Button.jsx
 *  Created: 9:31 SA, 10/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import styles from './Button.module.css';


function Button({ children, type, onClick }) {
	return <button onClick={onClick} className={`${styles.btn} ${type ? styles[type] : ''}`}>
		{children}
	</button>;
}

export default Button;
