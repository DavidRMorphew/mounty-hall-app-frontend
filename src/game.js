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

        Game.all.push(this);
    };

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

    // Do I need to prevent default here?
    static handleClickEvent = (event) => {
        event.preventDefault()
        if (event.target.id === "play-button"){
            console.log("initiate game method")
            console.log(event.target)
            const playButton = event.target
            playButton.remove()
            Game.toggleHostBubbleDisplay()
            this.startNewGame()
        }
    }

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

    initializeRandomGame(){
        const randomizerArray = ["rodentia","rodentia","rodentia"];
        const rodentiaArray = ["beaver", "woodchuck", "marmot"];
        const randomIntBetweenZeroAndTwo = () => Math.floor(Math.random() * 3);
        randomizerArray[randomIntBetweenZeroAndTwo()] = "car";
        for (let i = 0; i < randomizerArray.length; i++){
            if (randomizerArray[i] === "rodentia"){
                randomizerArray[i] = rodentiaArray[randomIntBetweenZeroAndTwo()];
            };
        };
        const [door1, door2, door3] = randomizerArray;
        return Object.assign(this, {door1, door2, door3})
    };

    
    makeDoorsClickable(){
        for (const element of doorCards){
            element.addEventListener('click', () => {
                console.log(element.id);          
            })
        }
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
