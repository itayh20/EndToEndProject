class Server {
    fajax
    constructor() {
    }
    serAction(){
        this.fajax = undefined;
        if (this.fajax === undefined){
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
        else{
            console.log("else");
        }

    }
    // get all the information from the DB
    get(){
        return DB.users;
    }
    // get specific information from the DB
    getSpecificInfo(specific = undefined){
        let arr = []
        if (specific === undefined) {
            console.log("nothing has been sent");
        }
        if(specific === "user name"){
            for (let i = 0; i < DB.users.length; i++) {
                arr.push(DB.users[i].userName);
            }
        }
        if(specific === "password"){
            for (let i = 0; i < DB.users.length; i++) {
                arr.push(DB.users[i].passWord);
            }
        }
        if(specific === "events"){
            for (let i = 0; i < DB.users.length; i++) {
                arr.push(DB.users[i].events);
            }
        }
        return arr;
    }
    // add somthing to the BD
    post(){

    }
    // update somthing in the DB
    put(putUserName, putPassword, change){
        let arrUsers = JSON.parse(localStorage.getItem('usersArr'));
        console.log(arrUsers);
        for (let i = 0; i < DB.users.length; i++) {
            if ((DB.users[i].userName === putUserName) &&
             (DB.users[i].password === putPassword)) {
                if (change === "user namme") {
                    DB.users[i].userName = change; 
                }
            }

        }
    }
    // delete somthing in the DB
    delete(){

    }





    
}

const server = new Server();
console.log(server.getSpecificInfo("user name"));
// server.put();
// console.log(DB.users[1])
