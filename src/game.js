class Game {
    static all = [];

    constructor({user_id, user_name, door1, door2, door3, original_pick, host_reveal, user_switch, user_win, id}){
        this.userId = user_id;
        this.username = user_name;
        this.door1 = door1;
        this.door2 = door2;
        this.door3 = door3;
        this.originalPick = original_pick;
        this.hostReveal = host_reveal;
        this.userSwitch = user_switch;
        this.userWin = user_win;
        this.id = id;
        this.doorClickCount = 0;

        Game.all.push(this);
    };

    // Ask about this:
    static rodentiaNamesAndImageUrlsObj = {beaver: "https://i.imgur.com/tjvqilD.jpg", marmot: "https://i.imgur.com/Oqy9GG1.jpg", woodchuck: "https://i.imgur.com/zRgVoAg.jpeg"}

    static welcomePlayer = () => {
        this.toggleHostBubbleDisplay();
        hostTalkBubble.innerText = "Welcome to the Mounty Hall Game! I'm your host, Mr. Hall. Play the game, eh?"
        this.hostPause(this.createPlayButton);
    }

    static createPlayButton = () => {
        const playButton = document.createElement('button')
        playButton.id = "play-button"
        playButton.classList.add("btn-large", "right-align", "light-blue", "darken-4")
        playButton.innerText = "Play the Game"
        playButton.addEventListener('click', this.handleClickEvent)
        hostTalkBubble.insertAdjacentElement('afterend', playButton);
    }

    static handleClickEvent = (event) => {
        if (event.target.id === "play-button"){
            console.log("initiate game method")
            console.log(event.target)
            const playButton = event.target
            playButton.remove()
            Game.toggleHostBubbleDisplay()
            this.startNewGame()
        }
    }
    // Did not do doorclick event in handleClickEvent since I want to access current game


    static hostPause = (callback, multiplier = 1) => {
        setTimeout(callback, (multiplier * 700))
    }

    static startNewGame(){
        this.hostPause(() => {
            Game.toggleHostBubbleDisplay()
            hostTalkBubble.innerText = "Type a username below to find a user on file or create a new username."
        })
        this.hostPause(() => {
            User.toggleUserSelectionDisplay()
            User.addNewUserFormToDOM()
        }, 2)        
    }

    static toggleHostBubbleDisplay(){
        hostTalkBubble.style.display = (hostTalkBubble.style.display === "none")? "" : "none";
    }

    static initializeNewGame = () => {
        console.log("hit new game");
        const currentGame = new Game({user_id: currentUser.id});
        currentGame.randomizeGame();
        currentGame.makeDoorsClickable();
        console.log(currentGame);
        Game.hostPause(currentGame.hostInstructionsToGame);
        Game.hostPause(currentGame.toggleGameDisplay, 2)
    }
    
    hostInstructionsToGame() {
        hostTalkBubble.innerText = "Behind two doors below are Canadian woodland creatures; behind one is a car. Pick any door by clicking on it. Don't worry, eh! I'll give you the choice to switch doors later!"
        Game.toggleHostBubbleDisplay()
    }

    randomizeGame() {
        const randomizerArray = ["rodentia","rodentia","rodentia"];
        // const rodentiaArray = ["beaver", "woodchuck", "marmot"];
        const rodentiaArray = Object.keys(Game.rodentiaNamesAndImageUrlsObj);
        // const randomIntBetweenZeroAndTwo = () => Math.floor(Math.random() * 3);
        const randomIndex = () => Game.randomIntegerZeroToNum(2);
        randomizerArray[randomIndex()] = "car";
        for (let i = 0; i < randomizerArray.length; i++){
            if (randomizerArray[i] === "rodentia"){
                randomizerArray[i] = rodentiaArray[randomIndex()];
            };
        };
        const [door1, door2, door3] = randomizerArray;
        return Object.assign(this, {door1, door2, door3})
    };

    static randomIntegerZeroToNum = (num) => Math.floor(Math.random() * (num + 1))

    // Do I need to disable all of these before the next game?
    makeDoorsClickable(){
        for (const doorElement of doorCards){
            doorElement.addEventListener('click', () => this.handleDoorClicks(doorElement))
        }
    }

    handleDoorClicks(doorElement){
        this.doorClickCount++ 
        if (this.doorClickCount === 1) {
            this.hostResponseToFirstPick(doorElement);
            doorElement.classList.add("red-text")
        }
    }
    
    hostResponseToFirstPick(doorElement){
        this.originalPick = doorElement.id;
        // highlight original pick in some color with a note
        const hostResponse1 = () => hostTalkBubble.innerHTML = `You have picked ${this.originalPick.toUpperCase()} (highlighted in red).`
        const hostResponseFollowUp = () => hostTalkBubble.innerHTML += `<br> Now...to reveal one of the Canadian woodland creatures behind another door.`
        Game.hostPause(hostResponse1);
        Game.hostPause(hostResponseFollowUp, 4);
        // remove changeUser button during game
        // IIFE avoids losing this in the call of hostChoice
        Game.hostPause((()=>this.hostChoice()), 5);
    }

    hostChoice(){
        console.log(this)
        const doorsArray = ["door1", "door2", "door3"]
        const remainingDoorsArray = doorsArray.filter(door => (door !== this.originalPick && door !== this.winningDoor()))
        // console.log(remainingDoorsArray)
        // console.log(remainingDoorsArray.length)
        if (remainingDoorsArray.length === 2){
            const randomIndex = () => Game.randomIntegerZeroToNum(1);
            this.hostReveal = remainingDoorsArray[randomIndex()]
        } else {
            this.hostReveal = remainingDoorsArray[0]
        }
        this.hostOpenDoor()
    }

    hostOpenDoor(){
        const hostRevealedDoor = this.hostReveal
        const hostRevealedDoorImage = document.querySelector(`#${hostRevealedDoor} img`)
        const rodentBehindDoor = this[hostRevealedDoor]
        hostRevealedDoorImage.src = Game.rodentiaNamesAndImageUrlsObj[rodentBehindDoor]
        // disable event listener
    }

    toggleGameDisplay(){
        currentGameContainer.style.display = (currentGameContainer.style.display === "none") ? "" : "none";
    }

    createGameResultsRowOnDOM(){
        const rowGameKeyArray = [...Object.keys(this).slice(1,5), "stayResult", "switchResult", "userChoice", "winLose"];
        
        rowGameKeyArray.forEach(key => {
            const rowDiv = document.createElement('div');
            rowDiv.innerText = this[key];
            switch (key) {
                case (this.originalPick):
                    rowDiv.classList.add("Rtable-cell", key, "original-pick");
                    break;
                case (this.switchDoor()):
                    rowDiv.classList.add("Rtable-cell", key, "switch-door");
                    break;
                default:
                    rowDiv.classList.add("Rtable-cell", key);
            }
            resultsTable.appendChild(rowDiv);
        })
    }

    winningDoor(){
        return Object.keys(this).find(key => this[key] === "car")
    }

    switchDoor(){
        const doorArray = ["door1", "door2", "door3"]
        const originalPick = this.originalPick
        const hostReveal = this.hostReveal
        const switchDoor = doorArray.find(door => { 
            return (door !== originalPick && door !== hostReveal)
        })
        return switchDoor;
    }

    get stayResult(){
        const originalDoorPick = this.originalPick;
        const originalDoorResult = this[originalDoorPick];
        return originalDoorResult
    }

    get switchResult(){
        const switchDoor = this.switchDoor();
        return this[switchDoor];
    }

    get userChoice(){
        return (!!this.userSwitch) ? "switch" : "stay";
    }

    get winLose(){
        return (!!this.userWin) ? "win" : "lose";
    }
}
