import { Injectable } from '@angular/core';
import { OpponentService } from './opponent.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  columnCount = 7;
  rowCount = 6;
  gameBoard: ('P' | 'C' | '')[][] = new Array(this.columnCount)
    .fill('')
    .map(() => new Array(this.rowCount).fill(''));
  winner: 'player' | 'computer' | null = null;

  constructor(private opponentService: OpponentService) {}

  userMakesMove(userColumnNumber: number) {
    this.addToGameBoard(userColumnNumber - 1, 'P');
    const playerWins = this.checkForWinner('P');
    if (playerWins) {
      this.winner = 'player';
      return;
    }
    this.waitForOpponentToMakeMove();
  }

  waitForOpponentToMakeMove() {
    var opponentColumnNumber = this.opponentService.makeMove(this.gameBoard);
    this.addToGameBoard(opponentColumnNumber - 1, 'C');
    const computerWins = this.checkForWinner('C');
    if (computerWins) {
      this.winner = 'computer';
      return;
    }
  }

  addToGameBoard(columnIndex: number, character: 'P' | 'C') {
    let i: number;
    for (i = 0; i < this.rowCount; i++) {
      if (this.gameBoard[columnIndex][i].length === 0) {
        this.gameBoard[columnIndex][i] = character;
        return;
      }
    }
  }

  checkForWinner(character: 'P' | 'C'): boolean {
    let column: number;
    let row: number;

    for (column = 0; column < this.columnCount; column++) {
      for (row = 0; row < this.rowCount; row++) {
        if (this.gameBoard[column][row] !== character) {
          continue;
        }

        if (row < this.rowCount - 3) {
          // Check vertically.
          if (
            this.gameBoard[column][row + 1] === character &&
            this.gameBoard[column][row + 2] === character &&
            this.gameBoard[column][row + 3] === character
          ) {
            return true;
          }

          // Check diagonally (up).
          if (
            column < this.columnCount - 3 &&
            this.gameBoard[column + 1][row + 1] === character &&
            this.gameBoard[column + 2][row + 2] === character &&
            this.gameBoard[column + 3][row + 3] === character
          ) {
            return true;
          }
        }

        if (column < this.columnCount - 3) {
          // Check horizontally.
          if (
            this.gameBoard[column + 1][row] === character &&
            this.gameBoard[column + 2][row] === character &&
            this.gameBoard[column + 3][row] === character
          ) {
            return true;
          }

          // Check diagonally (down).
          if (
            row >= 3 &&
            this.gameBoard[column + 1][row - 1] === character &&
            this.gameBoard[column + 2][row - 2] === character &&
            this.gameBoard[column + 3][row - 3] === character
          ) {
            return true;
          }
        }
      }
    }

    return false;
  }

  resetBoard() {
    this.gameBoard = new Array(this.columnCount)
      .fill('')
      .map(() => new Array(this.rowCount).fill(''));
    this.winner = null;
  }
}
