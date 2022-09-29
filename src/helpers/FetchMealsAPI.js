export async function getMeals() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export async function getMealsCategory() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export async function getMealsByCategory(cat) {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export default async function FetchMealDetail(id) {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.meals[0];
}
