import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/header.css';
import { changeSearchBarStatus } from '../redux/actions';

function Header({ title, profile, search }) {
  const history = useHistory();
  const searchBarStatus = useSelector(({ reducer }) => reducer.isSearchBarEnabled);
  const dispatch = useDispatch();
  return (
    <header>
      <h1 data-testid="page-title">{title}</h1>
      <div className="header-buttons">
        <button type="button" onClick={ () => history.push('./profile') }>
          { profile === 'true' && <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Profile Icon"
          />}
        </button>
        <button
          type="button"
          onClick={ () => dispatch(changeSearchBarStatus(!searchBarStatus)) }
        >
          { search === 'true' && <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="Profile Icon"
          />}
        </button>
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
