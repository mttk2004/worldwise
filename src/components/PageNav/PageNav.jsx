import { NavLink } from "react-router-dom";
import Logo        from "../Logo/Logo.jsx";
import styles      from "./PageNav.module.css";
import { useAuth } from '../../contexts/FakeAuthContext.jsx';

function PageNav() {
  const { isAuthenticated, user } = useAuth();
  
  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            {isAuthenticated ? `Welcome, ${user.name}` : "Login"}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
