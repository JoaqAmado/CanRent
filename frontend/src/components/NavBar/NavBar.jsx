import { Link, useLocation } from "react-router-dom";
import { useSaved } from "../../context/SavedContext.jsx";
import Logo from "../../assets/CanRentLogo.png";
import "./NavBar.css";

function NavBar() {
    const { savedProperties } = useSaved();
    const location = useLocation();

    return (
        <nav className="navbar glass">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <img src={Logo} alt="CanRent Logo" className="logo-img" />
                    <span className="logo-text">CanRent</span>
                </Link>

                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link 
                            to="/" 
                            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                        >
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                            to="/search" 
                            className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`}
                        >
                            Search
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                            to="/saved" 
                            className={`nav-link saved-link ${location.pathname === '/saved' ? 'active' : ''}`}
                        >
                            Saved
                            {savedProperties.length > 0 && (
                                <span className="saved-badge">{savedProperties.length}</span>
                            )}
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;