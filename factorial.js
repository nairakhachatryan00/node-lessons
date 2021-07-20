const culcFactorial = () => {
    let factorial = 1;
    for (let i = 1; i <= 50; i++) {
        factorial *= i;
    }
    return factorial;
};
process.send(culcFactorial());
