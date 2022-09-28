export default async function FetchMealDetailAPI(id) {
  console.log(id);
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}
