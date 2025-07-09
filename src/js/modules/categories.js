// Categories module
const categoriesModule = {
    init() {
        const catButtons = document.querySelectorAll('.prices__item');
        const categories = document.querySelectorAll('.categories__li');

        if (!catButtons.length) return;

        function inactivate(nodeList) {
            nodeList.forEach(el => {
                el.classList.remove('active');
            });
        }

        catButtons.forEach(el => {
            el.addEventListener('click', function() {
                inactivate(catButtons);
                inactivate(categories);

                this.classList.add('active');

                const buttonFor = this.dataset.for;
                const catToActivate = document.querySelector(buttonFor);
                if (catToActivate) {
                    catToActivate.classList.add('active');
                }
            });
        });
    }
};

export default categoriesModule;