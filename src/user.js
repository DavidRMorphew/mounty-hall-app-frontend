class User {

    static all = [];

    constructor({name, id, winning_game_percentage, switch_percentage, switch_and_win_percentage, stay_and_win_percentage}){
        this.id = id;
        this.name = name;
        this.winningGamePercentage = winning_game_percentage;
        this.switchPercentage = switch_percentage;
        this.switchAndWinPercentage = switch_and_win_percentage;
        this.stayAndWinPercentage = stay_and_win_percentage;
        
        User.all.push(this);
    };

    static toggleUserSelectionDisplay(){
        userSelectionContainer.style.display = (userSelectionContainer.style.display === "none") ? "" : "none";
    }

    static addNewUserFormToDOM(){
        const newUserForm = document.createElement('form');
        newUserForm.innerHTML = 
        `<h3>Username: <h3><input type="text" id="username" name="username" required maxlength="15">
        <input class="btn-large light-blue darken-4" type="submit" value="Submit Username">`;
        newUserForm.id = "new-user-form"
        userSelectionContainer.appendChild(newUserForm);
        newUserForm.addEventListener('submit', this.handleClickEvent);
    };

    static handleClickEvent = (event) => {
        if (event.target.id === "new-user-form"){
            event.preventDefault();
            Game.toggleHostBubbleDisplay();
            User.toggleUserSelectionDisplay();
            const submittedUsername = event.target.querySelector('#username');
            UserApi.findOrCreateByName(submittedUsername.value);
            submittedUsername.value = "";
        } else if (event.target.id === "change-user-button"){
            User.changeUser();
        }
    };

    updateCurrentUser(){    
        this.loginUser();
        currentUser.addUserNameToNavbar();
        currentUser.addChangeUserButtonToNavbar();
        Game.initializeNewGame();
    }
    
    loginUser(){
        currentUser = this;
    }

    static updateCurrentUserAfterUsersFetch(){
        currentUser = User.all.find(user => user.id === currentUser.id);
    }

    addUserNameToNavbar(){
        const currentUserName = this.name;
        const nameLi = document.createElement('li');
        nameLi.innerHTML = `<h5 class="light-grey-text">Current Username: "${currentUserName}"</h5>`;
        nameLi.id = "navbar-current-user";
        navbarUl.appendChild(nameLi);
    }

    addChangeUserButtonToNavbar(){
        const changeUserButton = document.createElement('button');
        changeUserButton.id = "change-user-button";
        changeUserButton.classList.add("btn-large", "red", "darken-4", "right");
        changeUserButton.innerText = "Change User";
        navbarUl.appendChild(changeUserButton);
        changeUserButton.addEventListener('click', User.handleClickEvent);
    }

    static changeUser = () => {
        this.clearNavbar();
        Game.resetGame();
        Game.startLoginAndNewGame();
    }
    
    static clearNavbar = () => {
        navbarUl.innerHTML = "";
    }

    addUserStatsToDom(userStatsTableOnDom){
        const userStatsKeyArray = ["name", "winningGamePercentage", "switchPercentage", "switchAndWinPercentage", "stayAndWinPercentage"];
        
        userStatsKeyArray.forEach(key => {
            const columnDiv = document.createElement('div');
            if (this[key] === "N/A" || key === "name") {
                columnDiv.innerText = this[key];
            } else {
                columnDiv.innerText = parseFloat(this[key]).toFixed(2);
            }
            switch (key) {
                case ("stayAndWinPercentage"):
                    columnDiv.classList.add("Rtable-cell-no-border", key, "blue-text");
                    break;
                case ("switchAndWinPercentage"):
                    columnDiv.classList.add("Rtable-cell-no-border", key, "red-text");
                default:
                    columnDiv.classList.add("Rtable-cell-no-border", key);
            }
            userStatsTableOnDom.appendChild(columnDiv);
        })
    }
}