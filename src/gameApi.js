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
        
        // Ask about this:
        const gameDataSnakeCasePropertyNames = {};
        (function () {
            for (const camelCaseProperty in game) {
                const snakeCaseProperty = GameApi.gamePropertyCamelToSnakeCase(property)
                gameDataSnakeCasePropertyNames[snakeCaseProperty] = game[camelCaseProperty];
            }
        })();
 
        const configObj = {
            method: "POST",
            headers: { 
                "Content-Type": "application/json", 
                Accept: "application/json"
            },
            body: JSON.stringify(gameData)
        }

        // fetch(this.baseURL, configObj)
        // .then(resp => resp.json())
        // .then(savedGameData => {

        // }
    }

    static gamePropertyCamelToSnakeCase(property){
        const propertyArray = property.split('');
        const snakeCaseProperty = propertyArray.map(letter => {
            if (letter === letter.toUpperCase() && !letter.match(/[0-9]/)) {
                return (letter = `_${letter.toLowerCase()}`);
            } else {
                return letter;
            }
        }).join('')
        return snakeCaseProperty
    }
}