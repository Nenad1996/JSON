import quizData from './script.json' assert { type: "json" };

function checkAnswers() {
  let displayResults = document.querySelectorAll(".display-result")
  
  for (let i = 0; i < displayResults.length; i++) {
    displayResults[i].remove()
  }
  
  // Give visual feedback
  for (const key in quizData.quiz) {
    let correctAnswer = quizData.quiz[key].answer
    let question = quizData.quiz[key].question
    
    let displayCorrect = document.createElement("div")
    displayCorrect.style.display = "flex"
    displayCorrect.style.marginTop = "1rem"
    displayCorrect.innerText = "Correct answer!!!"
    displayCorrect.className = "display-result"

    let displayWrong = document.createElement("div")
    displayWrong.style.display = "flex"
    displayWrong.style.marginTop = "1rem"
    displayWrong.innerText = "Ooops, wrong answer :("
    displayWrong.className = "display-result"

    for (let i = 0; i < allInputs.length; i++) {
      if (allInputs[i].name == question && allInputs[i].checked) {
        if (allInputs[i].value == correctAnswer) {
          allInputs[i]
            .parentNode
            .parentNode
            .append(displayCorrect)
        } else {
          allInputs[i]
            .parentNode
            .parentNode
            .append(displayWrong)
        }
      }
    }
  }
}

function saveAnswers() {
  for (let i = 0; i < allInputs.length; i++) {
   if (allInputs[i].checked) {
     localStorage.setItem(allInputs[i].name, allInputs[i].value)
   }
  }
}

window.addEventListener("load", event => retrieveAnswers())

function retrieveAnswers() {
  for (let i = 0; i < allInputs.length; i++) {
    for (const key in quizData.quiz) {
      if (localStorage.getItem(quizData.quiz[key].question) == allInputs[i].value) {
        allInputs[i].checked = true
      }
    }
  }
}

// Construct the quiz within the container
let quizContainer = document.getElementById("quizContainer")

for (const key in quizData.quiz) {
  let question = quizData.quiz[key].question
  let answers = quizData.quiz[key].options
  let div = document.createElement("div")
  
  div.innerHTML = `
    <h2>${question}</h2>
    <label>
      <input type="radio" name="${question}" value="${answers[0]}">
      ${answers[0]}
    </label>
    <label>
      <input type="radio" name="${question}" value="${answers[1]}">
      ${answers[1]}
    </label>
    <label>
      <input type="radio" name="${question}" value="${answers[2]}">
      ${answers[2]}
    </label>
    <label>
      <input type="radio" name="${question}" value="${answers[3]}">
      ${answers[3]}
    </label>
  `
  quizContainer.append(div)
}

// Assign each element an event listener to save selected answers to the localStorage
let allInputs = document.querySelectorAll("input[type='radio']")

for (let i = 0; i < allInputs.length; i++) {
  allInputs[i].addEventListener("click", event => saveAnswers())
}

// Add a button at the end to check for answers
let checkButton = document.createElement("button")

checkButton.style.marginTop = "1rem"
checkButton.innerText = "Check Answers"
checkButton.addEventListener("click", event => checkAnswers())
quizContainer.append(checkButton)
