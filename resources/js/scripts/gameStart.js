//gamePlay.js

import {makeVisibleAndAddListeners, gameOverEffects , updateStatusLabel ,updateAvatars} from './labelsManagement.js';

// ---------- Sounds -------------
const soundMoveWhite = document.getElementById('soundMoveWhite');
const soundMoveBlack = document.getElementById('soundMoveBlack');
const soundTakenFigure = document.getElementById('soundGetFigure');
const soundCheck = document.getElementById('soundCheck');
const soundGameOverCheckMath = document.getElementById('soundGameOverCheckMath');
const soundGameOverPat = document.getElementById('soundGameOverPat');

const html = {
  gameType: document.querySelector('.gameType span:nth-of-type(2)'),
  labelLastStepMove: document.querySelector('.step'),
  avatar: document.querySelector('.avatar img'),
}

let currentColorFigure = 'White';
let currentStatusLabel = ''

function gamePlay(colorBoardPlayer, styleBoardTheme) {
  let board = null
  const game = new Chess()
  
//  addHoverEffect(currentColorFigure)

  function onDragStart(source, piece) {
    document.body.style.cursor = 'grabbing'
    if (game.game_over()) return false

    if (html.gameType.textContent.trim() === 'Player') {
      if ((game.turn() === 'w' && piece.search(/^b/) !== -1) || (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
        return false
      }
    } else {
      if (colorBoardPlayer === 'black' && piece.startsWith('w')) return false
      if (colorBoardPlayer === 'white' && piece.startsWith('b')) return false
    }
  }

  function onDrop(source, target) {
    document.body.style.cursor = 'default'
    const move = game.move({
      from: source,
      to: target,
      promotion: 'q',
    })

    if (move === null) return 'snapback'

    if (html.gameType.textContent.trim() === 'Player') {
      updateStatus()
    } else {
      // console.log('ttt', html.gameType.textContent.trim())   
      setTimeout(() => {
        if (html.gameType.textContent == 'AI-Child') makeRandomMove(board, game, currentStatusLabel)
        }, 1250)
    }
    
  }

  function onChange(oldPos, newPos) {
    let from, to, capturedPiece = null

    for (const square in oldPos) {
      if (!newPos.hasOwnProperty(square) || oldPos[square] !== newPos[square]) {
        from = square
        break
      }
    }

    for (const square in newPos) {
      if (!oldPos.hasOwnProperty(square) || oldPos[square] !== newPos[square]) {
        to = square
        if (oldPos.hasOwnProperty(to)) capturedPiece = oldPos[to]
        break
      }
    }

    if (from && to) {
      const currentColor = game.turn(); // "w" or "b" 
      currentColorFigure = currentColor == 'b' ? 'Black' : 'White'
  // console.log(currentColor === 'w' ? 'White player' : 'Black player', ' is making the move');

      
      html.labelLastStepMove.textContent = `${from} - ${to}`
      html.labelLastStepMove.style.color = currentColorFigure === 'White' ? 'rgb(197, 136, 14)' : 'azure'

      if (capturedPiece) {
        setTimeout(() => soundTakenFigure.play(), 300)
      }
    }
    makeVisibleAndAddListeners(board, game, colorBoardPlayer);
  }

  function onSnapEnd(colorBoardPlayer) {
    board.position(game.fen())
    currentColorFigure === 'White' ? soundMoveWhite.play() : soundMoveBlack.play()
    // updateStatus()
    // makeVisibleAndAddListeners(board, game, currentColorFigure);
    if (html.gameType == 'AI-Child') {
      updateStatusLabel()
    }
    
  }

  function updateStatus() {
    let status = ''
    let moveColor = 'White'

    if (game.turn() === 'b') moveColor = 'Black'

    if (game.in_checkmate()) {
      status = `${moveColor} is in checkmate`
      soundGameOverCheckMath.play()
      currentColorFigure = 'Game over'
      gameOverEffects('checkmate') 
      
    } else if (game.in_draw()) {
      status = 'Game over, drawn position'
      soundGameOverPat.play()
      currentColorFigure = 'Game over'
      gameOverEffects('drawn')
    } else {
      status = `${moveColor} to move`


      if (game.in_check()) {
        status = `${moveColor} is in check`
        soundCheck.play()
      }

      currentColorFigure = moveColor
      currentStatusLabel = status
    }
   // currentColorFigure === 'White' ? soundMoveWhite.play() : soundMoveBlack.play()
    updateStatusLabel(status)
    updateAvatars(status)

  }

  const config = {
    position: 'start',
    draggable: true,
    showNotation: true,
    dropOffBoard: 'snapback',
    orientation: colorBoardPlayer,
    pieceTheme: styleBoardTheme,
    onDragStart,
    onDrop,
    onSnapEnd,
    onChange,
  }

  board = Chessboard('myBoard', config)


//------------------- AI first move if play with White --------------------- 
  if (html.gameType.textContent.trim() != 'Player' && colorBoardPlayer == 'black') {
       setTimeout(() => {
      console.log('AI movie')
      makeRandomMove(board, game, currentStatusLabel)
      colorBoardPlayer = null
    }, 1250)
  }

  
  // console.log('Board orientation is: ' + board.orientation())

  // addHoverEffect(moveColor);
  // updateStatus();
}



function addHoverEffect(color) {
  document.querySelectorAll('.chessboard-63f37 img').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      const currentFigureColor = el.getAttribute('data-piece').charAt(0) === 'w' ? 'w' : 'b';
      el.style.cursor = color === 'White' && currentFigureColor === 'w' ? 'pointer' :
                        color === 'Black' && currentFigureColor === 'b' ? 'pointer' : 'not-allowed';
    });

    el.addEventListener('mouseleave', () => {
      el.style.cursor = 'default';
    });
  });
}


