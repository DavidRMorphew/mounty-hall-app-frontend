const hostPromptFormDiv = document.getElementById('host-prompt-form-div');
const mountyPictureDiv = document.getElementById("mounty-picture-div");
const hostTalkContainer = document.getElementById('host-talk-container');
const hostTalkBubble = document.getElementById('host-talk-bubble');

const navbarUl = document.getElementById('navbar-ul');
const userSelectionContainer = document.getElementById('select-user-container');

const currentGameContainer = document.getElementById("current-game-container");
const doorCards = currentGameContainer.getElementsByTagName('article');

const currentUserResultsContainer = document.getElementById("current-user-results-container");
const currentUserResultsHeader = document.getElementById('current-user-results-header');
const currentUserStatsTable = document.getElementById('current-user-stats-table');
const currentUserGamesTable = document.getElementById('current-user-games-table');

const allResultsContainer = document.getElementById("all-results-container");
const allUserResultsHeader = document.getElementById('all-user-results-header');
const allUserStatsTable = document.getElementById('all-user-stats-table');
const allResultsTable = document.getElementById("all-game-results-table");

let currentUser;

setTimeout(Game.welcomePlayer, 500);