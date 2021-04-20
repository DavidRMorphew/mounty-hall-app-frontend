class User {
    constructor({name, id}){
        this.id = id;
        this.name = name;
    };

    static addNewUserFormToDOM(){
        const newUserForm = document.createElement('form')
        newUserForm.innerHTML = 
        `<label for="username">New User Name</label>
        <input type="text" id="username" name="username">
        <input type="submit" value="submit">`
        newUserForm.id = "new-user-form"
        userSelectionContainer.appendChild(newUserForm)
        newUserForm.addEventListener('submit', event => {
            event.preventDefault()
            console.log(event.target)
        })
    };

}