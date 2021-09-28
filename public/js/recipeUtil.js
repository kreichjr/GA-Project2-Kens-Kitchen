const addBtn = document.querySelector('#add-ingredient-btn')
const ingredientSelector = document.querySelector('#ingredient-selector-input')

addBtn.addEventListener('click', (event) => {
	console.log(ingredientSelector.value)
})