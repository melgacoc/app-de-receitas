import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/header.css';

function Header({ title, profile, search }) {
  return (
    <header>
      <h1 data-testid="page-title">{title}</h1>
      <div>
        { profile === 'true' && <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile Icon"
          href="/profile"
        />}
        { search === 'true' && <img
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="Profile Icon"
        />}
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  profile: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
};
export default Header;
