/**
 *  Project: worldwise
 *  File: FakeAuthContext.jsx
 *  Created: 9:53 SA, 13/08/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import { createContext, useContext, useReducer } from 'react';


const FAKE_USER = {
	name    : 'Jack',
	email   : 'jack@example.com',
	password: 'qwerty',
	avatar  : 'https://i.pravatar.cc/100?u=zz',
};

const AuthContext = createContext(undefined);
const initialState = {
	user           : null,
	isAuthenticated: false,
};

const reducer = function (state, action) {
	switch (action.type) {
	case 'login':
		return { ...state, user: action.payload, isAuthenticated: true };
	case 'logout':
		return { ...state, user: null, isAuthenticated: false };
	default:
		throw new Error('Unknown action');
	}
};

function AuthProvider({ children }) {
	const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);
	
	function login(email, password) {
		if (email === FAKE_USER.email && password === FAKE_USER.password) {
			dispatch({ type: 'login', payload: FAKE_USER });
		} else {
			alert('Invalid email or password');
		}
	}
	
	function logout() {
		dispatch({ type: 'logout' });
	}
	
	return <AuthContext.Provider
			value={{
				user,
				isAuthenticated,
				login,
				logout,
			}}>{children}</AuthContext.Provider>;
}

function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}

export { AuthProvider, useAuth };
