class DataBase {
    users
    constructor() {
        this.users = localStorage.getItem('usersArr');
        console.log(this.users);
    }

    addUserToStorage() {
        // this.users = JSON.parse(localStorage.getItem('usersArr'));
        console.log(this.users);

        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        this.users.push(new User(username, password));
        localStorage.setItem("usersArr", JSON.stringify(this.users));
        movePage('logIn');
        deletePage(window.location.hash.substring(1));
    }

    getuser(username){
        this.users = JSON.parse(localStorage.getItem('usersArr'));
        this.users.findIndex(val=> val.userName = username)
        return this.users[index] 

    }
}

const DB = new DataBase();
