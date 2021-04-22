const baseURL = "http://localhost:3000/";
const gamesURL = baseURL + "games";
const usersURL = baseURL + "users";

const mountyPicture = document.getElementById("mounty-with-beaver");
const userSelectionContainer = document.getElementById('select-user-container')
const currentGameContainer = document.getElementById("current-game-container");
const resultsContainer = document.getElementById("results-container");
const resultsTable = resultsContainer.lastElementChild
const currentUserResultsContainer = document.getElementById("current-user-results-container");
const doorCards = currentGameContainer.getElementsByTagName('article');
const navbarUl = document.getElementById('navbar-ul')
const hostTalkBubble = document.getElementById('host-talk-bubble')
// GlobalVariable
var currentUser;
// Immediately get seed data on users:
UserApi.getUsers();
Game.hostPause(Game.welcomePlayer);
// The following is for testing
// const testGame = new Game(1);
// testGame.initializeRandomGame();
// testGame.toggleGameDisplay();
// testGame.makeDoorsClickable();

// const resultsTestGame = new Game(2);
// resultsTestGame.initializeRandomGame()
// resultsTestGame.originalPick = "door1"

// door1 = document.getElementById("door1");

// Test User Selection:
// User.toggleUserSelectionDisplay()
// User.addNewUserFormToDOM()