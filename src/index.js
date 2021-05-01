const baseURL = "http://localhost:3000/";
const gamesURL = baseURL + "games";
const usersURL = baseURL + "users";

const hostPromptFormDiv = document.getElementById('host-prompt-form-div')
const mountyPicture = document.getElementById("mounty-with-beaver");
const mountyPictureDiv = document.getElementById("mounty-picture-div");
const userSelectionContainer = document.getElementById('select-user-container');
const currentGameContainer = document.getElementById("current-game-container");
const allResultsContainer = document.getElementById("all-results-container");
const allResultsTable = document.getElementById("all-game-results-table");
const currentUserResultsContainer = document.getElementById("current-user-results-container");
const doorCards = currentGameContainer.getElementsByTagName('article');
const navbarUl = document.getElementById('navbar-ul');
const hostTalkContainer = document.getElementById('host-talk-container');
const hostTalkBubble = document.getElementById('host-talk-bubble');
const currentUserStatsTable = document.getElementById('current-user-stats-table');
const currentUserGamesTable = document.getElementById('current-user-games-table');
const allUserStatsTable = document.getElementById('all-user-stats-table');
const currentUserResultsHeader = document.getElementById('current-user-results-header');
const allUserResultsHeader = document.getElementById('all-user-results-header')

let currentUser;

setTimeout(Game.welcomePlayer, 500);
