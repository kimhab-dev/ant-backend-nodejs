const http = require('http');
const fs = require('fs');

let Data = '';
const server = http.createServer(async (req, res) => {
    const data = await fetch('https://dummyjson.com/products');
    console.log(data);
    // Data = await data.json();
    // null can add other value like (key, value)
    // Data = JSON.strngify(Data.products, null, '\t');
    // fs.writeFile('exercise/user&client/data.txt', `${Data}`, (err) => {
    //     if (err) console.log(err);
    // });
});

server.listen(3000, () => {
    console.log('server running on port 3000');
})