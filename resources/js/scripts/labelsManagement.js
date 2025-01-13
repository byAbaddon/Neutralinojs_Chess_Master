//labelManagement.js

import { gamePlay, currentColorFigure} from "./gameStart.js"
import { colorBoardPlayer, styleBoardTheme } from "./menu.js"


const html = {
  gameType : document.querySelector('.gameType span:nth-of-type(2)'),

  popup: document.getElementById("popup"),
  btnYes: document.getElementById("btn-yes"),
  btnNo: document.getElementById("btn-no"),
  hours:   document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds'),

  wFigure: document.getElementById('w-figure'),
  wStep: document.getElementById('w-step'),
  bFigure: document.getElementById('b-figure'),
  bStep: document.getElementById('b-step'),

  timeLabel : document.querySelector('.time-label'),
  w_clock: document.querySelector('.white-clock'),
  b_clock: document.querySelector('.black-clock'),

  avatar: document.querySelector('.avatar img'),
  
  boardFrame :  document.querySelector('#myBoard'),
  labelStatus: document.querySelector('.status'),
 
}

// ---------- Sounds -------------
const soundBtnClick = document.getElementById('soundBtnClick')
const soundStartGame = document.getElementById('soundStartGame')
const soundSecond = document.getElementById('soundSecond')
const soundMinute = document.getElementById('soundMinute')


let isNewGameStarted = true
let isTimerActive = false
let currentGameType = html.gameType.textContent.trim()



function makeVisibleAndAddListeners(board, game, colorBoardPlayer) {
 
  updateAvatars(currentColorFigure, colorBoardPlayer)
  updateSteps(currentColorFigure, game)

    html.boardFrame.style.animation = 'none'
    html.labelStatus.style.animation = 'none'

  const btnNewGame = document.querySelector("#clearBoardBtn")
  const btnBackMenu = document.querySelector(".btn-back-menu")

  // remove all old listeners
  const removeAllListeners = () => {
    const clonedBtnYes = html.btnYes.cloneNode(true);
    html.btnYes.replaceWith(clonedBtnYes);
    html.btnYes = clonedBtnYes // update btn
  }

  if (btnNewGame && btnBackMenu) {
    // --- Close modal dialog
    html.btnNo.addEventListener("click", () => {
      soundBtnClick.play()
      html.popup.style.display = "none"
    })

    // ------------------- Button: Start New Game
    btnNewGame.addEventListener("click", () => {
    
      soundBtnClick.play()
      // --- Show modal dialog
      html.popup.style.display = "block"

      // remove listener btnYes
      removeAllListeners()

      html.btnYes.addEventListener("click", () => {
        setTimeout(() => soundStartGame.play(), 300)
        setTimeout(() => setStartTimer(), 1000);
      
   
        html.popup.style.display = "none"
        isNewGameStarted = true
        
        if (isNewGameStarted) {
          console.log("New game started")
          resetLabelsData()
          //resetTimer('game')  //reset timer

          board.destroy()  // remove old board
            console.log(currentGameType , ' test game type');
            
          
          gamePlay(colorBoardPlayer, styleBoardTheme)
          isNewGameStarted = false

          // time out for new start
          // newGameStartTimer = setTimeout(() => isNewGameStarted = true, 1500)
        }
      })
    })

    // ------------------- Button: Back To Menu
    btnBackMenu.addEventListener("click", () => {
      soundBtnClick.play()
      // --- Show modal dialog
      html.popup.style.display = "block"

      // remove all listeners on btnYes
      removeAllListeners()

      html.btnYes.addEventListener("click", () => {
        resetLabelsData()
        soundBtnClick.play()
        html.popup.style.display = "none"
        console.log("Back to menu")
        //resetTimer('menu')  //reset timer

        board.destroy();  // clear board
        document.querySelector(".game").style.display = "none"
        document.querySelector(".commands").style.display = "none"
        document.querySelector(".menu").style.display = "block"
      });
    })
  }





  // start Timers first time
  if (!isTimerActive) {
    // startPlayTimeInterval = setInterval(startPlayClock, 1000)
    // startTimeInterval = setInterval(startClocks, 1000)
    isTimerActive = true
  }
  //stop timer
  if (currentColorFigure == 'Game over') {
    // clearInterval(startPlayTimeInterval)
  }
 
}


//-------------------- TIMERS -------------------------------


//------------------------------ Play Timer
let startPlayTimeInterval;
let hours = 0
let minutes = 0 
let seconds = 0


function startPlayClock() { 
  seconds++;
  soundSecond.play()
  
  if (seconds == 60) {
    seconds = 0
    minutes++
    soundMinute.play()
  }

  if (minutes == 60) {
    minutes = 0
    hours++
  }

  // update HTML
  html.hours.textContent = String(hours).padStart(2, '0')
  html.minutes.textContent = String(minutes).padStart(2, '0')
  html.seconds.textContent = String(seconds).padStart(2, '0')
}



// -- reset all timers
const resetTimer = (stopFrom) => {
  // stop timers
  clearInterval(startPlayTimeInterval)
 
  // reset Play Timer
  hours = 0
  minutes = 0
  seconds = 0

  html.hours.textContent = '00'
  html.minutes.textContent = '00'
  html.seconds.textContent = '00'



  //-----------reset timer interval if star New game
  if (stopFrom == 'game') {
    startPlayTimeInterval = setInterval(startPlayClock, 1000)
  }
  
  //------------ clear timer is go to Menu
  if (stopFrom == 'menu') {
    isTimerActive = false
  
    html.hours.textContent = ''
    html.minutes.textContent = ''
    html.seconds.textContent = ''
  }
}


