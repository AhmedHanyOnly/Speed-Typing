// Steps To Create The Project
//   [01] Create HTML Markup
//   [02] Add Styling And Separate From Logic
//   [03] Create The App Logic
//   ---- [01] Add Levels
//   ---- [02] Show Level And Seconds
//   ---- [03] Add Array Of Words
//   ---- [04] ِAdd Start Game Button
//   ---- [05] Generate Upcoming Words
//   ---- [06] Disable Copy Word And Paste Event + Focus On Input
//   ---- [07] Start Play Function
//   ---- [08] Start The Time And Count Score
//   ---- [09] Add The Error And Success Messages
//   [04] Your Trainings To Add Features
//   ---- [01] Save Score To Local Storage With Date
//   ---- [02] Choose Levels From Select Box
//   ---- [03] Break The Logic To More Functions
//   ---- [04] Choose Array Of Words For Every Level
//   ---- [05] Write Game Instruction With Dynamic Values
//   ---- [06] Add 3 Seconds For The First Word

const word = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leeched",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

// settings levels
const level = {
  Easy: 6,
  Normal: 5,
  Hard: 3,
};

//def settings
let diffSettName = "Normal";
let diffSettSec = level[diffSettName];

//selectors
let lvlName = document.querySelector(".text .level");
let lvlSec = document.querySelector(".text .sec");
let desWord = document.querySelector(".desWord");
let btn = document.querySelector(".btn");
let input = document.querySelector(".form .input");
let cmWord = document.querySelector(".cmWord");
let time = document.querySelector(".time span");
let score = document.querySelector(".score .got");
let tlScore = document.querySelector(".score .total");
let finish = document.querySelector(".finish");

//lvl Name Sec and TLscore  Title
lvlName.innerHTML = diffSettName;
lvlSec.innerHTML = diffSettSec;
tlScore.innerHTML = word.length;
time.innerHTML = diffSettSec;

//dis post in input
input.onpaste = function () {
  return false;
};

btn.onclick = function () {
  this.remove();
  input.focus();
  genWord();
  input.value = "";
};

function genWord() {
  let randomWord = word[Math.floor(Math.random() * word.length)];
  let indexWord = word.indexOf(randomWord);
  word.splice(indexWord, 1);
  desWord.innerHTML = randomWord;
  cmWord.innerHTML = "";
  time.innerHTML = diffSettSec;

  for (let i = 0; i < word.length; i++) {
    let span = document.createElement("span");
    let textSpan = document.createTextNode(word[i]);
    span.appendChild(textSpan);
    cmWord.appendChild(span);
  }
  setTimeout(() => {
    startPlay();
  }, 2000);
}

function startPlay() {
  let start = setInterval(() => {
    time.innerHTML--;
    if (time.innerHTML === "0") {
      clearInterval(start);
      if (desWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        input.value = "";
        score.innerHTML++;
        if (word.length > 0) {
          genWord();
        } else {
          let spanGood = document.createElement("span");
          spanGood.className = "good";
          let spanTextG = document.createTextNode("congratulation");
          spanGood.appendChild(spanTextG);
          finish.appendChild(spanGood);
        }
      } else {
        cmWord.remove();
        // input.remove();
        desWord.remove();
        reBtn();
        if (score.innerHTML === "0") {
          let spanBad = document.createElement("span");
          spanBad.className = "bad";
          let spanTextB = document.createTextNode("Game over");
          spanBad.appendChild(spanTextB);
          finish.appendChild(spanBad);
        } else if (score.innerHTML > "0") {
          let spanNotBad = document.createElement("span");
          spanNotBad.className = "spanNotBad";
          let NotBadText = document.createTextNode("Not Bad");
          spanNotBad.appendChild(NotBadText);
          finish.appendChild(spanNotBad);
        }
      }
    }
  }, 1000);
}

function reBtn() {
  let divBtn = document.querySelector(".reBtn");
  divBtn.style.display = "block";
  divBtn.onclick = function () {
    location.reload();
  };
}
