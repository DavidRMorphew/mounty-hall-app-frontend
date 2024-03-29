class GameApi {
    
    static baseURL = "http://localhost:3000/games"
    
    static getGames(){
        fetch(this.baseURL)
        .then(resp => resp.json())
        .then(gameData => {
            gameData['data'].forEach(gameObj => {
                const gameResults = new Game({id: gameObj.id, user_id: gameObj.relationships.user.data.id, ...gameObj.attributes});
                gameResults.addGameResultsToDom(allResultsTable);
            })
        })
        .catch((error)=> {
            alert("A failure occurred in getting game results data. Please check that the Rails API server is running.");
            console.log(error);
        })
    }

    static createGame(game){
        
        const gameDataSnakeCasePropertyNames = {};
        
        (function () {
            for (const camelCaseProperty in game) {
                const snakeCaseProperty = GameApi.gamePropertyCamelToSnakeCase(camelCaseProperty);
                gameDataSnakeCasePropertyNames[snakeCaseProperty] = game[camelCaseProperty];
            }
        })();
 
        const configObj = {
            method: "POST",
            headers: { 
                "Content-Type": "application/json", 
                Accept: "application/json"
            },
            body: JSON.stringify(gameDataSnakeCasePropertyNames)
        }

        fetch(this.baseURL, configObj)
        .then(resp => resp.json())
        .then(savedGameData => {
            const gameData = savedGameData['data'];
            const newSavedGame = new Game({id: gameData.id, ...gameData.attributes});
        })
        .catch((error)=> {
            alert("A failure occurred in saving the game. Please check that the Rails API server is running.");
            console.log(error);
        })
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
        return snakeCaseProperty;
    }
}