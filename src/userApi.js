class UserApi {
    
    static baseUrl = "http://localhost:3000/users";
    
    static findOrCreateByName(name){
        const usernameData = {name};
        console.log("username data: "+usernameData)
        debugger
        // const configObj = {
        //     method: "POST",
        //     headers: { 
        //         "Content-Type": "application/json", 
        //         Accept: "application/json"
        //     },
        //     body: JSON.stringify(usernameData)
        // }
        // fetch(this.baseUrl, configObj)
        // .then()
        // console.log(submittedUsername)
        // debugger 
    }
}