const randomNumbers = new RandomNumbers('#random-numbers');
const ranking = new Ranking('#numbers-ranking');

ranking.init();

function randomNumbersAndUpload() {
    randomNumbers.init();
    setTimeout(function () {
        ranking.upload(randomNumbers);
    }, 50);
}

randomNumbersAndUpload();
setInterval(function () {
    randomNumbersAndUpload();
}, 10000);
