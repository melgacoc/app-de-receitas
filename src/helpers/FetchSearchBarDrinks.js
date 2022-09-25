const HAVENT_FOUND_RECIPES = 'Sorry, we haven\'t found any recipes for these filters.';

export default async function fetchApiDrinksFilter({ ingredient, name, firstLetter }) {
  const url = () => {
    if (ingredient) return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    if (name) return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
    return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  };

  if (firstLetter && firstLetter.length > 1) {
    return global.alert('Your search must have only 1 (one) character');
  }

  try {
    const request = await fetch(url());
    const response = await request.json();
    if (!response.drinks) {
      return global.alert(HAVENT_FOUND_RECIPES);
    }
    return response;
  } catch (error) {
    return global.alert(HAVENT_FOUND_RECIPES);
  }
}