function makeRandomMove(board, game) {
  const possibleMoves = game.moves();

  if (possibleMoves.length === 0) {
    soundGameOverCheckMath.play();
    currentColorFigure = 'Game over';
    updateStatus(board, game); // game over
    return;
  }

  const randomIdx = Math.floor(Math.random() * possibleMoves.length);
  const move = game.move(possibleMoves[randomIdx]);
  board.position(game.fen());

  currentColorFigure = game.turn() === 'w' ? 'White' : 'Black';
  currentColorFigure === 'White' ? soundMoveWhite.play() : soundMoveBlack.play();
  
 //update status will make step
  updateStatus(board, game);
}


function updateStatus(board, game) {
  let status = '';
  let moveColor = game.turn() === 'w' ? 'White' : 'Black';
  if (game.in_checkmate()) {
    status = `${moveColor} is in checkmate`;
    soundGameOverCheckMath.play();
    currentColorFigure = 'Game over';
    gameOverEffects('checkmate');
    updateStatusLabel(status) 
  } else if (game.in_draw()) {
    status = 'Game over, drawn position';
    soundGameOverPat.play();
    currentColorFigure = 'Game over';
    gameOverEffects('drawn');
    updateStatusLabel(status) 
  } else {
    status = `${moveColor} to move`;
  
    if (game.in_check()) {
      status = `${moveColor} is in check`;
      updateStatusLabel(status) 
      soundCheck.play();
    }

    currentColorFigure = moveColor;
  }
  // updateStatusLabel(status)
}





// function makeRandomMove(board, game) {
//   currentStatusLabel = ''

  
//   const possibleMoves = game.moves();

//   if (possibleMoves.length === 0) {
//     soundGameOverCheckMath.play();
//     currentStatusLabel = `${currentColorFigure} is in checkmate`
//     updateStatusLabel(currentStatusLabel)
//     return;
//   }

//   const randomIdx = Math.floor(Math.random() * possibleMoves.length);
//   const move = game.move(possibleMoves[randomIdx]);
//   board.position(game.fen());

//   currentColorFigure = game.turn() === 'w' ? 'White' : 'Black';
//   currentColorFigure === 'White' ? soundMoveWhite.play() : soundMoveBlack.play();
//   currentStatusLabel = `${currentColorFigure} to move`



//   if (game.in_checkmate()) {
//     currentStatusLabel = `${currentColorFigure} is in checkmate`
//     soundGameOverCheckMath.play()
//     currentColorFigure = 'Game over'
//     gameOverEffects('checkmate') 
    
//   }
  
//   if (game.in_draw()) {
//     currentStatusLabel = 'Game over, drawn position'
//     soundGameOverPat.play()
//     currentColorFigure = 'Game over'
//     gameOverEffects('drawn')
//   }

// if (game.in_check()) {
//       currentStatusLabel = `${currentColorFigure} is in check`
//       soundCheck.play()
// }
//   console.log('currentStatus:'  ,currentStatusLabel);
  
//   updateStatusLabel(currentStatusLabel)
// }

 

export { gamePlay, currentColorFigure};



