import "./NavBar.css";
import Logo from "../../assets/CanRentLogo.png";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <div className="header">
                {/* logo and welcome message at the top of the landing page. */}
                <div>
                    <img style={{width: "100px"}} src={ Logo }></img>
                    <span className="welcome-message">Welcome to CanRent</span>
                </div>

                {/* this section contains buttons linked to the other pages. */}
                <ul className="tabs">
                    <li className="tabs-button">
                        <Link to="/" className="tabs-label">Home</Link>
                    </li>
                    <li className="tabs-button">
                        <Link to="/search" className="tabs-label">Browse</Link>
                    </li>
                    <li className="tabs-button">
                        <Link to="/property" className="tabs-label">Saved</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
export default NavBar;