class GameApi {
    static baseURL = "http://localhost:3000/games"
    
    static getGames(){
        fetch(this.baseURL)
        .then(resp => resp.json())
        .then(gameData => {
            console.log(gameData["data"]);
            gameData['data'].forEach(gameObj => {
                const gameResults = new Game({id: gameObj.id, user_id: gameObj.relationships.user.data.id, ...gameObj.attributes})
                gameResults.createGameResultsRowOnDOM()
            })
        })
    }

    static createGame(game){
        
        const gameDataSnakeCasePropertyNames = {};
        (function () {
            for (const property in game) {
                gameDataSnakeCasePropertyNames[Game.gamePropertyCamelToSnakeCase(property)] = game[property];
            }
        })();
        console.log(gameDataSnakeCasePropertyNames);
        
        debugger
        // const configObj = {
        //     method: "POST",
        //     headers: { 
        //         "Content-Type": "application/json", 
        //         Accept: "application/json"
        //     },
        //     body: JSON.stringify(gameData)
        // }

        // fetch(this.baseURL, configObj)
        // .then(resp => resp.json())
        // .then(savedGameData => {

        // }
    }
}