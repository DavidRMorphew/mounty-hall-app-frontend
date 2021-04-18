const baseURL = "http://localhost:3000/"
const gamesURL = baseURL + "games"
const usersURL = baseURL + "users"

const mountyPicture = document.getElementById("mounty-with-beaver")
const currentGameContainer = document.getElementById("current-game-container")
const doorCards = currentGameContainer.getElementsByTagName('article')

// The following is for testing
const testGame = new Game(1)
testGame.initializeRandomGame()
testGame.renderGameDisplay()

door1 = document.getElementById("door1")