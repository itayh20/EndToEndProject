class Server {
    constructor() {
    }
    addUserToStorage() {
        this.users = JSON.parse(localStorage.getItem('usersArr'));
        console.log(this.users);

        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        this.users.push(new User(username, password));
        localStorage.setItem("usersArr", JSON.stringify(this.users));
        movePage('logIn');
        deletePage(window.location.hash.substring(1));
    }

    checkIfCanLogIn() {
        const usernameCheck = document.getElementById('username').value;
        const passwordCheck = document.getElementById('password').value;
        users = JSON.parse(localStorage.getItem('usersArr'));
        for (let i = 0; i < users.length; i++) {
            console.log(users[i]);
            if (users[i].userName === usernameCheck && users[i].passWord === passwordCheck) {
                console.log('good');
                deletePage(window.location.hash.substring(1));
                movePage('app');
            }
            else {
                console.log('You are not allowed to enter');
            }
        }
    }
}

const server = new Server();
