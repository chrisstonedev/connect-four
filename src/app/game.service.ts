import { Injectable } from '@angular/core';
import { OpponentService } from './opponent.service';

const columnCount = 7;
const rowCount = 6;

@Injectable({
  providedIn: 'root',
})
export class GameService {
  gameBoard: ('P' | 'C' | '')[][] = new Array(columnCount)
    .fill('')
    .map(() => new Array(rowCount).fill(''));
  winner: 'player' | 'computer' | null = null;

  constructor(private opponentService: OpponentService) {}

  userMakesMove(userColumnNumber: number) {
    this.addToGameBoard(userColumnNumber - 1, 'P');
    const playerWins = this.checkForWinner('P');
    if (playerWins) {
      this.winner = 'player';
      return;
    }
    var opponentColumnNumber = this.opponentService.makeMove();
    this.addToGameBoard(opponentColumnNumber - 1, 'C');
    const computerWins = this.checkForWinner('C');
    if (computerWins) {
      this.winner = 'computer';
      return;
    }
  }

  addToGameBoard(columnIndex: number, character: 'P' | 'C') {
    let i: number;
    for (i = 0; i < rowCount; i++) {
      if (this.gameBoard[columnIndex][i].length === 0) {
        this.gameBoard[columnIndex][i] = character;
        return;
      }
    }
  }

  checkForWinner(character: 'P' | 'C'): boolean {
    let column: number;
    let row: number;

    // Check vertically.
    for (column = 0; column < columnCount; column++) {
      let count: number = 0;
      for (row = 0; row < rowCount; row++) {
        if (this.gameBoard[column][row] === character) {
          count++;
        } else {
          count = 0;
        }
        if (count === 4) {
          return true;
        }
      }
    }

    // Check horizontally.
    for (row = 0; row < rowCount; row++) {
      let count: number = 0;
      for (column = 0; column < columnCount; column++) {
        if (this.gameBoard[column][row] === character) {
          count++;
        } else {
          count = 0;
        }
        if (count === 4) {
          return true;
        }
      }
    }

    // Check diagonally.
    let diagonalShift: number;

    let coordinates = this.getCoordinates('down');
    let index: number;
    for (index = 0; index < coordinates.length; index++) {
      let count: number = 0;
      for (diagonalShift = 0; ; diagonalShift++) {
        if (
          this.gameBoard[coordinates[index].column + diagonalShift] ===
            undefined ||
          this.gameBoard[coordinates[index].column + diagonalShift][
            coordinates[index].row - diagonalShift
          ] === undefined
        ) {
          break;
        } else if (
          this.gameBoard[coordinates[index].column + diagonalShift][
            coordinates[index].row - diagonalShift
          ] === character
        ) {
          count++;
        } else {
          count = 0;
        }
        if (count === 4) {
          return true;
        }
      }
    }

    coordinates = this.getCoordinates('up');
    for (index = 0; index < coordinates.length; index++) {
      let count: number = 0;
      for (diagonalShift = 0; ; diagonalShift++) {
        if (
          this.gameBoard[coordinates[index].column + diagonalShift] ===
            undefined ||
          this.gameBoard[coordinates[index].column + diagonalShift][
            coordinates[index].row + diagonalShift
          ] === undefined
        ) {
          break;
        } else if (
          this.gameBoard[coordinates[index].column + diagonalShift][
            coordinates[index].row + diagonalShift
          ] === character
        ) {
          count++;
        } else {
          count = 0;
        }
        if (count === 4) {
          return true;
        }
      }
    }

    return false;
  }

  getCoordinates(direction: 'down' | 'up'): Coordinate[] {
    let array: Coordinate[] = [];
    let i: number;
    if (direction == 'down') {
      for (i = 3; i < rowCount; i++) {
        array.push({ column: 0, row: i });
      }
      for (i = 1; i < columnCount - 3; i++) {
        array.push({ column: i, row: rowCount - 1 });
      }
    } else {
      for (i = rowCount - 4; i >= 0; i--) {
        array.push({ column: 0, row: i });
      }
      for (i = 1; i < columnCount - 3; i++) {
        array.push({ column: i, row: 0 });
      }
    }
    return array;
  }
}
type Coordinate = {
  column: number;
  row: number;
};
