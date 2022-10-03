import React from 'react';
import '../styles/footer.css';
import { useHistory } from 'react-router-dom';
import drinks from '../images/drinks.svg';
import meals from '../images/meals.svg';

function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer" className="footer-container">
      <button type="button" onClick={ () => history.push('./drinks') }>
        <img
          data-testid="drinks-bottom-btn"
          src={ drinks }
          alt="Drink Page"
        />
      </button>
      <button type="button" onClick={ () => history.push('./meals') }>
        <img
          data-testid="meals-bottom-btn"
          src={ meals }
          alt="Meal Page"
        />
      </button>
    </footer>
  );
}

export default Footer;
