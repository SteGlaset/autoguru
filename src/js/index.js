import bootstrap from 'bootstrap';

//Categories
const catButtons = document.querySelectorAll('.prices__item');
const categories = document.querySelectorAll('.categories__li');
function inactivate(nodeList) {
    [...nodeList].forEach(el => {
        el.classList.remove('active');
    });
}
[...catButtons].forEach(el => {
    el.addEventListener('click', function() {
        inactivate(catButtons);
        inactivate(categories);

        this.classList.add('active');

        const buttonFor = this.dataset.for;
        const catToActivate = document.querySelector(buttonFor);
        catToActivate.classList.add('active');
    });
})