import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/header.css';
import { changeSearchBarStatus } from '../redux/actions';
import logoHeader from '../images/logoHeader.svg';
import logoTitleHeader from '../images/logoTitleHeader.svg';
import data from '../helpers/headerIcons';

function Header({ title, profile, search }) {
  const history = useHistory();
  const searchBarStatus = useSelector(({ reducer }) => reducer.isSearchBarEnabled);
  const [icon, setIcon] = useState('');
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const pathName = pathname.split('/')[1];
  console.log(data[pathName]);

  useEffect(() => {
    if (pathName) {
      setIcon(data[pathName]);
    }
    if (pathName === 'done-recipes') {
      setIcon(data.done);
    }
    if (pathName === 'favorite-recipes') {
      setIcon(data.favorite);
    }
  }, [pathName]);

  return (
    <div>
      <header>
        <div className="header-logo">
          <img src={ logoHeader } alt="recipes header logo" />
          <img src={ logoTitleHeader } alt="recipes header title" />
        </div>
        <div className="header-buttons">
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
          <button type="button" onClick={ () => history.push('./profile') }>
            { profile === 'true' && <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="Profile Icon"
            />}
          </button>
        </div>
      </header>
      { title && (
        <div className="page-icon-title">
          <h3 data-testid="page-title">{title}</h3>
          <img src={ icon } alt="page title and icon" />
        </div>
      )}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  profile: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
};
export default Header;
