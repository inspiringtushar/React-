import React from 'react';
import { Link, NavLink } from 'react-router-dom';



export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
      <div className="container">
        <Link to="" className="navbar-brand">
          <h4>
            TODOER
          </h4>
        </Link>

        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">

            <Link exact to="/login" className="nav-link">
              <h4>
                Login
              </h4>
            </Link>
            <h4>
              <a href="/login" className="nav-link">
                Sign Out
          </a>
            </h4>

          </li>

        </ul>
      </div>
    </nav>
  )
}