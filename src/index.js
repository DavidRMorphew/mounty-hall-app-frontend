const baseURL = "http://localhost:3000/";
const gamesURL = baseURL + "games";
const usersURL = baseURL + "users";

const mountyPicture = document.getElementById("mounty-with-beaver");
const currentGameContainer = document.getElementById("current-game-container");
const resultsContainer = document.getElementById("results-container");
const doorCards = currentGameContainer.getElementsByTagName('article');

// The following is for testing
const testGame = new Game(1);
testGame.initializeRandomGame();
testGame.toggleGameDisplay();
testGame.makeDoorsClickable();

door1 = document.getElementById("door1");