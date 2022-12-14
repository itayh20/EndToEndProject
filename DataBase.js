localStorage.setItem('usersArr', JSON.stringify([{userName:'o',passWord:'o'}]));
localStorage.setItem('eventsArr', JSON.stringify(['Eyal']));

class DataBase {
    users;
    constructor() {
        this.users = JSON.parse(localStorage.getItem('usersArr'));
        this.events = JSON.parse(localStorage.getItem('eventsArr'));
    }
}

const DB = new DataBase();