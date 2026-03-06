const http = require('http');
// const fs = require('fs');

const server = http.createServer((req, res) => {
    // console.log(req.url, req.method);
    // respone tv kan user vinh jea string. but lus tra res end ban res tv nam
    // res.setHeader('content-Type', 'text/html');
    // res.setHeader('content-Type', 'text/plain');
    res.setHeader('Content-Type', 'application/json');

    let url = req.url.toLowerCase();
    // let path = '';
    switch (url) {
        case '/':
            // path = '4.client&server/index.html';
            // res.statusCode = 200;
            res.write('{flag: "home"}');
            break;
        case '/labs':
            // path = '4.client&server/contact.html';
            res.write('{flag: "labs"}');
            break;
        default:
            // path = '4.client&server/404.html'
            res.write("404");
            break;
    }
    res.end();
    // fs.readFile(path, (err, data) => {
    //     if (err) console.log(err);
    //     // res.write(data);
    //     res.end(data);
    // })

});

server.listen(3000, () => {
    console.log('server running on port 3000');
});