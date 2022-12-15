class Fajax {
    constructor() {
        this.onload = null;
        this.response= null;
    }

    open(method, url) {
        this.method = method;
        this.url = url;
    }
    send(id = null) {
        this.id = id;
        if (this.method === 'GET') {
            this.response = server.get(this.url);
            return this.onload();

        } else if (this.method === 'POST') {
            this.response = server.post(this.url,this.id);
            this.response = server.get(this.url,this.id);
            return this.onload();

        } else if (this.method === 'PUT') {
            this.response = server.get(this.url);
            return this.onload();

        } else if (this.method === 'DELETE') {
            this.response = server.get(this.url);
            return this.onload();
        }
    }
}

// const xml = new Fajax();
        // xml.onload = function () {
        //     server.post();
        // }
        // xml.open('POST', 'events');
        // xml.send();



