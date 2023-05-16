import 'bootstrap';

//Questionary
const questionPrev = document.getElementById('question-prev');
const questionNext = document.getElementById('question-next');
const questions = document.querySelectorAll('.question');
const indicators = document.querySelectorAll('.question__indicator');
const count = document.querySelector('.question_count');
const submit = document.querySelector('.question-submit-box')

let questionCount = 1;
const questionCountMax = 3;
function removeQuestions() {
    questions.forEach(el => {
        el.classList.remove('question_active');
    })
}

function rewriteQuestionCount() {
    count.innerText = `Вопрос ${questionCount} из ${questionCountMax}`
}

function removeButtons() {
    if (questionCount === 1) {
        questionPrev.classList.add('d-none');
    } else if (questionCount === questionCountMax) {
        questionNext.classList.add('d-none');
        submit.classList.remove('d-none')
    } else {
        questionPrev.classList.remove('d-none');
        questionNext.classList.remove('d-none');
        submit.classList.add('d-none')
    }
}

function toggleIndicators() {
    indicators.forEach((el, i) => {
        if (i + 1 !== questionCount) {
            el.classList.remove('indicator_active')
        } else {
            el.classList.add('indicator_active')
        }
    });
}



questionPrev.addEventListener('click', () => {
    questionCount--;
    removeButtons();
    removeQuestions();
    toggleIndicators()
    rewriteQuestionCount();
    let questionToActivate = document.getElementById(`question_${questionCount}`);
    questionToActivate.classList.add('question_active');
});

questionNext.addEventListener('click', () => {
    questionCount++;
    removeButtons();
    removeQuestions();
    toggleIndicators()
    rewriteQuestionCount();
    let questionToActivate = document.getElementById(`question_${questionCount}`);
    questionToActivate.classList.add('question_active');
});



//Categories
const catButtons = document.querySelectorAll('.prices__item');
const categories = document.querySelectorAll('.categories__li');
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
        catToActivate.classList.add('active');
    });
})

//Changing nav background
const header = document.getElementById('header');
function scrollHeader() {
    if (window.scrollY < 5) {
        header.classList.remove('header_background');
    } else {
        header.classList.add('header_background');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    scrollHeader();
});

window.addEventListener('scroll', () => {
    scrollHeader();
    header.classList.add('header_scrolling');
})
