/**
 *  Project: worldwise
 *  File: AppLayout.jsx
 *  Created: 8:58 CH, 08/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import styles from './AppLayout.module.css';
import Sidebar from '../components/Sidebar.jsx';
import Map from './Map.jsx';


function AppLayout() {
	return <div className={styles.app}>
		<Sidebar/>
		<Map/>
	</div>;
}

export default AppLayout;
