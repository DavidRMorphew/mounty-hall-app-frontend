class User {

    static all = [];

    constructor({name, id}){
        this.id = id;
        this.name = name;

        User.findUserOrAddToAll(this);
    };

    static findUserOrAddToAll(user){
        if (!(this.all.some(element => element.id === user.id))){
            User.all.push(user);
        }
    }

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
            this.findOrCreateByName(submittedUsername.value);
            Game.toggleHostBubbleDisplay();
            submittedUsername.value = ""
        } else if (event.target.id === "change-user-button"){
            console.log(event.target)
            User.changeUser()
        }
    };

    // Is this useless?
    static findOrCreateByName(name){
        UserApi.findOrCreateByName(name);
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

    addUserNameToNavbar(){
        const currentUserName = this.name;
        const nameLi = document.createElement('li')
        nameLi.innerHTML = `<h5 class="light-grey-text">Current Username: "${currentUserName}"</h5>`;
        nameLi.id = "navbar-current-user";
        navbarUl.appendChild(nameLi);
    }

    addChangeUserButtonToNavbar(){
        const changeUserButton = document.createElement('button')
        // changeUserButton.classList.add('btn', 'right')
        changeUserButton.id = "change-user-button"
        changeUserButton.classList.add("btn-large", "red", "darken-4", "right")
        changeUserButton.innerText = "Change User"
        navbarUl.appendChild(changeUserButton)
        changeUserButton.addEventListener('click', User.handleClickEvent);
        // add event listener with functionality
    }

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