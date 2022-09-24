export default async function fetchApiFilter(ingredient, name, firstLetter) {
  if (!name && !firstLetter) {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const response = await request.json();
    console.log(response);
    return response;
  } if (!firstLetter) {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const response = await request.json();
    console.log(response);
    return response;
  }
  if (firstLetter.length === 1) {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
    const response = await request.json();
    console.log(response);
    return response;
  }
  return global.alert('Your search must have only 1 (one) character');
}
