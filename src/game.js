class Game {
    constructor(user_id, door1, door2, door3, original_pick, host_reveal, user_switch, user_win, id){
        this.user_id = user_id;
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

    renderGameDisplay(){
        currentGameContainer.style.display = ""

        
        makeDoorsClickable()
        function makeDoorsClickable(){
            for (const element of doorCards){
                element.addEventListener('click', () => {
                    console.log(element.id);
                    
                })
            }
                
        }
        
    }

    
}
