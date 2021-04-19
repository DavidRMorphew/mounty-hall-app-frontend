class Game {
    constructor({user_id, user_name, door1, door2, door3, original_pick, host_reveal, user_switch, user_win, id}){
        this.user_id = user_id;
        this.user_name = user_name;
        this.door1 = door1;
        this.door2 = door2;
        this.door3 = door3;
        this.original_pick = original_pick;
        this.host_reveal = host_reveal;
        this.user_switch = user_switch;
        this.user_win = user_win;
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
        const rowGameKeyArray = [...Object.keys(this).slice(1,5), "stayResult", "switchResult", "userChoice", "userWin"];
        console.log(rowGameKeyArray);
        rowGameKeyArray.forEach(key => {
            const rowDiv = document.createElement('div')
            rowDiv.className = "Rtable-cell"
            rowDiv.id = key
            rowDiv.innerText = this[key]
            console.log(rowDiv)
        })
    //     const rowDiv = document.createElement('div')
    //         
    //     // rowDiv.className = "Rtable-cell"
    //     // rowDiv.id = "username"
    //     // rowDiv.innerHTML = `${this.user_name}</div>
    //     // <div class="Rtable-cell" id="door1">${this.door1}</div>
    //     // <div class="Rtable-cell" id="door2">${this.door2}</div>
    //     // <div class="Rtable-cell" id="door3">${this.door3}</div>
    //     // <div class="Rtable-cell" id="stay-result">Stay Result</div>
    //     // <div class="Rtable-cell" id="switch-result">Switch Result</div>
    //     // <div class="Rtable-cell" id="user-choice">User Choice</div>
    //     // <div class="Rtable-cell" id="win">${this.user_name}
    //     // `
    //     // console.log(rowDiv)
    }

    winningDoor(){
        return Object.keys(this).find(key => this[key] === "car")
    }

    get stayResult(){
        const originalDoorPick = this.original_pick;
        const originalDoorResult = this[originalDoorPick];
        return originalDoorResult
    }

    get switchResult(){
        const doorArray = ["door1", "door2", "door3"]
        const originalPick = this.original_pick
        const hostReveal = this.host_reveal
        const switchDoor = doorArray.find(door => { 
            return (door !== originalPick && door !== hostReveal)
        })
        return this[switchDoor]
    }

    get userChoice(){
        return (this.user_switch === "true") ? this.switchResult : this.original_pick;
    }

    get userWin(){
        return (this.winningDoor() === this.userChoice) ? "Win" : "Lose"
    }
}
