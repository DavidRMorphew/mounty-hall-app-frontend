const baseURL = "http://localhost:3000/";
const gamesURL = baseURL + "games";
const usersURL = baseURL + "users";

const mountyPicture = document.getElementById("mounty-with-beaver");
const userSelectionContainer = document.getElementById('select-user-container');
const currentGameContainer = document.getElementById("current-game-container");
const allResultsContainer = document.getElementById("results-container");
const allResultsTable = allResultsContainer.lastElementChild;
const currentUserResultsContainer = document.getElementById("current-user-results-container");
const doorCards = currentGameContainer.getElementsByTagName('article');
const navbarUl = document.getElementById('navbar-ul');
const hostTalkBubble = document.getElementById('host-talk-bubble');
const currentUserStatsTable = document.getElementById('current-user-stats-table');
const currentUserGamesTable = document.getElementById('current-user-games-table');
const allUserStatsTable = document.getElementById('all-user-stats-table')
const currentUserResultsHeader = document.getElementById('current-user-results-header')
// GlobalVariable
// CHANGE TO 'let'
let currentUser;
// Immediately get seed data on users:

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