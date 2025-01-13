// script  menu.js
import {gameSection} from './game.js'


let randomMoveTimeout
let startRandomMoveTimeout
let gameType = null
let styleBoardTheme = 'img/chesspieces/wikipedia/{piece}.png'
let colorBoardPlayer = 'white'

let endDemo = false

//get html elements
const html = {
  commandsLabels : document.querySelector('.commands'),
  sectionMenu: document.querySelector('.menu'),
  sectionGame: document.querySelector('.game'),
  li: document.querySelectorAll('li'),

  figureLabel : document.querySelector('label[for="style"]'),
  figureBoard: document.getElementById('style'),

  styleLabel : document.querySelector('label[for="boards"]'),
  styleBoard : document.getElementById('boards'),

  colorLabel : document.querySelector('label[for="color"]'),
  colorBoard : document.getElementById('color'),
}

// ---------- Sounds -------------
const soundBtnClick = document.getElementById('soundBtnClick')
const soundHoverMenu = document.getElementById('soundHoverMenu')
const soundStartGame = document.getElementById('soundStartGame')


function menuSection() {
  let boardIds = ['boardMenuStyle', 'boardMenuDemo', 'boardMenuColor']
  const games = []
  const boards = []
  const boardActiveStates = {}

  boardIds.forEach((id, index) => {
    const game = new Chess()
    games.push(game)

    const board = Chessboard(id, {
      position: 'start',
      showNotation: false,
    })

    boards.push(board)

    boardActiveStates[id] = true

    function makeRandomMove() {
      const possibleMoves = game.moves()

      if (game.game_over() || !boardActiveStates[id] || endDemo) return

      const randomIdx = Math.floor(Math.random() * possibleMoves.length)
      game.move(possibleMoves[randomIdx])
      board.position(game.fen())

      // randomMoveTimeout = window.setTimeout(makeRandomMove, 800)
    }

    // startRandomMoveTimeout = window.setTimeout(makeRandomMove, 800)
  })

  //----------------- change board figures
  html.figureBoard.addEventListener('change', (e) => {
    soundBtnClick.play()
    let currentFigures = ''
    boards[0].clear()
    boardActiveStates['boardMenuStyle'] = false  //stop play current board
   

    if (e.target.checked) {
      currentFigures = 'img/chesspieces/alpha/{piece}.png'
      styleBoardTheme =  currentFigures 
      html.figureLabel.style.color = 'rgb(119, 185, 19)'
      
    } else {
      currentFigures = 'img/chesspieces/wikipedia/{piece}.png'
      styleBoardTheme = currentFigures 
      html.figureLabel.style.color = 'rgb(250, 234, 214)'
    }

    // new board with new theme
    boards[0] = Chessboard('boardMenuStyle', {
      pieceTheme: currentFigures,
      showNotation: false,
      position: 'start',
    })
  })


  //----------------- change board style
  html.styleBoard.addEventListener('change', (e) => {
    soundBtnClick.play()
    if (e.target.checked) {
      html.styleLabel.style.color =  'rgb(119, 185, 19)'
      // add style board by ID
      let style = document.createElement('style')
      style.id = 'customBoardStyle'
      style.innerHTML = `
        .white-1e1d7 { background-color: #b0b9b4 !important; color: #6d8873 !important; }
        .black-3c85d { background-color: #6d8873 !important; color: #b0b9b4 !important; }
      `;
      document.head.appendChild(style);
    } else {
        html.styleLabel.style.color =  'rgb(250, 234, 214)'
      // remove style board by ID
      let customStyle = document.getElementById('customBoardStyle')
      if (customStyle) {
        customStyle.parentNode.removeChild(customStyle)
      }
    }
  })
  
      
  //-------------------- change board orientation
  html.colorBoard.addEventListener('change', (e) => {  
    soundBtnClick.play()
    boards[2].clear()
    boardActiveStates['boardMenuColor'] = false  //stop play current board
    let color = ''
    if (e.target.checked) {
      color = boards[2].orientation('black')
      colorBoardPlayer = 'black'
      html.colorLabel.style.color = 'rgb(119, 185, 19)'
    } else {
      color = boards[2].orientation('white')
      colorBoardPlayer = 'white'
      html.colorLabel.style.color = 'rgb(250, 234, 214)'
    }
       // new board with new theme
       boards[2] = Chessboard('boardMenuColor', {
         orientation: color, 
         position: 'start',
        showNotation: false,
      })
  })
}

    
    
  //---------------- choice TypeGame
html.li.forEach((el, i) => {  
  el.addEventListener("mouseenter", () => {
    // soundHoverMenu.currentTime = 0 // restart sound
    soundHoverMenu.play()
  })
  if(i > 1) return

  el.addEventListener('click', e => {
    soundStartGame.play()
      // console.log(e, i)
    gameType = i + 1
      html.commandsLabels.style.display = 'block'
      html.sectionMenu.style.display = 'none'
      html.sectionGame.style.display = 'block'

      // stop and destroy all boards
    endDemo = true 
    // clearTimeout(startRandomMoveTimeout)
    // clearTimeout(randomMoveTimeout)
        
    //call function
    gameSection(gameType, colorBoardPlayer, styleBoardTheme )
    
      
   }) 
  })





export { menuSection, colorBoardPlayer, styleBoardTheme }
