'use strict';

window.addEventListener('load' , () => {

    'use strict';
    const scoreElem = document.getElementById('score');
    const quizElem = document.getElementById('question-elem');
    const statsElem = document.getElementById('stats');
    const container = document.getElementById('container');
    const QandA = document.getElementById('q&a');
    var score = 0;

    function refreshScore(){
        scoreElem.innerText = score;
    };
    refreshScore();

    function upScore(){
        score += 1;
        refreshScore();
    };

    function upStats(){
        statsElem.innerText = questions[currentQuiz].quizNum + " of " + howManyQuestions;
    };

    const questions = [
        {
            quizNum : 1,
            question : 'Who is the world richest man?',
            correct : 'Elon Musk',
            answers : ['Bill Gates' , 'Elon Musk' , 'Andrew Tate' , 'Mark Zuckerburg']
        },
        {
            quizNum : 2,
            question : 'Who found the Facebook?',
            correct : 'Mark Zuckerburg',
            answers : ['Mark Zuckerburg' , 'Elon Musk' , 'Andrew Tate' , 'Bill Gates']
        },
        {
            quizNum : 3,
            question : 'What is the capital of Sri Lanka',
            correct : 'Jayawardhanapura',
            answers : ['Tricomalee' , 'Negambo' , 'Jayawardhanapura' , 'Colombo']
        },
        {
            quizNum : 4,
            question : 'If X=5, What is X+5*10 ?',
            correct : '100',
            answers : ['100' , '200' , '150' , '80']
        }
    ];
    const howManyQuestions = questions.length;
    var currentQuiz = -1;

    try {
        makeQuiz();
    } catch (error) {
        console.error("Error on makeQuiz() : " + error);
        document.write("Error on loading the webpage! makeQuiz() has error(s)! Please wait for more.");
        setTimeout(() => {
            window.location.reload();
        }, 5000);
    };
    function makeQuiz(){
        for(var i = 0 ; i<document.querySelectorAll('button').length ; i++){
            document.querySelectorAll('button')[i].style.color = '';
            document.querySelectorAll('button')[i].style.backgroundColor = '';
        };
        currentQuiz++;
        if(currentQuiz == howManyQuestions){
            gameOver();
            return;
        }else{
            for(var i = 0 ; i<document.querySelectorAll('button').length ; i++){
                document.querySelectorAll('button')[i].style.cursor = 'pointer';
            };
            upStats();
            quizElem.innerText = questions[currentQuiz].question;
            for(var i = 0 ; i<document.querySelectorAll('button').length ; i++){
                document.querySelectorAll('button')[i].innerHTML = questions[currentQuiz].answers[i];
                document.querySelectorAll('button')[i].onclick = function(){checkAnswer(this.innerHTML);};
            };
        };
    };

    function checkAnswer(answer){
        for(var i = 0 ; i<document.querySelectorAll('button').length ; i++){
            document.querySelectorAll('button')[i].onclick = function(){return;};
            document.querySelectorAll('button')[i].style.cursor = 'not-allowed';
        };

        if(answer !== questions[currentQuiz].correct){
            for(var i = 0 ; i<document.querySelectorAll('button').length ; i++){
                if(document.querySelectorAll('button')[i].innerHTML == questions[currentQuiz].correct){
                    document.querySelectorAll('button')[i].style.backgroundColor = 'green';
                    document.querySelectorAll('button')[i].style.color = 'white';
                    break;
                };
            };
            setTimeout(() => {
                hideAndShow();
            }, 1500);
            setTimeout(() => {
                makeQuiz();
            }, 2000);
            return;
        }else{
            for(var i = 0 ; i<document.querySelectorAll('button').length ; i++){
                if(document.querySelectorAll('button')[i].innerHTML == questions[currentQuiz].correct){
                    document.querySelectorAll('button')[i].style.backgroundColor = 'green';
                    document.querySelectorAll('button')[i].style.color = 'white';
                    break;
                };
            };
            upScore();
            setTimeout(() => {
                hideAndShow();
            }, 1500);
            setTimeout(() => {
                makeQuiz();
            }, 2000);
        };
    };

    function gameOver(){
        if(howManyQuestions > 1){
            var txt = "<p class='p1'>" + howManyQuestions + " Questions</p><p class='p2'>Score : " + score + "</p>";
        }else{
            var txt = "<p class='p1'>" + howManyQuestions + " Question</p><p class='p2'>Score : " + score + "</p>";
        };
        container.style.opacity = "0%";
        setTimeout(() => {
            container.innerHTML = txt;
            container.style.opacity = '100%';
        }, 500);
    };

    function hideAndShow(){
        QandA.style.transform = "scale(0.8) rotateY(180deg) rotate(5deg)";
        QandA.style.filter = "blur(5px)";
        setTimeout(() => {
            QandA.style.transform = "scale(1) rotateY(0deg) rotate(0deg)";
            QandA.style.filter = "blur(0px)";
        }, 1000);
    };

    console.log('Loaded successfully!');
});