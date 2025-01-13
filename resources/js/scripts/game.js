import { gamePlay } from './gameStart.js'
import { setStartTimer } from './labelsManagement.js'

const html = {
 gameType : document.querySelector('.gameType span:nth-of-type(2)'),
}
const games = { 1: 'Player', 2: 'AI-Child', 3: 'AI-Pro', 4: 'AI-Master' }

function gameSection(gameType, colorBoardPlayer, styleBoardTheme) {
  html.gameType.textContent = games[gameType]

  gamePlay(colorBoardPlayer, styleBoardTheme)
  // get time now
  setTimeout(() => setStartTimer(), 1000)
}



export {gameSection}