//------------------------------- start timer ------------------------
function setStartTimer() {
  const now = new Date()

  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  html.hours.textContent = hours.toString().padStart(2, "0");
  html.minutes.textContent = minutes.toString().padStart(2, "0");
  html.seconds.textContent = seconds.toString().padStart(2, "0");
}

function setPlayTime() {
  html.timeLabel.textContent = 'PLAY TIME'
  
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()
  
  const prevHours = parseInt(html.hours.textContent, 10)
  const prevMinutes = parseInt(html.minutes.textContent, 10)
  const prevSeconds = parseInt(html.seconds.textContent, 10)
  
  // match
  const diffHours = Math.abs(prevHours - hours)
  const diffMinutes = Math.abs(prevMinutes - minutes)
  const diffSeconds = Math.abs(prevSeconds - seconds)

  // update play time
  html.hours.textContent = diffHours.toString().padStart(2, "0")
  html.minutes.textContent = diffMinutes.toString().padStart(2, "0")
  html.seconds.textContent = diffSeconds.toString().padStart(2, "0")
}



//------------------------------- avatars -----------------------------
let color= ''
function updateAvatars(status, colorBoardPlayer,) {
  if (colorBoardPlayer) color = colorBoardPlayer
  //-------------------- Player
  if (html.gameType.textContent.trim() === 'Player') {
    if (status.includes('White')) {
      html.avatar.src = "img/avatars/user/white.png"
    } else if (status.includes('Black')) {
      html.avatar.src = "img/avatars/user/black.png"
    }
  } else { // -------------------AI
    if (color == 'white') { // White
      if (status.includes('White')) {
        html.avatar.src = "img/avatars/user/white.png"
      } else if (status.includes('Black')) {
        html.avatar.src = "img/avatars/ai/green.png"
      }
      color = 'white'
      updateStatusLabel(status) 
      return
    }
    
    if (color == 'black') {  // Black
      if (status.includes('Black')) {
        html.avatar.src = "img/avatars/user/black.png"
      } else {
        html.avatar.src = "img/avatars/ai/green.png"
      }
      color = 'black' 
      updateStatusLabel(status) 
      return
     }



  }

}

//-------------------------------- status label ------------------------
function updateStatusLabel(status) {
  if(status.length < 10) status = status + ' to move'
  html.labelStatus.textContent = status
  html.labelStatus.style.color = currentColorFigure === 'White' ? 'azure' : 'rgb(197, 136, 14)'
}

//-------------------------------- steps -----------------------------
function updateSteps(currentColorFigure, game, ) {
  // console.log(currentColorFigure ); 
  const history = game.history({ verbose: true });
  const figure = history.slice(-1)[0].piece.toUpperCase()
  const lastMove = history.slice(-1)[0];
  const color = lastMove.color; // "w"  or  "b" 
  const move = `${lastMove.from.toUpperCase()} - ${lastMove.to.toUpperCase()}`
  const capturedPiece = lastMove.captured; // is figure captured
  // console.log(color , '  ---  ',currentColorFigure, ' get color');

  if (currentColorFigure == 'White') {
    // html.bFigure.style.boxShadow = ''
    html.bStep.textContent =  move
    html.bFigure.style.width = '30px'
    html.bFigure.src = `/img/chesspieces/alpha/b${figure}.png`
    // if(capturedPiece)     html.wFigure.style.boxShadow = "0 0 4px 2px red"; 
    //border
    html.w_clock.style.borderBottom = '1px solid cornflowerblue'
    html.b_clock.style.border = ''
    
  } else if (currentColorFigure == 'Black') {
    html.wFigure.style.boxShadow = ''
     html.wStep.textContent =  move
     html.wFigure.style.width = '30px'
    html.wFigure.src = `/img/chesspieces/alpha/w${figure}.png`
    // if(capturedPiece)     html.bFigure.style.boxShadow = "0 0 4px 2px red"; 
    //border
    html.b_clock.style.borderBottom = '1px solid cornflowerblue'
    html.w_clock.style.border = ''
  } 
}



//------------------------------- effects --------------------------------
function gameOverEffects(typeEnd) {
  setPlayTime()
  if (typeEnd == 'checkmate') {
    setTimeout(() => {
      html.boardFrame.style.setProperty('animation', 'blink 0.5s 3');
      html.labelStatus.style.setProperty('animation', 'glow 0.5s 8');
    }, 300);

  } else {
    setTimeout(() => {
      html.boardFrame.style.setProperty('animation', 'blink 0.5s 1');
      html.labelStatus.style.setProperty('animation', 'glow 0.5s 3');
    }, 300);
    
  }

}


function resetLabelsData(currentColorFigure) {
  html.wStep.textContent = ''
  html.w_clock.style.border = ''
  html.wFigure.style.width = '0px'

  html.bStep.textContent = ''
  html.bFigure.style.boxShadow = ''
  html.bFigure.style.width = '0px'

 // labelLastStepMove:
  document.querySelector('.step').textContent = ''

  // stop animation
  html.boardFrame.style.setProperty('animation', 'none')
  html.labelStatus.style.setProperty('animation', 'none')
  html.labelStatus.textContent = ''
  
  //reset timer
  html.timeLabel.textContent = 'START TIME'
  html.hours.textContent = '00'
  html.minutes.textContent = '00'
  html.seconds.textContent = '00'

  // currentColorFigure = 'White' 
}



export { makeVisibleAndAddListeners, gameOverEffects, setStartTimer, updateStatusLabel, updateAvatars}





