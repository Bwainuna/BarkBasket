import { useState } from 'react';
import './navbar.css';
import {Link} from "react-router-dom";
import Auth from "../utils/auth";

const AppNavbar = () => {
  // const [showDropdown, setShowDropdown] = useState(false);

  // const handleMouseEnter = () => {
  //   setShowDropdown(true);
  // };

  // const handleMouseLeave = () => {
  //   setShowDropdown(false);
  // };

  // logs the current user out
  const logout = (event) =>{
    event.preventDefault();
    Auth.logout();
  }

  return (
    <header className="nav">
      <Link to="/"><h1>Bark Basket</h1></Link>
      <nav>
        <ul>
          {/* Below is the code used for drop down menu. May use in the future */}
          {/* <li
            className="dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <a href="/">Shop</a>

            {showDropdown && (
              <ul className="dropdown-menu">
                <li><Link to="/cart">Cart</Link></li>
              </ul>
            )}
          </li> */}
          <li><Link to="">Shop</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/contact-us">Contact</Link></li>
          {Auth.loggedIn() ? (
            <li className="user-info">
            <span className="username">Hello, {Auth.getProfile().data.username}</span>
            <button onClick={logout}>Logout</button>
          </li>
        ) : (
        
            <>
            <li><Link to="/login">Login</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default AppNavbar;
