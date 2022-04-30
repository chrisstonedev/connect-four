import { Injectable } from '@angular/core';
import { CommonService, GameBoard } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class OpponentService {
  constructor(private commonService: CommonService) { }

  makeMove(gameBoard: GameBoard): number {
    // Look for an opportunity to win.
    let i: number;
    for (i = 0; i < gameBoard.length; i++) {
      let testGameBoard = this.commonService.addToGameBoard(gameBoard, i, 'C');
      if (this.commonService.checkForWinner(testGameBoard, 'C')) {
        return i + 1;
      }
    }

    // Look for an opportunity to prevent the player from winning.
    for (i = 0; i < gameBoard.length; i++) {
      let testGameBoard = this.commonService.addToGameBoard(gameBoard, i, 'P');
      if (this.commonService.checkForWinner(testGameBoard, 'P')) {
        return i + 1;
      }
    }

    // Pick a random column.
    for (; ;) {
      const randomChoice = Math.floor(Math.random() * gameBoard.length) + 1;
      if (gameBoard[randomChoice - 1].includes('')) {
        return randomChoice;
      }
    }
  }
}
