class User {

    static all = [];

    constructor({name, id, winning_game_percentage, switch_percentage}){
        this.id = id;
        this.name = name;
        this.winningGamePercentage = winning_game_percentage;
        this.switchPercentage = switch_percentage

        User.all.push(this)
        // User.findUserOrAddToAll(this);
    };

    // static findUserOrAddToAll(user){
    //     if (!(this.all.some(element => element.id === user.id))){
    //         User.all.push(user);
    //     }
    // }

    static toggleUserSelectionDisplay(){
        userSelectionContainer.style.display = (userSelectionContainer.style.display === "none") ? "" : "none";
    }

    static addNewUserFormToDOM(){
        const newUserForm = document.createElement('form')
        newUserForm.innerHTML = 
        `<h3>Username: <h3><input type="text" id="username" name="username">
        <input class="btn-large light-blue darken-4" type="submit" value="Submit Username">`
        newUserForm.id = "new-user-form"
        userSelectionContainer.appendChild(newUserForm)
        newUserForm.addEventListener('submit', this.handleClickEvent)
    };

    static handleClickEvent = (event) => {
        event.preventDefault()
        if (event.target.id === "new-user-form"){
            // Is this method of grabbing and clearing form OK?
            const submittedUsername = event.target.querySelector('#username');
            UserApi.findOrCreateByName(submittedUsername.value);
            Game.toggleHostBubbleDisplay();
            submittedUsername.value = ""
        } else if (event.target.id === "change-user-button"){
            console.log(event.target)
            User.changeUser()
        }
    };

    loginUser(){
        currentUser = this;
    }
    updateCurrentUser(){    
        this.loginUser()
        currentUser.addUserNameToNavbar();
        currentUser.addChangeUserButtonToNavbar();
        User.toggleUserSelectionDisplay();
        Game.initializeNewGame();
    }

    static updateCurrentUserAfterUsersFetch(){
        currentUser = User.all.find(user => user.id === currentUser.id);
    }

    addUserNameToNavbar(){
        const currentUserName = this.name;
        const nameLi = document.createElement('li')
        nameLi.innerHTML = `<h5 class="light-grey-text">Current Username: "${currentUserName}"</h5>`;
        nameLi.id = "navbar-current-user";
        navbarUl.appendChild(nameLi);
    }

    addChangeUserButtonToNavbar(){
        const changeUserButton = document.createElement('button')
        changeUserButton.id = "change-user-button"
        changeUserButton.classList.add("btn-large", "red", "darken-4", "right")
        changeUserButton.innerText = "Change User"
        navbarUl.appendChild(changeUserButton)
        changeUserButton.addEventListener('click', User.handleClickEvent);
    }

    // build this out to start up a new game
    // Add Button only after game completed to avoid fragmentary games
    static changeUser = () => {
        this.clearNavbar();
        console.log("change user called");
        hostTalkBubble.innerText = "Select a username on file or create a new username."
        Game.toggleHostBubbleDisplay();
        this.toggleUserSelectionDisplay();
    }
    
    static clearNavbar = () => {
        navbarUl.innerHTML = "";
    }
}