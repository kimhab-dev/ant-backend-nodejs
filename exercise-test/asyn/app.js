// console.log("Start");

const { rejects } = require("node:assert");
const { error } = require("node:console");
const { promises } = require("node:dns");
const { resolve } = require("node:path")

// setTimeout(async () => {
//     console.log("Haha")
// }, 2000);

// console.log("end");

// -----> call back function
// function getData(callBack) {
//     setTimeout(() => {
//         callBack("Bike data loaded");
//     }, 2000)
// }

// getData((result) => {
//     console.log(result);
// })

// getUser((user) => {
//     getOrders(user.id, (orders) => {
//         getPayment(orders.id, (payment) => {
//             console.log(payment);
//         });
//     });
// });

// ------> promise
// const getData = () => {
//     return new Promise((resolve, rejects) => {
//         setTimeout(() => {
//             resolve("Bike data loaded");
//         }, 2000);
//     })
// };

// getData()
//     .then((result) => { console.log(result) })
//     .catch((error) => console.log(error));


// -----> asyn/ await
const getData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Bike data loaded");
        }, 2000)
    });
};

async function fetchData() {
    const result = await getData();
    console.log(result);
}

fetchData();