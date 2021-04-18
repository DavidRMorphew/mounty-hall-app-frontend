const baseURL = "http://localhost:3000/"
const gamesURL = baseURL + "games"
const usersURL = baseURL + "users"
const currentGameContainer = document.getElementById("current-game-container")

// The following is for testing
const testGame = new Game(1)
testGame.initializeRandomGame()
testGame.renderGameDisplay()

door1 = document.getElementById("door1")