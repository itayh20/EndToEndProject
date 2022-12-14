class Server {
    fajax
    constructor() {
    }
    serAction() {
        this.fajax = undefined;
        if (this.fajax === undefined) {
            console.log("nothing has been sent");
        }
        if (this.fajax === "get") {
            this.get();
        }
        if (this.fajax === "getSpecificInfo") {
            this.getSpecificInfo();
        }
        if (this.fajax === "post") {
            this.post();
        }
        if (this.fajax === "put") {
            this.put();
        }
        if (this.fajax === "delete") {
            this.delete();
        }
        else {
            console.log("else");
        }

    }
    // get all the information from the DB
    get() {
        return DB.users;
    }
    // get specific information from the DB
    getSpecificInfo(specific = undefined) {
        let arr = []
        if (specific === undefined) {
            console.log("nothing has been sent");
        }
        if (specific === "user name") {
            for (let i = 0; i < DB.users.length; i++) {
                arr.push(DB.users[i].userName);
            }
        }
        if (specific === "password") {
            for (let i = 0; i < DB.users.length; i++) {
                arr.push(DB.users[i].passWord);
            }
        }
        if (specific === "events") {
            for (let i = 0; i < DB.users.length; i++) {
                arr.push(DB.users[i].events);
            }
        }
        return arr;
    }
    // add somthing to the BD
    post() {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        console.log(DB.users);
        DB.users.push(new User(username, password));
        localStorage.setItem("usersArr", JSON.stringify(DB.users));
        movePage('logIn');
        deletePage(window.location.hash.substring(1));
    }
    // update somthing in the DB
    put(putUserName, putPassword, change, changeValue) {
        for (let i = 0; i < DB.users.length; i++) {
            if ((DB.users[i].userName === putUserName) &&
                (DB.users[i].passWord === putPassword)) {
                if (change === "user name") {
                    DB.users[i].userName = changeValue;
                } else if (change === "password") {
                    DB.users[i].password = changeValue;
                }
                else if (change === "events") {
                    DB.users[i].events = changeValue;
                }
            }

        }
    }
    // delete somthing in the DB
    delete(putUserName, putPassword) {
        for (var i = 0; i < DB.users.length; i++) {
            if ((DB.users[i].userName === putUserName) &&
                (DB.users[i].passWord === putPassword)) {
                DB.users.splice(i, 1);
            }
        }
    }

    checkIfCanLogIn() {
        let bool = false;
        let num;
        const usernameCheck = document.getElementById('username').value;
        const passwordCheck = document.getElementById('password').value;
        for (let i = 0; i < DB.users.length; i++) {
            if (DB.users[i].userName === usernameCheck && DB.users[i].passWord === passwordCheck) {
                bool = true;
                num = i;
                break;
            }
        }
        if (bool) {
            deletePage(window.location.hash.substring(1));
            movePage('app', DB.users[num]);
        } else {
            alert('not')
        }
    }
}

const server = new Server();



