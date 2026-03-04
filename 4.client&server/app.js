const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    // respone tv kan user vinh jea string. but lus tra res end ban res tv nam
    res.setHeader('content-Type', 'text/html');
    // res.setHeader('content-Type', 'text/plain');
    // res.setHeader('Content-Type', 'application/json');
    fs.readFile('4.client&server/index.html', (err, data) => {
        if (err) console.log(err);
        // res.write(data);
        res.end(data);
    })

});

server.listen(3000, () => {
    console.log('server running on port 3000');
});