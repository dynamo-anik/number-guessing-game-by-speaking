const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log('Nunber is : ', randomNum);

//initialize speech recognition object
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

//we need to initialize a veriable with this obj
let recognition = new window.SpeechRecognition();

//start recongnition and game
recognition.start();

//capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

//write what user speaks

function writeMessage(msg) {
  msgEl.innerHTML = `
  <div>You Said: </div>
  <span class = 'box'>${msg}</span>
  `;
}

//check the user input against number

function checkNumber(msg) {
  const num = +msg;

  //check if valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += `<div>This is not valid a number</div>`;
    return;
  }

  //check in range
  if (num > 100 || num < 1) {
    msgEl.innerHTML = `<div>Number must be between 1 and 100`;
    return;
  }

  //check number if guess is right
  if (num === randomNum) {
    document.body.innerHTML = `
      <h2>Congrats! You Have guessed the number! <br><br>
      It was ${num}</h2>
      <button class="play-again" id="play-again">Play Again</button>  
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += `<div>Go LOWER</div>`;
  } else {
    msgEl.innerHTML += `<div>GO HIGHER</div>`;
  }
}

//speak result

recognition.addEventListener('result', onSpeak);

//after ending SR service, continue gaming
recognition.addEventListener('end', () => recognition.start());

//play button event
document.body.addEventListener('click', (e) => {
  if (e.target.id === 'play-again') {
    window.location.reload();
  }
});

//generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}
