import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Recipes from '../components/Recipes';
import { fetchCategories, fetchRecipes } from '../redux/actions';

function Meals() {
  const [load, setLoad] = useState(true);
  const searchBarStatus = useSelector(({ reducer }) => reducer.isSearchBarEnabled);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRecipes('meals'));
    dispatch(fetchCategories('meals'));
    setLoad(false);
  }, [dispatch]);
  const recipes = useSelector(({ reducer }) => reducer.recipes);
  const categories = useSelector(({ reducer }) => reducer.categories);
  return (
    <div>
      <Header title="Meals" profile="true" search="true" />
      { searchBarStatus && <SearchBar /> }
      {(recipes && categories && !load) && <Recipes type="meals" />}
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  recipes: state.reducer.recipes,
  categories: state.reducer.categories,
});

Meals.defaultProps = {
  recipes: [],
  categories: [],
};

export default connect(mapStateToProps, null)(Meals);
