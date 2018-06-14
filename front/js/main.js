const randomNumbers = new RandomNumbers('#random-numbers');
randomNumbers.init();
setInterval(function(){
    randomNumbers.init();
}, 10000);   
const ranking = new Ranking('#numbers-ranking');
ranking.init();