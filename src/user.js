class User {
    constructor({name, id}){
        this.id = id;
        this.name = name;
    };

    static addNewUserFormToDOM(){
        const selectUserTitle = document.createElement('h2')
        selectUserTitle.innerText = "Type a username below to find a user on file or create a new user. Alternatively, use the dropdown menu to the right to select a user."
        userSelectionContainer.appendChild(selectUserTitle)
        const newUserForm = document.createElement('form')
        newUserForm.innerHTML = 
        `<label for="username">New User Name</label>
        <input type="text" id="username" name="username">
        <input type="submit" value="submit">`
        newUserForm.id = "new-user-form"
        userSelectionContainer.appendChild(newUserForm)
        newUserForm.addEventListener('submit', event => {
            event.preventDefault()
            const submittedUsername = event.target.querySelector('#username').value;
            console.log(submittedUsername);
        })
    };

}