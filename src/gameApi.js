class GameApi {
    static baseURL = "http://localhost:3000/games"
    
    static getGames(){
        fetch(this.baseURL)
        .then(resp => resp.json())
        .then(gameData => {
            console.log(gameData["data"]);
            gameData['data'].forEach(gameObj => {
                const gameResults = new Game({id: gameObj.id, ...gameObj.attributes})
                console.log("game object: "+gameResults)
                debugger
            })
            // debugger
        })
    }   
}