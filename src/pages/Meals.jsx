import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Meals() {
  return (
    <div>
      <Header title="Meals" profile="true" search="true" />
      <Footer />
    </div>
  );
}

export default Meals;
