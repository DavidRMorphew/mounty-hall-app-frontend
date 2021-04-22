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
        };
    };

    static findOrCreateByName(name){
        UserApi.findOrCreateByName(name);
    };

    loginUser(){
        currentUser = this;
        currentUser.displayCurrentUserAndRemoveUserSelection();
        currentUser.addLogoutButtonToNavbar()
    }

    // updateCurrentUser
    displayCurrentUserAndRemoveUserSelection(){
        this.addUserNameToNavbar()
        User.toggleUserSelectionDisplay()
    }


    addUserNameToNavbar(){
        const currentUserName = this.name;
        const nameLi = document.createElement('li')
        nameLi.innerHTML = `<h5>Current Username: "${currentUserName}"</h5>`;
        nameLi.id = "navbar-current-user";
        navbarUl.appendChild(nameLi);
    }

    addLogoutButtonToNavbar(){
        const logoutButton = document.createElement('button')
        // logoutButton.classList.add('btn', 'right')
        logoutButton.id = "logout"
        logoutButton.innerText = "Change User"
        navbarUl.appendChild(logoutButton)
        // add event listener with functionality
        // reformat button position
    }
}