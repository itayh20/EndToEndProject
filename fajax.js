class Fajax {
    constructor() {
        this.onload = null;
    }

    open(method, url) {
        this.method = method;
        this.url = url;
    }
    send(id = null, value=null) {
        console.log(id)
        this.id = id;
        if (this.method === 'GET') {
            this.response = server.get(this.url);
            return this.onload();

        } else if (this.method === 'POST') {
            this.response = server.post(this.url,this.id);
            return this.onload();

        } else if (this.method === 'PUT') {
            this.response = server.put(this.id, this.value);
            return this.onload();

        } else if (this.method === 'DELETE') {

        }
    }
}


// x = new XMLHttpRequest();
// console.log(x);


// y = new FAJAX();
// y.onload = function () { return 5 }
// console.log(y);


const example = new Fajax();
example.onload = function () {
    // console.log(example.response);
}
const s = example.open('GET', 'users');
example.send();


