// Questionary module
const questionaryModule = {
    init() {
        const questionPrev = document.getElementById('question-prev');
        const questionNext = document.getElementById('question-next');
        const questions = document.querySelectorAll('.question');
        const indicators = document.querySelectorAll('.question__indicator');
        const count = document.querySelector('.question_count');
        const submit = document.querySelector('.question-submit-box');

        if (!questionPrev || !questionNext) return;

        let questionCount = 1;
        const questionCountMax = 3;

        function removeQuestions() {
            questions.forEach(el => {
                el.classList.remove('question_active');
            });
        }

        function rewriteQuestionCount() {
            if (count) {
                count.innerText = `Вопрос ${questionCount} из ${questionCountMax}`;
            }
        }

        function removeButtons() {
            if (questionCount === 1) {
                questionPrev.classList.add('d-none');
            } else if (questionCount === questionCountMax) {
                questionNext.classList.add('d-none');
                if (submit) submit.classList.remove('d-none');
            } else {
                questionPrev.classList.remove('d-none');
                questionNext.classList.remove('d-none');
                if (submit) submit.classList.add('d-none');
            }
        }

        function toggleIndicators() {
            indicators.forEach((el, i) => {
                if (i + 1 !== questionCount) {
                    el.classList.remove('indicator_active');
                } else {
                    el.classList.add('indicator_active');
                }
            });
        }

        questionPrev.addEventListener('click', () => {
            questionCount--;
            removeButtons();
            removeQuestions();
            toggleIndicators();
            rewriteQuestionCount();
            let questionToActivate = document.getElementById(`question_${questionCount}`);
            if (questionToActivate) {
                questionToActivate.classList.add('question_active');
            }
        });

        questionNext.addEventListener('click', () => {
            questionCount++;
            removeButtons();
            removeQuestions();
            toggleIndicators();
            rewriteQuestionCount();
            let questionToActivate = document.getElementById(`question_${questionCount}`);
            if (questionToActivate) {
                questionToActivate.classList.add('question_active');
            }
        });
    }
};

export default questionaryModule;