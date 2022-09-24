import React from 'react';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function Meals() {
  const searchBarStatus = useSelector(({ reducer }) => reducer.isSearchBarEnabled);
  return (
    <div>
      <Header title="Meals" profile="true" search="true" />
      { searchBarStatus && <SearchBar /> }
      <Footer />
    </div>
  );
}

export default Meals;
