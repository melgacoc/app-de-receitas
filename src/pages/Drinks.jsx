import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Recipes from '../components/Recipes';
import { fetchCategories, fetchRecipes } from '../redux/actions';

function Drinks({ recipes, categories }) {
  const searchBarStatus = useSelector(({ reducer }) => reducer.isSearchBarEnabled);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRecipes('drinks'));
    dispatch(fetchCategories('drinks'));
  }, [dispatch]);
  return (
    <div>
      <Header title="Drinks" profile="true" search="true" />
      { searchBarStatus && <SearchBar /> }
      {(recipes && categories) && <Recipes type="drinks" />}
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  recipes: state.reducer.recipes,
  categories: state.reducer.categories,
});

Drinks.propTypes = {
  recipes: PropTypes.instanceOf(Object).isRequired,
  categories: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, null)(Drinks);
