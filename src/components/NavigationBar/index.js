import './index.css'

import {Link} from 'react-router-dom'

// eslint-disable-next-line import/no-extraneous-dependencies
import {FaSearch} from 'react-icons/fa'

const Navbar = () => (
  <nav className="navbar">
    <ul className="navbar-list-container">
      <li className="navbar-list-item">
        <Link to="/" className="navbar-list-item">
          Home
        </Link>
      </li>
      <li>
        <Link to="search" className="navbar-list-item">
          <p>Search</p>
          <FaSearch className="search-icon" />
        </Link>
      </li>
    </ul>
  </nav>
)

export default Navbar
