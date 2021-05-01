class UserApi {
    
    static baseUrl = "http://localhost:3000/users";
    
    static findOrCreateByName(name){
        const usernameData = {name};

        const configObj = {
            method: "POST",
            headers: { 
                "Content-Type": "application/json", 
                Accept: "application/json"
            },
            body: JSON.stringify(usernameData)
        }
        fetch(this.baseUrl, configObj)
        .then(resp => resp.json())
        .then(userData => {
            const user = userData.data;
            const id = user.id;
            const name = user.attributes.name;
            const selectedUser = new User({id, name});
            selectedUser.updateCurrentUser();
        })
        .catch((error)=> {
            alert("A failure occurred in fetching or saving the user data. Please check that the Rails API server is running.");
            console.log(error);
        }) 
    }

    static getUsers(){
        fetch(this.baseUrl)
        .then(resp => resp.json())
        .then(usersData => {
            User.all = []
            usersData["data"].forEach(userData => {
                new User({id: userData.id, ...userData.attributes});
            })
            User.updateCurrentUserAfterUsersFetch()
        })
        .catch((error)=> {
            alert("A failure occurred in fetching data on all users. Please check that the Rails API server is running.");
            console.log(error);
        })
    }

    static getUserGames(user){
        const userGamesNestedRoute = `${this.baseUrl}/${user.id}/games`
        fetch(userGamesNestedRoute)
        .then(resp => resp.json())
        .then(userGamesData => {
            userGamesData['data'].forEach(userGameObj => {
                const game = new Game({id: userGameObj.id, user_id: userGameObj.relationships.user.data.id, ...userGameObj.attributes});
                game.addGameResultsToDom(currentUserGamesTable);
            })
        })
        .catch((error)=> {
            alert("There was a failure in getting user game data. Please check that the Rails API server is running.");
            console.log(error);
        })
    }
}