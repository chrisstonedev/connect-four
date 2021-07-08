import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
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

  constructor(
    private opponentService: OpponentService,
    private commonService: CommonService
  ) {}

  userMakesMove(userColumnNumber: number) {
    this.gameBoard = this.commonService.addToGameBoard(
      this.gameBoard,
      userColumnNumber - 1,
      'P'
    );
    const playerWins = this.commonService.checkForWinner(this.gameBoard, 'P');
    if (playerWins) {
      this.winner = 'player';
      return;
    }

    this.waitForOpponentToMakeMove();
  }

  waitForOpponentToMakeMove() {
    var opponentColumnNumber = this.opponentService.makeMove(this.gameBoard);
    this.gameBoard = this.commonService.addToGameBoard(
      this.gameBoard,
      opponentColumnNumber - 1,
      'C'
    );
    const computerWins = this.commonService.checkForWinner(this.gameBoard, 'C');
    if (computerWins) {
      this.winner = 'computer';
      return;
    }
  }

  resetBoard() {
    this.gameBoard = new Array(this.columnCount)
      .fill('')
      .map(() => new Array(this.rowCount).fill(''));
    this.winner = null;
  }
}
