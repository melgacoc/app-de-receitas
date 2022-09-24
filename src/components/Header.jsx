import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/header.css';

function Header({ title, profile, search }) {
  const history = useHistory();
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <header>
      <h1 data-testid="page-title">{title}</h1>
      <div>
        <button type="button" onClick={ () => history.push('./profile') }>
          { profile === 'true' && <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Profile Icon"
          />}
        </button>
        <button type="button" onClick={ () => setIsEnabled(!isEnabled) }>
          { search === 'true' && <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="Profile Icon"
          />}
        </button>
        { isEnabled && <input
          data-testid="search-input"
          type="text"
          placeholder="Search"
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
