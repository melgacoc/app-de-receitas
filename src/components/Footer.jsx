import React from 'react';
import '../styles/footer.css';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer">
      <button type="button" onClick={ () => history.push('./drinks') }>
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="Drink Page"
        />
      </button>
      <button type="button" onClick={ () => history.push('./meals') }>
        <img
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="Meal Page"
        />
      </button>
    </footer>
  );
}

export default Footer;
