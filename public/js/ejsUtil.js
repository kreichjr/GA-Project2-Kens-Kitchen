// Helper Functions for building the webpage

module.exports = {
	displayUserBarText: (currUser) => {
		let greeting = ["Hello", "Hi", "Howdy", "Greetings", "Salutations", "Bonjour", "Guten Tag", "Yo", "'Sup", "Whaddup"]
		let randomGreet = greeting[Math.floor(Math.random() * greeting.length)]
		if (currUser) {
			return `<p>${randomGreet}, ${currUser.username}! <a href="/users/signout">Sign out</a></p>`
		} else {
			let userBarText = `<p><a href="/users/register">Create an account</a> or <a href="/users/signin">Sign in</a><p>`
			return userBarText
		}
	},
	enableIfAdmin: (user) => {
		if (user && user.admin) {
			return ""
		}
		return "disabled"
	}
}

