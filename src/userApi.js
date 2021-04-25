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
    }

    // called in index.js
    static getUsers(){
        fetch(this.baseUrl)
        .then(resp => resp.json())
        .then(usersData => {
            usersData["data"].forEach(userData => {
                new User({id: userData.id, name: userData.attributes.name})
            })
        })
    }

    static getUserGames(userId){
        const userGamesNestedRoute = `${this.baseUrl}/${currentUser.id}/games`
        fetch(userGamesNestedRoute)
        .then(resp => resp.json())
        .then(userGamesData => {
            console.log(userGamesData['data']);
        })
    }
}