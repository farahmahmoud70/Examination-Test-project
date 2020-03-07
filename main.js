console.log("connected");
document.querySelector('.qcont').style.display = "none";
var con = document.querySelector('.colored-div');


con.addEventListener('click', function (e) {
    console.log(e.target);
    var targetEl = e.target;
    var parentEl = targetEl.parentNode;
    document.querySelector('.colored-div').style.display = "none";
    document.querySelector('.prompet-div').style.display = "block";
})

var btn = document.querySelectorAll('.btn')

btn.forEach(function (curr, i) {
    curr.addEventListener('click', function (e) {
        var elTarget = e.target
        var elParent = e.target.parentNode.parentNode;
        // console.log(elParent);
        if (elTarget === elParent.querySelector("#ok")) {
            console.log('beeeb1');
            var textValue = e.target.previousElementSibling.firstElementChild.value;
            if (textValue != "") {
                elParent.previousElementSibling.firstElementChild.textContent = "welcome " + textValue;
                document.querySelector('.prompet-div').style.display = "none";
                document.querySelector('.qcont').style.display = "grid";
                console.log("logged in ")
            } else {
                e.target.previousElementSibling.firstElementChild.focus();
                console.log("noooooooo");
            }

        } else if (elTarget === elParent.querySelector("#cancel")) {
            console.log(elParent.previousElementSibling);
            document.querySelector('.colored-div').style.display = "block";
            document.querySelector('.prompet-div').style.display = "none";
            console.log(elParent.previousElementSibling.classList);
            // console.log(elParent.previousElementSibling);
            console.log('beeeb2');
        }


    })
})


// var sliderBtn = document.querySelectorAll(".slider-btn")
// sliderBtn.forEach(function(curr){
//     curr.addEventListener('click', function(e){
//         var targetBtn = e.target;
//         console.log(targetBtn)

//         if (targetBtn.dataset.target === "next"){
//             console.log("next");
//             //get next questioon
//         }else if(targetBtn.dataset.target  === "prev"){
//             console.log("prev");
//         }else if(targetBtn.dataset.target  == "mark"){
//             console.log("marked");
//         }else{
//             console.log("alaaaho a3lm");
//         }

//     });
// });




