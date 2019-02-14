var easyBtn = document.querySelector('#easy');
var hardBtn = document.querySelector('#hard');
var playBtn = document.querySelector('#playBtn');
var btns = document.querySelectorAll('button');
var cirs = document.querySelectorAll('.rounded-pill');
var message = document.querySelector('.display-2');
var handler = function() {hide(this);};
var html = document.querySelector('html');
var mode = 1;
var ansGrid = -1;
var preAns = -1;
var numOfGrid = 3;

function colorGen() {
  color = [];
  for (var i = 0; i < 3; i += 1) {
    color.push(Math.floor(Math.random() * 255));
  }
  return "rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")"
}

function setColor(target, color) {
  target.style.backgroundColor = color;
}

function hide(target) {
  setColor(target, "#343a40")
}

function correct() {
  var desColor = cirs[ansGrid].style.backgroundColor;
  for (var i = 0; i < 6; i += 1) {
    setColor(cirs[i], desColor);
  }
  message.textContent = "CORRECT";
  html.style.setProperty("--background", desColor)
}

function newGame() {
  preAns = ansGrid;
  if (preAns != -1) {
    cirs[preAns].removeEventListener('click', correct); // Remove click listener for the previous answer grid.
  }
  for (var i = 0; i < 6; i += 1) {
    if (numOfGrid == 3 && i > 2) {
      hide(cirs[i]);
    } else {
      setColor(cirs[i], colorGen());
    }
  }
  ansGrid = Math.floor(Math.random() * numOfGrid);
  message.textContent = cirs[ansGrid].style.backgroundColor;
  cirs[ansGrid].addEventListener('click', correct);
  addEventCircles();

}

// Add events when clicking the circles.
function addEventCircles() {
  if (preAns == -1) {
    for (var i = 0; i < 6; i += 1) {
      if (i != ansGrid) {
        cirs[i].addEventListener('click', handler);
      }
    }
  } else if (preAns != ansGrid) {
    cirs[preAns].removeEventListener('click', correct);
    cirs[preAns].addEventListener('click', handler);
    cirs[ansGrid].removeEventListener('click', handler);
  }
}

/***************************************************/

// Initialize a new game
newGame();

// Add events when clicking the mode buttons.
for (var i = 1; i < btns.length; i += 1) {
  btns[i].addEventListener('click', function() {
    if (this.id != mode) {
      btns[1].classList.toggle("selected");
      btns[2].classList.toggle("selected");
      mode = 3 - mode;
      numOfGrid = 9 - numOfGrid;
    }
    newGame();
  });
}
btns[0].addEventListener('click', newGame);
