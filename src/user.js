class User {

    static all = [];

    constructor({name, id}){
        this.id = id;
        this.name = name;

        User.all.push(this);
    };

    // static addTitleToUserSelectionContainer(){
    //     const selectUserTitle = document.createElement('h2')
    //     selectUserTitle.innerText = "Type a username below to find a user on file or create a new user. Alternatively, use the dropdown menu to the right to select a user."
    //     userSelectionContainer.appendChild(selectUserTitle)
    // }

    static toggleUserSelectionDisplay(){
        userSelectionContainer.style.display = (userSelectionContainer.style.display === "none") ? "" : "none";
    }

    static addNewUserFormToDOM(){
        const newUserForm = document.createElement('form')
        newUserForm.innerHTML = 
        `<label for="username">New User Name</label>
        <input type="text" id="username" name="username">
        <input type="submit" value="submit">`
        newUserForm.id = "new-user-form"
        userSelectionContainer.appendChild(newUserForm)
        newUserForm.addEventListener('submit', this.handleClickEvent)
    };

    static handleClickEvent = (event) => {
        event.preventDefault()
        if (event.target.id === "new-user-form"){
            this.findOrCreateByName(event);
        };
    };

    static findOrCreateByName = (event) => {
        const submittedUsername = event.target.querySelector('#username').value;
        UserApi.findOrCreateByName(submittedUsername);
    };

}