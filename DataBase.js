class DataBase {
    users
    constructor() {
        this.users = JSON.parse(localStorage.getItem('usersArr'));
        // console.log(this.users);
        // btn.addEventListener('click', this.changeColor.bind(this));
        // send.addEventListener('click', this.addUserToStorage.bind(this));
    }

    addUserToStorage() {
        this.users = JSON.parse(localStorage.getItem('usersArr'));

        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        this.users.push(new User(username, password));
        localStorage.setItem("usersArr", JSON.stringify(this.users));
        movePage('logIn');
        deletePage(window.location.hash.substring(1));
    }

    deleteUser(username) {
        this.users = JSON.parse(localStorage.getItem('usersArr'));
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].userName == username) {
                // console.log('You are not allowed to enter');
                this.users.splice(i, 1);
            }
        }
        localStorage.setItem('usersArr', JSON.stringify(this.users));
    }


    checkIfCanLogIn() {
        this.users = JSON.parse(localStorage.getItem('usersArr'));

        const usernameCheck = document.getElementById('username').value;
        const passwordCheck = document.getElementById('password').value;
        this.users = JSON.parse(localStorage.getItem('usersArr'));
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].userName === usernameCheck && this.users[i].passWord === passwordCheck) {
                deletePage(window.location.hash.substring(1));
                movePage('app',this.users[i]);
            }
            else {
                // console.log('You are not allowed to enter');
            }
        }
    }

}

const DB = new DataBase();
