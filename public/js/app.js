// Helper Functions for building the webpage

module.exports = {
	displayUserBarText: (currUser) => {
		let greeting = ["Hello", "Hi", "Howdy", "Greetings", "Salutations", "Bonjour", "Guten Tag", "Yo", "'Sup", "Whaddup"]
		let randomGreet = greeting[Math.floor(Math.random() * greeting.length)]
		if (currUser) {
			return `<p>${randomGreet}, ${currUser.username}! <a href="/users/logout">Log out</a></p>`
		} else {
			let userBarText = `<p><a href="/users/register">Create an account</a> or <a href="/users/login">Log in</a><p>`
			return userBarText
		}
	}
}

