# Neutralinojs_Chess_Master


### Created a project using:
+ NeutralinoJS 
+ JS / HTML / CSS
+ chess.js / chessboard.js  1.0.0
+ consultant assistance ChatGPT

# Game - Chess Master


## Playing the game
##### How to play? </br>
Select an interface from the menu:</br>
Color of the board, style or color of the pieces you want to play. </br>
Choose between game types:</br>
Player vs Player or Player vs AI with different intelligence level. </br>
Child: The bot makes random moves. </br>
Pro: The bot uses static evaluation of the position and chooses the best move. </br>
Master: The bot uses the Minimax algorithm with alpha-beta pruning to make strategic decisions.  </br>
Just Play! Enjoy!

```diff
- Unfortunately, the "Pro" and "Master" options will not be included for use due to the slow processing speed of the chess.js library. This limitation stems from the computational inefficiency of implementing the Minimax algorithm with alpha-beta truncation within the library. Specifically:
- The library lacks optimizations for quickly evaluating board positions, making even shallow depth searches (eg depth 2 or 3) unreasonably slow.
- The exponential growth of possible moves in chess leads to significant performance issues when trying to calculate strategic moves using Minimax.
- While alpha-beta truncation reduces the number of evaluated nodes, the lack of highly efficient evaluation functions and advanced heuristics in the library exacerbates the problem.

+ As a result, these modes will not provide a satisfying gameplay experience due to the long delays between moves.
! P.S. !
- It was even necessary to stop the clock that counts down the time in seconds to avoid lag and improve performance.
```


## Short video intro:
https://youtu.be/5U4_oiLSJss

## Screenshots:
![1](https://github.com/user-attachments/assets/e2597f93-e82b-4c58-aed8-2e1c4a1749d6)
![2](https://github.com/user-attachments/assets/eaa1870a-c8da-485c-a65c-177bf958371f)
![3](https://github.com/user-attachments/assets/f0d42c32-8e2e-4dc3-8141-2b921a41196a)



### Download
##### download file:
https://github.com/byAbaddon/Neutralinojs_Chess_Master/releases/tag/ChessMaster


### Prerequisites
- [Neutralinojs](https://neutralino.js.org)
- https://chessboardjs.com/
#### Year:
2025

### Developer
By Abaddon

<br>

