/**
 *  Project: worldwise
 *  File: AppLayout.jsx
 *  Created: 8:58 CH, 08/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import styles  from './AppLayout.module.css';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import Map     from '../../components/Map/Map.jsx';
import User    from '../../components/User/User.jsx';


function AppLayout() {
	return <div className={styles.app}>
		<Sidebar />
		<Map />
		<User />
	</div>;
}

export default AppLayout;
