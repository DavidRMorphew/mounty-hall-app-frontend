class Game {
    
    static all = [];

    constructor({user_id, user_name, door1, door2, door3, original_pick, host_reveal, user_switch, user_win, id}){
        this.userId = user_id;
        this.userName = user_name;
        this.door1 = door1;
        this.door2 = door2;
        this.door3 = door3;
        this.originalPick = original_pick;
        this.hostReveal = host_reveal;
        this.userSwitch = user_switch;
        this.userWin = user_win;
        this.id = id;
        this.doorClickCount = 0;
        this.hostPromptsComplete = false;

        Game.findGameOrAddToAll(this);
    }
    
    static findGameOrAddToAll(game){
        if (!(this.all.some(element => element.id === game.id))){
            Game.all.push(game);
        }
    }

    static rodentiaAndCarNamesAndImageUrlsObj = {
        beaver: "https://i.imgur.com/tjvqilD.jpg", 
        marmot: "https://i.imgur.com/Oqy9GG1.jpg", 
        woodchuck: "https://i.imgur.com/zRgVoAg.jpeg", 
        car: "https://upload.wikimedia.org/wikipedia/commons/2/26/Volvo_122S_Canadian.jpg"
    }

    static welcomePlayer = () => {
        this.makeGameResultsContainersCollapsible();
        this.toggleHostBubbleDisplay();
        hostTalkBubble.innerText = "Welcome to the Mounty Hall Game! I'm your host, Mr. Hall. Play the game, eh?";
        setTimeout(this.addPlayButton, 500);
    }

    static makeGameResultsContainersCollapsible = () => {
        const elems = document.querySelectorAll('.collapsible');
        const instances = M.Collapsible.init(elems, {accordion: true});
    }

    static addPlayButton = () => {
        const playButton = document.createElement('button');
        playButton.id = "play-button";
        playButton.classList.add("btn-large", "right-align", "light-blue", "darken-4");
        playButton.innerText = "Play the Game";
        playButton.addEventListener('click', this.handleClickEvent);
        hostTalkBubble.insertAdjacentElement('afterend', playButton);
    }

    static handleClickEvent = (event) => {
        if (event.target.id === "play-button"){
            const playButton = event.target;
            playButton.remove();
            this.toggleHostBubbleDisplay();
            this.startLoginAndNewGame();
        } else if (event.target.id === "current-user-results-button"){
            const currentUserResultsButton = event.target;
            currentUserResultsButton.remove();
            this.toggleGameDisplayOffOnly();
            currentUserResultsHeader.innerText = `Game Results for Current User: "${currentUser.name}"`;
            this.toggleCurrentUserResultsDisplay();
            this.addCurrentUserGamesAndStatsToDom();
        } else if (event.target.id === "all-results-button"){
            const allResultsButton = event.target;
            allResultsButton.remove();
            this.toggleGameDisplayOffOnly();
            this.toggleAllResultsContainer();
            this.addAllUserGamesAndStatsToDom();
        } else if (event.target.id === "play-again-button"){
            Game.resetGame();
            Game.initializeNewGame();
        }
    }

    static startLoginAndNewGame(){
        setTimeout(() => {
            this.toggleHostBubbleDisplay();
            hostTalkBubble.innerText = "Type a username below to find a user on file or create a new username.";
        }, 500);
        setTimeout(() => {
            User.toggleUserSelectionDisplay();
            User.addNewUserFormToDOM();
        }, 1000);       
    }

    static toggleHostBubbleDisplay(){
        hostTalkBubble.style.display = (hostTalkBubble.style.display === "none")? "" : "none";
    }

    static initializeNewGame = () => {
        this.shrinkHostImageAndBubbleFont();
        const currentGame = new Game({user_id: currentUser.id, user_name: currentUser.name});
        currentGame.randomizeGame();
        currentGame.makeDoorsClickable();
        setTimeout(currentGame.hostInstructionsToGame, 500);
        setTimeout(this.toggleGameDisplay, 1000);
    }
    
    hostInstructionsToGame() {
        hostTalkBubble.innerText = "Behind two doors below are Canadian woodland creatures; behind one is a car. If you pick the car, YOU WIN IT! Pick any door by clicking on it. Don't worry, eh! I'll give you the choice to switch doors later!";
        Game.toggleHostBubbleDisplay();
    }

    randomizeGame() {
        const randomizerArray = ["rodentia","rodentia","rodentia"];
        const rodentiaArray = ["beaver", "woodchuck", "marmot"];
        const randomIndex = () => Game.randomIntegerZeroToNum(2);

        randomizerArray[randomIndex()] = "car";
        for (let i = 0; i < randomizerArray.length; i++){
            if (randomizerArray[i] === "rodentia"){
                randomizerArray[i] = rodentiaArray[randomIndex()];
            }
        }
        const [door1, door2, door3] = randomizerArray;
        return Object.assign(this, {door1, door2, door3});
    }

    static randomIntegerZeroToNum = (num) => Math.floor(Math.random() * (num + 1));

    makeDoorsClickable(){
        for (const doorElement of doorCards){
            doorElement.addEventListener('click', () => this.handleDoorClicks(doorElement));
        }
    }

    handleDoorClicks(doorElement){
        this.doorClickCount++;
        if (this.doorClickCount === 1) {
            this.hostResponseToFirstPick(doorElement);
            doorElement.classList.add("red-text");
        } else if (this.doorClickCount > 1 && doorElement.id !== this.hostReveal && this.hostPromptsComplete) {
            this.finalPick(doorElement.id);
        }
    }
    
    hostResponseToFirstPick(doorElement){
        this.originalPick = doorElement.id;
        this.hostChoice();
        hostTalkBubble.innerHTML = `You have picked ${this.originalPick.toUpperCase()} (highlighted in red).`;
        const hostResponseFollowUp = () => hostTalkBubble.innerHTML += `<br> Now...to reveal one of the Canadian woodland creatures behind another door.`;
        const hostPromptToStayOrSwitch = () => hostTalkBubble.innerHTML = `Now, would you like to stay with ${this.originalPick.toUpperCase()} (in red) or switch to ${this.switchDoor().toUpperCase()}?<br>Click on the door you choose.`;
        
        setTimeout(hostResponseFollowUp, 1000);
        setTimeout(this.hostOpenDoor.bind(this, this.hostReveal), 4000);
        setTimeout(hostPromptToStayOrSwitch, 6000);
        setTimeout(() => this.hostPromptsComplete = true, 6001);
    }

    hostChoice(){
        const doorsArray = ["door1", "door2", "door3"];
        const remainingDoorsArray = doorsArray.filter(door => (door !== this.originalPick && door !== this.winningDoor()));
        if (remainingDoorsArray.length === 2){
            const randomIndex = () => Game.randomIntegerZeroToNum(1);
            this.hostReveal = remainingDoorsArray[randomIndex()];
        } else {
            this.hostReveal = remainingDoorsArray[0];
        }
    }

    hostOpenDoor(doorId){
        const selectedDoorImage = document.querySelector(`#${doorId} img`);
        const objectBehindDoor = this[doorId];
        selectedDoorImage.src = Game.rodentiaAndCarNamesAndImageUrlsObj[objectBehindDoor];
    }

    finalPick(finalDoorPick){
        const finalPickDoorCard = document.getElementById(finalDoorPick);
        
        finalPickDoorCard.classList.add('final-pick');
        if (finalDoorPick === this.switchDoor()) { 
            this.userSwitch = true;
        } else {
            this.userSwitch = false;
        }
        this.userWin = (finalDoorPick === this.winningDoor()) ? true : false;

        GameApi.createGame(this);

        this.hostResponseToFinalChoice(finalDoorPick);
    }
    
    hostResponseToFinalChoice(finalDoorPick){
        hostTalkBubble.innerHTML = `You decided to ${this.userChoice.toUpperCase()}.<br>Final choice: ${finalDoorPick.toUpperCase()}.`;
        setTimeout((()=>hostTalkBubble.innerHTML = "Drum Roll....."), 2000);
        setTimeout(this.finalChoiceReveal.bind(this), 3000);    
        setTimeout((()=>{
            hostTalkBubble.innerHTML += "<br>Would you like to See Stats & Results or Play Again? If you want to Change Users, click the button above.";
            Game.seeResultsOptions();
            Game.addPlayAgainButton();
        }), 5000);
    }

    finalChoiceReveal(){
        hostTalkBubble.innerHTML += `<br>You ${this.winLose.toUpperCase()}.`;
        for (let i = 0; i < doorCards.length; i++){
            const doorId = doorCards[i].id;
            this.hostOpenDoor(doorId);
        }
    }

    static seeResultsOptions(){
        UserApi.getUsers();
        this.addSeeResultsButtons();
        this.unstickHostPromptFormDiv();
    }

    static addSeeResultsButtons(){
        this.addAllResultsButton();
        this.addCurrentUserResultsButton();
    }

    static addCurrentUserResultsButton(){
        const currentUserResultsButton = document.createElement('button');
        currentUserResultsButton.id = "current-user-results-button";
        currentUserResultsButton.classList.add("btn-large", "right-align", "light-blue", "darken-3");
        currentUserResultsButton.innerText = "See My Results and Stats";
        currentUserResultsButton.addEventListener('click', this.handleClickEvent);
        hostTalkBubble.insertAdjacentElement('afterend', currentUserResultsButton);
    }

    static addAllResultsButton(){
        const allResultsButton = document.createElement('button');
        allResultsButton.id = "all-results-button";
        allResultsButton.classList.add("btn-large", "right-align", "blue", "darken-4");
        allResultsButton.innerText = "See All Results and Stats";
        allResultsButton.addEventListener('click', this.handleClickEvent);
        hostTalkBubble.insertAdjacentElement('afterend', allResultsButton);
    }

    static removeSeeResultsButtons(){
        const allResultsButton = document.getElementById('all-results-button');
        const currentUserResultsButton = document.getElementById('current-user-results-button');
        if (currentUserResultsButton){
            currentUserResultsButton.remove();
        }
        if (allResultsButton){
            allResultsButton.remove();        
        }
    }

    static addPlayAgainButton(){
        const playAgainButton = document.createElement('button');
        playAgainButton.id = "play-again-button";
        playAgainButton.classList.add("btn-large", "right-align", "light-purple", "darken-3");
        playAgainButton.innerText = "Play Again";
        playAgainButton.addEventListener('click', this.handleClickEvent);
        hostTalkBubble.insertAdjacentElement('afterend', playAgainButton);
    }

    static toggleGameDisplay(){
        currentGameContainer.style.display = (currentGameContainer.style.display === "none") ? "" : "none";
    }

    static toggleGameDisplayOffOnly(){
        currentGameContainer.style.display = "none"
    }

    static resetGame(){
        this.resetHostTalkContainer();
        this.resetCurrentGameContainer();
        this.resetCurrentUserResultsContainer();
        this.resetAllResultsContainer();
        this.removeSeeResultsButtons();
        this.resetHostPromptFormDiv();
        this.unshrinkHostImageAndBubbleFont();
        this.removePlayAgainButton();
    }

    static resetHostTalkContainer(){
        hostTalkBubble.style.display="none";
        hostTalkBubble.innerHTML = "";
        userSelectionContainer.innerHTML = "";
    }

    static resetCurrentGameContainer(){
        currentGameContainer.innerHTML = `      <section class='cards'>
        <article class='card' id='door1'>
            <h2>DOOR 1</h2>
            <img src='https://upload.wikimedia.org/wikipedia/commons/a/a7/Green_Lock_and_Door.jpg'  alt='a green door'>
        </article>
        <article class="card" id="door2">
            <h2>DOOR 2</h2>
            <img src='https://upload.wikimedia.org/wikipedia/commons/a/a7/Green_Lock_and_Door.jpg' alt='a green door'>
        </article>
        <article class='card' id='door3'>
            <h2>DOOR 3</h2>
            <img src='https://upload.wikimedia.org/wikipedia/commons/a/a7/Green_Lock_and_Door.jpg' alt='a green door'>
        </article>
      </section>`;
      currentGameContainer.style.display = "none";
    }

    static resetCurrentUserResultsContainer(){
        currentUserResultsContainer.style.display = "none";
        currentUserResultsHeader.innerText = "";
        currentUserStatsTable.innerHTML = `<div class="Rtable-cell-no-border">Username</div>
        <div class="Rtable-cell-no-border">Win % Overall</div>
        <div class="Rtable-cell-no-border">Switch-vs-Stay %</div>
        <div class="Rtable-cell-no-border">Switch & Win %</div>
        <div class="Rtable-cell-no-border">Stay & Win %</div>`;
        currentUserGamesTable.innerHTML = `<div class="Rtable-cell-game-number" id="game-number">Game</div>
        <div class="Rtable-cell">Username</div>
        <div class="Rtable-cell">User Choice</div>
        <div class="Rtable-cell">Win / Lose</div>`;
    }

    static resetAllResultsContainer(){
        allResultsContainer.style.display = "none";
        
        const overallStatsHeader = document.querySelector('#overall-stats-header');
        if (overallStatsHeader){
            overallStatsHeader.remove();
        }

        allUserStatsTable.innerHTML = `<div class="Rtable-cell-no-border">Username</div>
        <div class="Rtable-cell-no-border">Win % Overall</div>
        <div class="Rtable-cell-no-border">Switch-vs-Stay %</div>
        <div class="Rtable-cell-no-border">Switch & Win %</div>
        <div class="Rtable-cell-no-border">Stay & Win %</div>`;
        allResultsTable.innerHTML = `<div class="Rtable-cell-game-number" id="game-number">Game</div>
        <div class="Rtable-cell">Username</div>
        <div class="Rtable-cell">User Choice</div>
        <div class="Rtable-cell">Win / Lose</div>`;
    }

    static shrinkHostImageAndBubbleFont(){
        mountyPictureDiv.className = "Rtable-cell-shrunken-image";
        hostTalkBubble.style.fontSize = "150%";
    }

    static unshrinkHostImageAndBubbleFont(){
        mountyPictureDiv.className = "Rtable-cell-no-border";
        hostTalkBubble.style.fontSize = "200%";
    }

    static unstickHostPromptFormDiv(){
        hostPromptFormDiv.className = "";
        hostPromptFormDiv.classList.add("Rtable", "Rtable--2cols");
    }

    static resetHostPromptFormDiv(){
        hostPromptFormDiv.className = "";
        hostPromptFormDiv.classList.add("Rtable", "Rtable--2cols", "sticky-box");
    }

    static removePlayAgainButton(){
        const playAgainButton = document.getElementById('play-again-button');
        if (playAgainButton){
            playAgainButton.remove();
        }
    }

    static addCurrentUserGamesAndStatsToDom(){
        currentUser.addUserStatsToDom(currentUserStatsTable);
        UserApi.getUserGames(currentUser);
    }

    static addAllUserGamesAndStatsToDom(){
        this.addFinalStatsOverall();
        User.all.forEach(user => user.addUserStatsToDom(allUserStatsTable));
        GameApi.getGames();
    }

    addGameResultsToDom(resultsTableOnDom){
        const columnGameKeyArray = ["id", "userName", "userChoice", "winLose"];
        
        columnGameKeyArray.forEach(key => {
            const columnDiv = document.createElement('div');
            columnDiv.innerText = this[key];

            switch (true) {
                case (key === "id"):
                    columnDiv.classList.add("Rtable-cell-game-number", "game-number");
                    break;
                case (key === "userName"):
                    columnDiv.classList.add("Rtable-cell", "user-name");
                    break;
                case (this.userWin && this.userSwitch):
                    columnDiv.classList.add("Rtable-cell", key, "red-text");
                    break;
                case (this.userWin && !this.userSwitch):
                    columnDiv.classList.add("Rtable-cell", key, "blue-text");
                    break;
                default:
                    columnDiv.classList.add("Rtable-cell", key);
            }
            resultsTableOnDom.appendChild(columnDiv);
        })

    }

    static toggleCurrentUserResultsDisplay(){
        currentUserResultsContainer.style.display = (currentUserResultsContainer.style.display === "none") ? "" : "none";
    }

    static toggleAllResultsContainer(){
        allResultsContainer.style.display = (allResultsContainer.style.display === "none") ? "" : "none";
    }

    static addFinalStatsOverall(){
        const stayAndWinPercentageAverage = this.averageUserChoiceAndWinPercentage("stayAndWinPercentage");
        const switchAndWinPercentageAverage = this.averageUserChoiceAndWinPercentage("switchAndWinPercentage");
        const overallStatsHeader = document.createElement('h5');
        overallStatsHeader.id = 'overall-stats-header';
        overallStatsHeader.innerHTML = `Average % of Wins for <span class="red-text">Switching Doors: ${parseFloat(switchAndWinPercentageAverage).toFixed(2)}%</span> 
        <br><br>
        Average % of Wins for <span class="blue-text">Staying with First Pick: ${parseFloat(stayAndWinPercentageAverage).toFixed(2)}%</span>`;
        allUserResultsHeader.appendChild(overallStatsHeader);
    }

    static averageUserChoiceAndWinPercentage(userChoiceAndWinPercentage){
        const allUsersChoiceAndWinFiltered = User.all.filter(user => user[userChoiceAndWinPercentage] !== "N/A");
        const allUsersChoiceAndWinStats = [];
        for (const user of allUsersChoiceAndWinFiltered){
            allUsersChoiceAndWinStats.push(user[userChoiceAndWinPercentage]);
        }
        const dividendNumUsers = allUsersChoiceAndWinStats.length;
        const averageChoiceAndWinStat = allUsersChoiceAndWinStats.reduce((total, currentValue, index)=>{ 
            if (index === (dividendNumUsers - 1)){
                return ((total + currentValue) / dividendNumUsers);
            } else {
                return (total + currentValue);
            }
        },0);
        return averageChoiceAndWinStat;
    }

    winningDoor(){
        return Object.keys(this).find(key => this[key] === "car");
    }

    switchDoor(){
        const doorArray = ["door1", "door2", "door3"];
        const originalPick = this.originalPick;
        const hostReveal = this.hostReveal;
        const switchDoor = doorArray.find(door => { 
            return (door !== originalPick && door !== hostReveal);
        })
        return switchDoor;
    }

    get userChoice(){
        return (!!this.userSwitch) ? "switch" : "stay";
    }

    get winLose(){
        return (!!this.userWin) ? "win" : "lose";
    }
}
