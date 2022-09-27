import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Recipes from '../components/Recipes';
import { fetchCategories, fetchRecipes } from '../redux/actions';

function Drinks() {
  const [load, setLoad] = useState(true);
  const searchBarStatus = useSelector(({ reducer }) => reducer.isSearchBarEnabled);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRecipes('drinks'));
    dispatch(fetchCategories('drinks'));
    setLoad(false);
  }, [dispatch]);
  const recipes = useSelector(({ reducer }) => reducer.recipes);
  const categories = useSelector(({ reducer }) => reducer.categories);
  return (
    <div>
      <Header title="Drinks" profile="true" search="true" />
      { searchBarStatus && <SearchBar /> }
      {(recipes && categories && !load) && <Recipes type="drinks" />}
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  recipes: state.reducer.recipes,
  categories: state.reducer.categories,
});

Drinks.defaultProps = {
  recipes: [],
  categories: [],
};

export default connect(mapStateToProps, null)(Drinks);
