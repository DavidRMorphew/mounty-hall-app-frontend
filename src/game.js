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
        const rowDiv = document.createElement('div')
        const gameKeysArray = Object.keys(this).slice(1,9)
        console.log(gameKeysArray)        
        // rowDiv.className = "Rtable-cell"
        // rowDiv.id = "username"
        // rowDiv.innerHTML = `${this.user_name}</div>
        // <div class="Rtable-cell" id="door1">${this.door1}</div>
        // <div class="Rtable-cell" id="door2">${this.door2}</div>
        // <div class="Rtable-cell" id="door3">${this.door3}</div>
        // <div class="Rtable-cell" id="stay-result">Stay Result</div>
        // <div class="Rtable-cell" id="switch-result">Switch Result</div>
        // <div class="Rtable-cell" id="user-choice">User Choice</div>
        // <div class="Rtable-cell" id="win">${this.user_name}
        // `
        // console.log(rowDiv)
    }
}
