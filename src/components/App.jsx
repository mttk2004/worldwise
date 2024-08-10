/**
 *  Project: worldwise
 *  File: App.jsx
 *  Created: 8:53 CH, 08/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Homepage                                   from '../pages/Homepage/Homepage.jsx';
import Product                                    from '../pages/Product/Product.jsx'; // Corrected
																																											 // import
import Login                                      from '../pages/Login/Login.jsx';
import AppLayout                                  from '../pages/AppLayout/AppLayout.jsx';
import PageNotFound                               from '../pages/PageNotFound.jsx';
import Pricing                                    from '../pages/Pricing.jsx';
import CitiesList                                 from './CitiesList/CitiesList.jsx';
import CountriesList                              from './CountriesList/CountriesList.jsx';
import City                                       from './City/City.jsx';
import Form                                       from './Form/Form.jsx';
import { CitiesProvider }                         from '../contexts/CitiesContext.jsx';


function App() {
	return <div>
		<CitiesProvider>
			<BrowserRouter>
				<Routes>
					<Route index element={<Homepage />} />
					<Route path="login" element={<Login />} />
					<Route path="pricing" element={<Pricing />} />
					<Route path="product" element={<Product />} />
					<Route path="app" element={<AppLayout />}>
						<Route index element={<Navigate to={'cities'} replace />} />
						<Route path={'form'} element={<Form />} />
						<Route path={'cities'} element={<CitiesList />} />
						<Route path={'cities/:id'} element={<City />} />
						<Route
								path={'countries'}
								element={<CountriesList />} />
					</Route>
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</CitiesProvider>
	</div>;
}

export default App;
