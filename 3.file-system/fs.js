const fs = require("fs");

// =====> read file (get data from file)
// if we not use utf8 we can use data.toString for convert from lowlevel to hightlevel
// fs.readFile('../test.txt', 'utf8', (err, data) => {
//     if (err) console.log(err);
//     console.log(data);
// });

// =====> write file (insert data into file). overwrite data
// fs.writeFile('./test.txt', 'bro som ah lok', (err) => {
//     if (err) console.log(err); // write file beb nis vea ng overwrite knea
//     console.log("Write Successfully");
// });

// =====> write file. not overwrite data
// fs.appendFile('./test.txt', '\nNew Content', (err) => {
//     if (err) console.log(err);
//     console.log("Apeend Successfully");
// })

// =====> delete (if don't have file it's error)
// fs.unlink('./test.txt', (err) => {
//     if (err) console.log(err);
//     console.log("Deleted");
// });

// condition for when don't have file
// if (fs.existsSync('./test.txt')) {
//     fs.unlink('./test.txt', (err) => {
//         if (err) console.log(err);
//         console.log("Deleted");
//     });
// } else {
//     console.log("don't have file to delete");
// }

// ======================================> direcdery

// ----> create folder (dir)
// ----> if vea mean hx yg can validate oy vea mean 1,2,3.....
// fs.mkdir("./asset", (err) => {
//     if (err) console.log(err);
//     fs.writeFile('./mouykeasava.txt', (err) => {
//         console.log("Mouykea pit jea sava men")
//     })

// });

// ----> delete folder (dir) no validation
// fs.rmdir("asset", (err) => {
//     if (err) console.log(err);
//     console.log("Delete Success");
// })
// ----> delete folder (dir) have validation
// if (fs.existsSync('./asset')) {
//     fs.rm("asset", (err) => {
//         if (err) console.log(err);
//         console.log("Delete Success");
//     })
// } else {
//     console.log("Don't have folder to delete");
// }

// -----> delete folder and file in it.
// if (fs.existsSync('./asset')) {
//     fs.rm("asset", { recursive: true }, (err) => {
//         if (err) console.log(err);
//         console.log("Delete Success");
//     })
// } else {
//     console.log("Don't have folder to delete");
// }

if (fs.existsSync('./asset')) {
    fs.rm("./asset", { recursive: true }, (err) => {
        if (err) console.log(err);
        console.log("Delete Success");
    })
} else {
    fs.mkdir("./asset", (err) => {
        if (err) console.log(err);
        fs.writeFileSync('./asset/mouykeasava.txt', "bro som ah lok", (err) => {
            if (err) console.log(err);
            console.log("Success");
        })
    });
}