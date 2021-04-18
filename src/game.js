class Game {
    constructor(id, door1, door2, door3, original_pick, host_reveal, user_switch, user_win, user_id){
        this.id = id;
        this.door1 = door1;
        this.door2 = door2;
        this.door3 = door3;
        this.original_pick = original_pick;
        this.host_reveal = host_reveal;
        this.user_switch = user_switch;
        this.user_win = user_win;
        this.user_id = user_id;
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
        currentGameContainer.innerHTML = 
        `<section class='cards'>
            <article class='card' id='door1'>
                <h2>door 1</h2>
                <img src='https://i.imgur.com/tjvqilD.jpg'>
            </article>
            <article class="card" id="door2">
                <h2>door 2</h2>
                <img src='https://i.imgur.com/zRgVoAg.jpeg'>
            </article>
            <article class='card' id='door3'>
                <h2>door 3</h2>
                <img src='https://i.imgur.com/Oqy9GG1.jpg'>
            </article>
        </section>`
    };
};