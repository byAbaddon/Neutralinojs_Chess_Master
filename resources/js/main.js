// Intro script  main.js
import { menuSection} from './scripts/menu.js'

//-------------------------------------------- working functions ---------------------------------
const sectionIntro = document.querySelector('.intro')
const btnMenu = document.querySelector('.btn-menu')

const sectionMenu = document.querySelector('.menu')

// ------------ Sounds
const soundComplete = document.getElementById('soundComplete')

 
//start section
btnMenu.addEventListener('click', () => {

  soundComplete.play()
  sectionIntro.style.display = 'none'
  document.body.style.background = "url('./icons/background.png') no-repeat center center"
  document.body.style.backgroundSize = "cover"
  // document.body.style.background = "none";

  sectionMenu.style.display = 'block'
  // call menu section 
  menuSection()
})



