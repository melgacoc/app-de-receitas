import React from 'react';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';

function Meals() {
  return (
    <div>
      <Header title="Meals" profile="true" search="true" />
      <SearchBar />
    </div>
  );
}

export default Meals;
