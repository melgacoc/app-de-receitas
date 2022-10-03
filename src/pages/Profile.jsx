import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/profile.css';
import doneRecipes from '../images/doneRecipes.svg';
import favoriteRecipes from '../images/favoriteRecipes.svg';
import logoutIcon from '../images/logoutIcon.svg';
import line from '../images/line.svg';

function Profile() {
  const [emailStoraged, setEmailStoraged] = useState('');
  useEffect(() => {
    const email = JSON.parse(localStorage.getItem('user')) || { email: 'Didnt signup' };
    setEmailStoraged(email.email);
  }, []);
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" profile="true" search="false" />
      <div className="email-container">
        <h4
          data-testid="profile-email"
        >
          { `Your email: ${emailStoraged}` }
        </h4>
      </div>
      <div className="profile-icons-container">
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          <img src={ doneRecipes } alt="Done Recipes Icon" />
        </button>
        <h3>Done Recipes</h3>
      </div>
      <div className="icons-line">
        <img src={ line } alt="line" />
      </div>
      <div className="profile-icons-container">
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          <img src={ favoriteRecipes } alt="Favorite Recipes Icon" />
        </button>
        <h3>Favorite Recipes</h3>
      </div>
      <div className="icons-line">
        <img src={ line } alt="line" />
      </div>
      <div className="profile-icons-container">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
        >
          <img src={ logoutIcon } alt="Logout icon" />
        </button>
        <h3>Logout</h3>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
