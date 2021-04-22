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
            const submittedUsername = event.target.querySelector('#username').value;
            this.findOrCreateByName(submittedUsername);
            Game.toggleHostBubbleDisplay();
        } else if (event.target.id === "change-user-button"){
            console.log(event.target)
            User.changeUser()
        }
    };

    static findOrCreateByName(name){
        UserApi.findOrCreateByName(name);
    };

    loginUser(){
        currentUser = this;
    }
    updateCurrentUser(){    
        this.loginUser()
        // currentUser.displayCurrentUserAndRemoveUserSelection();
        currentUser.addUserNameToNavbar();
        currentUser.addChangeUserButtonToNavbar();
        User.toggleUserSelectionDisplay();
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
    }
    
    static clearNavbar = () => {
        navbarUl.innerHTML = "";
    }
}