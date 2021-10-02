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

	const hiddenInputIngredient = document.createElement('input')
	const hiddenInputQty = document.createElement('input')
	const pTag = document.createElement('p')

	pTag.innerText = `${ingredient} x${qty}`

	hiddenInputQty.setAttribute("value", qty)
	hiddenInputQty.setAttribute("type", "hidden")
	hiddenInputQty.setAttribute("name", "qtyList")

	hiddenInputIngredient.setAttribute("value", ingredient)
	hiddenInputIngredient.setAttribute("type", "hidden")
	hiddenInputIngredient.setAttribute("name", "ingredientList")

	ingredientSectionEl.append(hiddenInputIngredient)
	ingredientSectionEl.append(hiddenInputQty)
	ingredientSectionEl.append(pTag)

	document.querySelectorAll('datalist option').forEach((optionTag) => {
		if (optionTag.value === ingredientSelectorEl.value) {
			optionTag.remove()
		}
	})

})