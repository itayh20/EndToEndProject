localStorage.setItem('usersArr', JSON.stringify([]));
localStorage.setItem('eventsArr', JSON.stringify([]));

class DataBase {
    users;
    constructor() {
        this.users = JSON.parse(localStorage.getItem('usersArr'));
        this.events = JSON.parse(localStorage.getItem('eventsArr'));
    }
}

const DB = new DataBase();
