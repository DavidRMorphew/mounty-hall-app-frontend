class Game {
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
    };

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

    addSingleGameResultsToDom(){
        const newRow = this.createGameResultsRow()
        console.log(newRow)
    }

    createGameResultsRow(){
        const rowGameKeyArray = [...Object.keys(this).slice(1,5), "stayResult", "switchResult", "userChoice", "winLose"];
        console.log(rowGameKeyArray);
        rowGameKeyArray.forEach(key => {
            const rowDiv = document.createElement('div');
            rowDiv.className = "Rtable-cell";
            rowDiv.id = key;
            rowDiv.innerText = this[key];
            resultsTable.appendChild(rowDiv);
        })
    }

    winningDoor(){
        return Object.keys(this).find(key => this[key] === "car")
    }

    get stayResult(){
        const originalDoorPick = this.originalPick;
        const originalDoorResult = this[originalDoorPick];
        return originalDoorResult
    }

    get switchResult(){
        const doorArray = ["door1", "door2", "door3"]
        const originalPick = this.originalPick
        const hostReveal = this.hostReveal
        const switchDoor = doorArray.find(door => { 
            return (door !== originalPick && door !== hostReveal)
        })
        return this[switchDoor]
    }

    get userChoice(){
        return (!!this.userSwitch) ? "switch" : "stay";
    }

    get winLose(){
        return (!!this.userWin) ? "win" : "lose";
    }
}
