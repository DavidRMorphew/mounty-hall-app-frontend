class User {
    constructor({name, id}){
        this.id = id;
        this.name = name;
    };

    static addNewUserFormToDOM(){
        const newUserForm = document.createElement('form')
        newUserForm.innerHTML = 
        `<input type="text" name="username">
        <input type="submit" value="submit">`
        newUserForm.id = "new-user-form"
        userSelectionContainer.appendChild(newUserForm)
    };

}