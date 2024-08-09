/**
 *  Project: worldwise
 *  File: Footer.jsx
 *  Created: 10:12 SA, 09/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import styles from './Footer.module.css';


function Footer() {
	return <footer className={styles.footer}>
		<p className={styles.copyright}>
			&copy; Copyright {new Date().getFullYear()} by WorldWise, Inc.
		</p>
	</footer>;
}

export default Footer;
