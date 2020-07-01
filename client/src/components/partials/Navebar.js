import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LOGOUT } from '../../redux/types';
import './Navebar.scss';

const Navbar = ({ title, icon }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch({ type: LOGOUT });
  };

  const authLinks = (
    <>
      <li>
        <Link to="/products">Products</Link>
      </li>
      <li>
        <a onClick={onLogout}>
          <i className="fas fa-sign-out-alt">
            <span className="hide-sm">Logout</span>
          </i>
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-primary">
      <h2 className="logo">
        <Link to="/">
          <i className={icon} /> {title}
        </Link>
      </h2>
      <ul className="menu-list">
        {auth.isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Code Testing',
  icon: 'fas fa-lightbulb',
};

export default Navbar;
