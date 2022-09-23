import React from 'react';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';

function Meals() {
  return (
    <div>
      <span>Meals</span>
      <SearchBar />
      <Header title="Meals" profile="true" search="true" />
    </div>
  );
}

export default Meals;
