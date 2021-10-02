const addBtn = document.querySelector('#add-ingredient-btn')
const ingredientSelector = document.querySelector('#ingredient-selector-0')


addBtn.addEventListener('click', (event) => {
	if (!ingredientSelector?.value) return
	
	console.log(ingredientSelector.value)
	let newOption = document.createElement('option')
	newOption.value = ingredientSelector.value
	newOption.innerText = ingredientSelector.value
	ingredientSelectorDisplay.append(newOption)

})