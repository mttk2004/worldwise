/**
 *  Project: worldwise
 *  File: App.jsx
 *  Created: 8:53 CH, 08/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage                         from '../pages/Homepage.jsx';
import Product                          from '../pages/Product.jsx'; // Corrected import
import Login                            from '../pages/Login.jsx';
import AppLayout                        from '../pages/AppLayout.jsx';
import PageNotFound                     from '../pages/PageNotFound.jsx';
import Pricing                          from '../pages/Pricing.jsx';
import CityList                         from './CityList.jsx';


function App() {
	return <div>
		<BrowserRouter>
			<Routes>
				<Route index element={<Homepage />} />
				<Route path="login" element={<Login />} />
				<Route path="pricing" element={<Pricing />} />
				<Route path="product" element={<Product />} /> {/* Corrected route */}
				<Route path="app" element={<AppLayout />}>
					<Route index element={<CityList/>}/>
					<Route path={'cities'} element={<CityList/>}/>
					<Route path={'countries'} element={<p>countries</p>}/>
				</Route>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	</div>;
}

export default App;
