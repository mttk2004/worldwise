/**
 *  Project: worldwise
 *  File: Sidebar.jsx
 *  Created: 10:07 SA, 09/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import styles from './Sidebar.module.css'
import Logo   from './Logo.jsx';
import AppNav from './AppNav.jsx';
import Footer from './Footer.jsx';
import { Outlet } from 'react-router-dom';

function Sidebar() {
	return <div className={styles.sidebar}>
		<Logo/>
		<AppNav/>
		
		<p>sidebar</p>
		<Outlet/>
		
		<Footer/>
	</div>;
}

export default Sidebar;
