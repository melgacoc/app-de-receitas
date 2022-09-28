export default async function FetchDrinkDetailAPI(id, setRecipe) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(URL);
  const data = await response.json();
  setRecipe(data.drinks[0]);
}
