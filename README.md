# GA-Project2-Kens-Kitchen
General Assembly Project 2 - Ken's Kitchen

## Project Choice (Tell us which project you're doing!)
Ken's Kitchen

## Project Link
http://kenskitchen.herokuapp.com/ingredients

## Project Description

Ken's Kitchen will be a fully RESTful app that will allow for tracking of the ingredients I have in my kitchen. The model will include:

Name: String - Name of the ingredient
Qty: Number - Amount of the ingredient
Img: String - Picture of ingredient if applicable 



Index: GET /ingredients - Displays list of ingredients and their qty
Show: GET /ingredients/:id - Displays info of a specific ingredient
New: GET /ingredients/new - Displays new ingredient form
Create: POST /ingredients - Makes the new ingredient, adds to db, and redirects to index
Edit: GET /ingredients/:id/edit - Displays the edit ingredient form
Update: PUT /ingredients/:id - Updates the ingredient in the db and redirects to ingredient show page
Delete: DELETE /ingredients/:id - Removes an ingredient from the DB and redirects to the index

## Technologies Used:
Node.js, Express, Javascript, CSS, HTML, MongoDB

## Wireframes

![Screen Shot 2021-09-21 at 6 34 55 PM](https://media.git.generalassemb.ly/user/36937/files/ca578900-1b0a-11ec-85bd-42c32602d6e8)



## User Stories

As a user, I want to see the full list of ingredients on the index page.
As a user, I want to be able to edit the quantity of an ingredient.
As a user, I want to be able to create and delete ingredients.
As a user, I want to see an image of the ingredient on the show page if available.


### MVP Goals
Be able to add and remove ingredients.
Be able to edit and view ingredients.
Have decent styling
Use Partials
Use static files

### Stretch Goals
Add recipes model
Add users model
Add login/authentication and cookies/session
Add a "Give me a random recipe that I have the ingredients for" button


### Things to come back to
- Add more functionality to recipes (
	* Allow for filtering for kitchen-ready recipes
	* Add color coding styling on quantities
)
- Add some QoL updates to allow for redirect back to prev page when sign in is required


