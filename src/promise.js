var asyncAdd = (a, b)  => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Invalid arguments');
            }
        }, 1500);
    });
};

asyncAdd(2, 3).then((res) => {
    console.log(res);
}, (error) => {
    console.log(error);
});

asyncAdd(5, 7).then((res) => {
    console.log(res);
    return asyncAdd(res, '33');
}).then((res) => {
    console.log('Should be 45: ', res)
}).catch((error) => {
    console.log(error);
});

// var somePromise = new Promise((resolve, rejectt) => {
//     setTimeout(() => {
//         resolve('Works!');
//     }, 2500);
// });

// somePromise.then((message) => {
//     console.log('Success:', message);
// });