var DataController = (function () {
    //private


    function QuestionsAndAnswers(question, answer1, answer2, answer3, answer4, correctAnswer) {
        this.question = question;
        this.answer1 = answer1;
        this.answer2 = answer2;
        this.answer3 = answer3;
        this.answer4 = answer4;
        this.correctAnswer = correctAnswer;
    }

    var questionObj1 = new QuestionsAndAnswers(" How many days do we have in a week?", "5", "6", "7", "3", "7");
    var questionObj2 = new QuestionsAndAnswers("How many days are there in a year?", "365", "265", "340", "166", "365");
    var questionObj3 = new QuestionsAndAnswers(" How many colours are there in a rainbow?", "4", "5", "6", "7", "7");
    var questionObj4 = new QuestionsAndAnswers("Which animal is known as the ‘Ship of the Desert?’", "Camel", "Cat", "Fish", "Dog", "Camel");
    var questionObj5 = new QuestionsAndAnswers("How many sides are there in a triangle?", "Three", "One", "two", "Four", "Three");
    var db = [questionObj1, questionObj2, questionObj3, questionObj4, questionObj5];
    var randomQuestion = []
    var counter = 0
    var currStatus = [];
    var status = [];

    while (randomQuestion.length < db.length) {
        var rand = Math.floor(Math.random() * db.length);
        if (randomQuestion.indexOf(rand) === -1) {
            randomQuestion.push(rand);
        }
    }

    //console.log(randomQuestion)
    //public
    return {

        nextQuestion: function () {
            if (counter < db.length - 1) {
                counter++;
            }
            var ques = db[randomQuestion[counter]]
            return obj = {
                qObj: ques,
                cObj: counter,
                dbLength: db.length
            };
        },

        prevQuestion: function () {
            if (counter > 0) {
                counter--;
            }

            var ques = db[randomQuestion[counter]]
            return obj = {
                qObj: ques,
                cObj: counter,
                dbLength: db.length
            };
        },
        getQuestion: function (i) {
            counter = i;
            var ques = db[randomQuestion[counter]]
            return obj = {
                qObj: ques,
                cObj: counter,
                dbLength: db.length
            };
        },
        getCurrCounter: function () {
            return counter;
        },
        QuestionStatus: function (info) {
            var markCurrInfoObj = {
                questionNum: info.qNum,
                index: info.userChoosenIndex
            }
            //  if(currStatus.includes(markSkipCurrInfoObj.questionNum)){
            //     console.log("1111");
            // }else{
            currStatus.push(markCurrInfoObj);
            //}

            //console.log(currStatus);
            return currStatus


        },
        status: function (info) {
            var markCurrInfoObj = {
                questionNum: info.qNum,
                index: info.userChoosenIndex
            }
            //debugger
            // if (status.includes(markCurrInfoObj.questionNum && markCurrInfoObj.index)) {
            //     console.log("1111");
            // } else {
                status.push(markCurrInfoObj);
            // }
            //console.log(status);
            return status
        },
        selectedQ: function (selected, i) {
            //console.log(selected)
            var que = db[randomQuestion[selected[i].questionNum]];
            //console.log(que)
            objOfCheck = {
                question: que,
                dot: selected[i].index

            }
            //console.log(objOfCheck)
            selected.splice(i,1);
            //console.log(selected)
            return objOfCheck

        },
        selectedQues: function (selected, i) {
            //console.log(selected)
            var que = db[randomQuestion[selected[i].questionNum]];
            //console.log(que)
            objOfCheck = {
                question: que,
                dot: selected[i].index,
                counter: i,
                dbLength: db.length

            }
            //console.log(objOfCheck)
            return objOfCheck
        },
        setNewCounter(i) {
            counter = i;
            //console.log(counter);
        }
        // pop(info,i){
        //     // console.log("infoooooooooooo",info);
        //     // console.log("iiiiiiiiiiiiiizzzzzzzzzzzzzz",i)
        //     // info.splice(i, 1);
        //     // console.log(info);
        // }
    }

})();
var UIController = (function () {
    //private
    var userChoosenIndex = 0;
    //public
    return {
        uiQuestion: function (q) {
            var answers = [q.qObj.answer1, q.qObj.answer2, q.qObj.answer3, q.qObj.answer4];
            document.querySelector("#qtext").textContent = q.cObj + 1 + ") " + q.qObj.question;

            var radioBtns = document.querySelectorAll(".check");
            radioBtns.forEach(function (curr, i) {
                document.getElementById("check" + i).checked = false;

            })
            for (var i = 0; i < answers.length; i < i++) {
                //console.log(document.querySelector("#id1").textContent);

                document.querySelector("#id" + i).textContent = answers[i];

            }

        },
        uiCurrQ: function (q) {
            var answers = [q.question.answer1, q.question.answer2, q.question.answer3, q.question.answer4];
            document.querySelector("#qtext").textContent = q.counter + 1 + ") " + q.question.question;
            document.getElementById("check" + q.dot).checked = true;
            for (var i = 0; i < answers.length; i < i++) {
                //console.log(document.querySelector("#id1").textContent);

                document.querySelector("#id" + i).textContent = answers[i];

            }

        },

        uiRadioButtons: function (curr) {
            var checkArray = [];

            var qNum = curr;

            //console.log(qNum);
            var radioBtns = document.querySelectorAll(".check");
            //console.log(radioBtns)
            radioBtns.forEach(function (curr, i) {
                //var radioTF = document.getElementById("check"+i).checked;
                checkArray.push(document.getElementById("check" + i).checked);
                //console.log("yraaaab", document.getElementById("check" + i).checked);

            })
            //console.log(checkArray);
            userChoosenIndex = checkArray.indexOf(true);
            //console.log(checkArray.indexOf(true));
            //console.log(userChoosenIndex);

            radioBtns.forEach(function (curr, i) {
                document.getElementById("check" + i).checked = false;

            })
            var node = document.createElement("div");
            node.textContent += `Question ${qNum+1}`;
            document.getElementById("marks").appendChild(node);
            node.className = "question-name";
            //console.log("true index", checkArray.indexOf(true))
            return radioBtnInfo = {
                userChoosenIndex,
                qNum
            }
        },
        radioBtn: function (curr) {
            var checkArray = [];

            var qNum = curr;

            //console.log(qNum);
            var radioBtns = document.querySelectorAll(".check");
            console.log(radioBtns)
            radioBtns.forEach(function (curr, i) {
                //var radioTF = document.getElementById("check"+i).checked;
                checkArray.push(document.getElementById("check" + i).checked);
                //console.log("yraaaab", document.getElementById("check" + i).checked);

            })
            //console.log(checkArray)
            userChoosenIndex = checkArray.indexOf(true);
            //console.log(checkArray.indexOf(true));
            //console.log(userChoosenIndex)

            radioBtns.forEach(function (curr, i) {
                document.getElementById("check" + i).checked = false;

            })

            //console.log("true index", checkArray.indexOf(true))
            return radioBtnInfo = {
                userChoosenIndex,
                qNum
            }

        },
        showSelectedQuestion: function (selected, i) {
            //console.log(selected)
            answers = [selected.question.answer1, selected.question.answer2, selected.question.answer3, selected.question.answer4];
            document.querySelector("#qtext").textContent = "*" + selected.question.question
            for (var i = 0; i < answers.length; i < i++) {
                document.querySelector("#id" + i).textContent = answers[i];
            }
            document.getElementById("check" + selected.dot).checked = true;

        }
    }

})();
var AppController = (function (Data, Ui) {
    //private

    //showing first question at the begining
    var counter = 0;
    Data.getQuestion(counter);
    Ui.uiQuestion(Data.getQuestion(counter));

    var uiMarkedQuestion;
    var markedQuestionStatus;
    var getData;
    var statusOfCurrent
    var sliderBtn = document.querySelectorAll(".slider-btn")
    //console.log(sliderBtn)
    sliderBtn.forEach(function (curr) {
        curr.addEventListener('click', function (e) {
            var targetBtn = e.target;
            if (targetBtn.dataset.target === "next") {


                // save status of question
                var getCurrCounter = Data.getCurrCounter();
                //console.log(getCurrCounter);
                //get marked question from user
                var currQuestion = Ui.radioBtn(getCurrCounter);
                // var currQuestion = Ui.uiRadioButtons(getCurrCounter);
                //console.log(currQuestion)
                // //save the status of marked question in data controller
                statusOfCurrent = Data.status(currQuestion);
                //console.log(statusOfCurrent);
                //get next questioon
                var nextQ = Data.nextQuestion();
                //update ui with next question
                var uiNextQ = Ui.uiQuestion(nextQ);



                //console.log("weeeeee",statusOfCurrent)

            } else if (targetBtn.dataset.target === "prev") {
                //get prev questioon
                var prevQ = Data.prevQuestion();


                //console.log(prevQ.cObj);
                //get data based on specific selection
                //remove selected question info from data controller
                var select = Data.selectedQues(statusOfCurrent, prevQ.cObj);
                //console.log(select)
                //update ui with prev question
                var uiPrevQ = Ui.uiCurrQ(select);
                //var uiSelectedQuestion = Ui.showSelectedQuestion(select);
                // //set counter to current counter
                // var newCounter = Data.setNewCounter(getData);
            } else if (targetBtn.dataset.target == "mark") {
                console.log("marked");
                //get current questuion
                if (targetBtn === this) {

                    getData = Data.getCurrCounter();
                    //get marked question from user
                    uiMarkedQuestion = Ui.uiRadioButtons(getData);
                    //console.log(uiMarkedQuestion)
                    //save the status of marked question in data controller
                    markedQuestionStatus = Data.QuestionStatus(uiMarkedQuestion);
                    //go to next question after clicking mark
                    //get next questioon
                    var nextQ = Data.nextQuestion();
                    //update ui with next question
                    var uiNextQ = Ui.uiQuestion(nextQ);

                }

                //choosen marked question
                var markedQuestions = document.querySelectorAll(".question-name");
                //console.log(markedQuestions)
                markedQuestions.forEach(function (curr, i) {
                    //debugger
                    curr.addEventListener('click', function (e) {
                        console.log("this", this)
                        if (e.target === this) {

                            //get data based on specific selection
                            //remove selected question info from data controller
                            var selection = Data.selectedQ(markedQuestionStatus, i);
                            //console.log(selection)
                            //update ui with info of selected question
                            var uiSelectedQuestion = Ui.showSelectedQuestion(selection);
                            //set counter to current counter
                            // var newCounter = Data.setNewCounter(getData);
                            //remove selected question from ui(marked section)
                            //var popSelectedQuestion = Ui.pop();
                        }
                    });
                });

            } else if (targetBtn.dataset.target === "pagination") {
                //console.log("page");
                var pages = document.querySelectorAll(".page-link")
                //console.log(pages);

                pages.forEach(function (curr, i) {
                    curr.addEventListener("click", function (e) {
                        if (e.target === this) {
                            //console.log("num", i)
                            //get question data based on selected page 
                            var question = Data.getQuestion(i);
                            //update ui with question
                            var uiQuestion = Ui.uiQuestion(question);
                        }
                    })
                });
            } else {
                //console.log("something else");
            }

        });
    });


    //public
    return {

    }
})(DataController, UIController);