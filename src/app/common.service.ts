import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  checkForWinner(gameBoard: GameBoard, character: GameCharacter): boolean {
    let column: number;
    let row: number;
    let columnCount = gameBoard.length;
    let rowCount = gameBoard[0].length;

    for (column = 0; column < columnCount; column++) {
      for (row = 0; row < rowCount; row++) {
        if (gameBoard[column][row] !== character) {
          continue;
        }

        if (row < rowCount - 3) {
          // Check vertically.
          if (
            gameBoard[column][row + 1] === character &&
            gameBoard[column][row + 2] === character &&
            gameBoard[column][row + 3] === character
          ) {
            return true;
          }

          // Check diagonally (up).
          if (
            column < columnCount - 3 &&
            gameBoard[column + 1][row + 1] === character &&
            gameBoard[column + 2][row + 2] === character &&
            gameBoard[column + 3][row + 3] === character
          ) {
            return true;
          }
        }

        if (column < columnCount - 3) {
          // Check horizontally.
          if (
            gameBoard[column + 1][row] === character &&
            gameBoard[column + 2][row] === character &&
            gameBoard[column + 3][row] === character
          ) {
            return true;
          }

          // Check diagonally (down).
          if (
            row >= 3 &&
            gameBoard[column + 1][row - 1] === character &&
            gameBoard[column + 2][row - 2] === character &&
            gameBoard[column + 3][row - 3] === character
          ) {
            return true;
          }
        }
      }
    }

    return false;
  }

  addToGameBoard(
    gameBoard: GameBoard,
    columnIndex: number,
    character: GameCharacter
  ): GameBoard {
    let i: number;
    let newGameBoard = JSON.parse(JSON.stringify(gameBoard));
    for (i = 0; i < newGameBoard[columnIndex].length; i++) {
      if (newGameBoard[columnIndex][i].length === 0) {
        newGameBoard[columnIndex][i] = character;
        return newGameBoard;
      }
    }
    return newGameBoard;
  }
}

export type GameCharacter = 'P' | 'C';
export type GameBoard = (GameCharacter | '')[][];
