import styles                  from './Login.module.css';
import { useEffect, useState } from 'react';
import PageNav                 from '../../components/PageNav/PageNav.jsx';
import { useAuth }             from '../../contexts/FakeAuthContext.jsx';
import { useNavigate }         from 'react-router-dom';
import Button                  from '../../components/Button/Button.jsx';


export default function Login() {
	const { login, isAuthenticated } = useAuth();
	
	// PRE-FILL FOR DEV PURPOSES
	const [email, setEmail] = useState('jack@example.com');
	const [password, setPassword] = useState('qwerty');
	
	const navigate = useNavigate();
	useEffect(() => {
		if (isAuthenticated) navigate('/app', { replace: true });
	}, [isAuthenticated]);
	
	const handleSubmit = function (e) {
		e.preventDefault();
		login(email, password);
	};
	
	return (
			<main className={styles.login}>
				<PageNav />
				
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.row}>
						<label htmlFor="email">Email address</label>
						<input
								type="email"
								id="email"
								onChange={(e) => setEmail(e.target.value)}
								value={email}
						/>
					</div>
					
					<div className={styles.row}>
						<label htmlFor="password">Password</label>
						<input
								type="password"
								id="password"
								onChange={(e) => setPassword(e.target.value)}
								value={password}
						/>
					</div>
					
					<div>
						<Button type="primary">Login</Button>
					</div>
				</form>
			</main>
	);
}
