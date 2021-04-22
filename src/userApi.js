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
            const user = userData.data
            const id = user.id
            const name = user.attributes.name
            const selectedUser = new User({id, name});
            selectedUser.loginUser();
            // update user instaed of loginUser with loginUser inside updateUser
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
}