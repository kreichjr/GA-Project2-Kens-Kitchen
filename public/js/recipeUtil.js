const addBtn = document.querySelector('#add-ingredient-btn')
const ingredientSelectorEl = document.querySelector('#ingredient-selector')
const qtyEl = document.querySelector('#qty')
const ingredientSectionEl = document.querySelector('#current-ingredients')

const ingredientArray = []

addBtn.addEventListener('click', (event) => {
	if (
		!ingredientSelectorEl.value || 
		!qtyEl.value || 
		qtyEl.value < 1 || 
		ingredientArray.includes(ingredientSelectorEl.value)) {
			return console.log("Invalid")
	}

	ingredientArray.push(ingredientSelectorEl.value)
	
	let ingredient = ingredientSelectorEl.value
	let qty = qtyEl.value

	const pTag = document.createElement('p')
	const hiddenIngredient = document.createElement('input')

	pTag.innerText = `${ingredient} x${qty}`

	const newIngredient = {
		ingredient,
		qty
	}

	hiddenIngredient.setAttribute('type', 'hidden')
	hiddenIngredient.setAttribute('name', 'ingredients')
	hiddenIngredient.value = JSON.stringify(newIngredient)

	ingredientSectionEl.append(hiddenIngredient)
	ingredientSectionEl.append(pTag)



	document.querySelectorAll('datalist option').forEach((optionTag) => {
		if (optionTag.value === ingredientSelectorEl.value) {
			optionTag.remove()
		}
	})

	ingredientSelectorEl.value = ""
	qtyEl.value = ""

})