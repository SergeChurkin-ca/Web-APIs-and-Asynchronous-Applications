const order = false;

const breakfastPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (order) {
            resolve('Your order is ready');
        } else {
            reject(Error('Your order cannot be made.'));
        }
    }, 3000);
});

console.log(breakfastPromise);
breakfastPromise
    .then(val => console.log(val))
    .catch(err => console.log(error));