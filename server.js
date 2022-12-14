// server can't create and display elements on screen
// server connect with database

class Server {
    fajax
    constructor() {
    }


    // get all the information from the DB
    get(url) {
        if (url === 'users') {
            return DB.users;
        } else {
            return DB.events;
        }
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

    // add somthing to the DB
    post(url, id) {
        if (url === 'events' && id === 'addButton') {
            addButtonsForAddingEvents();
        } else if (url === "events" && id === "addEvent") {
            DB.events.push(promt);
            const paragraf = document.getElementById('myEvenP');
            for (let i = 0; i < DB.users.length; i++) {
                if (DB.users[i].userName === username) {
                    for (let j = 0; j < DB.users[i].events.length; j++) {
                        paragraf.textContent += DB.users[i].events[j] + ','
                    }
                }
            }
            // paragraf.textContent = DB.events;
        }
    }

    // update somthing in the DB
    put(putUserName, putPassword, change, changeValue, url) {
        if (url === 'users') {
            for (let i = 0; i < DB.users.length; i++) {
                if ((DB.users[i].userName === putUserName) &&
                    (DB.users[i].passWord === putPassword)) {
                    if (change === "user name") {
                        DB.users[i].userName = changeValue;
                    } else if (change === "password") {
                        DB.users[i].password = changeValue;
                    }
                }
            }
        } else if (url === 'events') {
            for (let i = 0; i < DB.users.length; i++) {
                if ((DB.users[i].userName === putUserName) &&
                    (DB.users[i].passWord === putPassword)) {
                    if (change === "events") {
                        DB.users[i].events = changeValue;
                    }
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