// import { useEffect, useState } from "react";
// import Square from "./Square";
// import { Patterns } from "../components/WinPatterns";

// function Board({ result, setResult }) {

//   //

//   useEffect(() => {
//     checkWin();
//     checkTie();
//   }, [board]);

//   const chooseSquare = async (square) => {
//     if (turn === player && board[square] === "") {
//       setTurn(player === "X" ? "O" : "X");

//       // await channel.sendEvent({
//       //   type: "game-move",
//       //   data: { square, player },
//       // });

//       // setBoard(
//       //   board.map((val, idx) => {
//       //     if (idx === square && val === "") {
//       //       return player;
//       //     } else return val;
//       //   })
//       // );
//     }
//   };

//   // check win cases ----------------------------------------------------------------
//   const checkWin = () => {
//     // Patterns.forEach((currPattern) => {
//     //   const firstPlayer = board[currPattern[0]];
//     //   if (firstPlayer === "") return;
//     //   let foundWinPattern = true;
//     //   currPattern.forEach((idx) => {
//     //     if (board[idx] !== firstPlayer) {
//     //       foundWinPattern = false;
//     //     }
//     //   });
//     //   if (foundWinPattern) {
//     //     alert(`${board[currPattern[0]]} wins the game`);
//     //     setResult({ winner: board[currPattern[0]], state: "won" });
//     //   }
//     // });
//   };

//   // check tie case -----------------------------------------------------------------
//   const checkTie = () => {
//     // let filled = true;
//     // board.forEach((square) => {
//     //   if (square == "") {
//     //     filled = false;
//     //   }
//     // });
//     // if (filled) {
//     //   alert("Game tied");
//     //   setResult({ winner: "none", state: "Tie" });
//     // }
//   };

//   // channel.on((e) => {
//   //   if (e.type === "game-move" && e.user.id !== client.userID) {
//   //     const currentPlayer = e.data.player === "X" ? "O" : "X";
//   //     setTurn(currentPlayer);
//   //     setPlayer(currentPlayer);

//   //     setBoard(
//   //       board.map((val, idx) => {
//   //         if (idx === e.data.square && val === "") {
//   //           return e.data.player;
//   //         } else return val;
//   //       })
//   //     );
//   //   }
//   // });

//   return (
//     <div className="board">
//       <div className="row">
//         <Square val={board[0]} chooseSquare={() => chooseSquare(0)} />
//         <Square val={board[1]} chooseSquare={() => chooseSquare(1)} />
//         <Square val={board[2]} chooseSquare={() => chooseSquare(2)} />
//       </div>
//       <div className="row">
//         <Square val={board[3]} chooseSquare={() => chooseSquare(3)} />
//         <Square val={board[4]} chooseSquare={() => chooseSquare(4)} />
//         <Square val={board[5]} chooseSquare={() => chooseSquare(5)} />
//       </div>
//       <div className="row">
//         <Square val={board[6]} chooseSquare={() => chooseSquare(6)} />
//         <Square val={board[7]} chooseSquare={() => chooseSquare(7)} />
//         <Square val={board[8]} chooseSquare={() => chooseSquare(8)} />
//       </div>
//     </div>
//   );
// }

// export default Board;
