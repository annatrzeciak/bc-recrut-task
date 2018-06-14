function Ranking(selector) {
    Component.call(this, selector);
    this.numbers = [];
}

Ranking.prototype = Object.create(Component.prototype);
Ranking.constructor = Ranking;

Ranking.prototype.init = function () {
    const self = this;

    axios.get('http://localhost:3000/numbers')
        .then(function (response) {
            self.numbers = response.data.data.map(function (number) {
                return {
                    id: number,
                    count: 0
                }
            });

            self.render();
        })
        .catch(function (error) {
            console.error(error);
        });
};

Ranking.prototype.render = function () {
    const container = this.getDOMElement();
    if (container) {
        while (container.hasChildNodes()) {
            container.removeChild(container.lastChild);
        }
    }
    var goldMedal = 0;
    var silverMedal = 0;
    var bronzeMedal = 0;
    this.numbers.forEach(function (number) {

        if (number.count > goldMedal) goldMedal = number.count;
        if (number.count < goldMedal && number.count > silverMedal) silverMedal = number.count;
        if (number.count < silverMedal && number.count > bronzeMedal) bronzeMedal = number.count;

        const listElement = document.createElement('li');
        listElement.classList.add('list-group-item');

        if (number.count == goldMedal) listElement.innerHTML = '<i class="gold-medal"></i> ' + number.id + '<span class="number-count">' + number.count + '</span>';
        else if (number.count == silverMedal) listElement.innerHTML = '<i class="silver-medal"></i> ' + number.id + '<span class="number-count">' + number.count + '</span>';
        else if (number.count == bronzeMedal) listElement.innerHTML = '<i class="bronze-medal"></i> ' + number.id + '<span class="number-count">' + number.count + '</span>';
        else listElement.innerHTML = number.id + '<span class="number-count">' + number.count + '</span>';

        container.appendChild(listElement);
    });

};

Ranking.prototype.upload = function (randomNumbers) {

    var ranking = this.numbers;
    var lastRandomNumbers = randomNumbers.numbers;

    lastRandomNumbers.forEach(function (randomNumber) {
        for (let i = 0; i < ranking.length; i++) {
            if (ranking[i].id == randomNumber.id) {
                ranking[i].count++;
                break;
            }
        }
    })
    this.numbers.sort(function (a, b) {
        return b.count - a.count
    });
    this.render();

}
