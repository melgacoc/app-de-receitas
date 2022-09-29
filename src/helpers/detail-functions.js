export default function createDone(recDetail, type) {
  if (type === 'meals') {
    const doneRec = {
      id: recDetail.idMeal,
      type,
      nationality: recDetail.strArea,
      category: recDetail.strCategory,
      name: recDetail.strMeal,
      alcoholicOrNot: '',
      tags: recDetail.strTags,
      doneDate: new Date(),
      image: recDetail.strMealThumb };
    if (localStorage.getItem('doneRecipes')) {
      const oldDones = JSON.parse(localStorage.getItem('doneRecipes'));
      oldDones.push(doneRec);
      localStorage.setItem('doneRecipes', JSON.stringify(oldDones));
    } else {
      const newDone = [doneRec];
      localStorage.setItem('doneRecipes', JSON.stringify(newDone));
    }
  }
  if (type === 'drinks') {
    const doneRec = {
      id: recDetail.idDrink,
      type,
      nationality: '',
      category: recDetail.strCategory,
      name: recDetail.strDrink,
      alcoholicOrNot: recDetail.strAlcoholic,
      tags: recDetail.strTags,
      doneDate: new Date(),
      image: recDetail.strDrinkThumb };
    if (localStorage.getItem('doneRecipes')) {
      const oldDones = JSON.parse(localStorage.getItem('doneRecipes'));
      oldDones.push(doneRec);
      localStorage.setItem('doneRecipes', JSON.stringify(oldDones));
    } else {
      const newDone = [doneRec];
      localStorage.setItem('doneRecipes', JSON.stringify(newDone));
    }
  }
}
