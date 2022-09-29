export async function getDrinks() {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export async function getDrinksCategory() {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export async function getDrinksByCategory(cat) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${cat}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export default async function FetchDrinkDetail(id) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.drinks[0];
}
