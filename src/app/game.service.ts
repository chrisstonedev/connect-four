import { Injectable } from '@angular/core';
import { CommonService, GameBoard, GameCharacter } from './common.service';
import { OpponentService } from './opponent.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  columnCount = 7;
  rowCount = 6;
  gameBoard: GameBoard = new Array(this.columnCount)
    .fill('')
    .map(() => new Array(this.rowCount).fill(''));
  winner?: GameOutcome = undefined;

  constructor(
    private opponentService: OpponentService,
    private commonService: CommonService
  ) { }

  checkForGameEndingCondition(
    character: GameCharacter,
    winner: GameWinner
  ): boolean {
    if (this.commonService.checkForWinner(this.gameBoard, character)) {
      this.winner = winner;
      return true;
    } else if (this.noMovesRemaining(this.gameBoard)) {
      this.winner = 'No one';
      return true;
    }
    return false;
  }

  noMovesRemaining(gameBoard: GameBoard) {
    let i: number;
    for (i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i][gameBoard[i].length - 1] === '') return false;
    }
    return true;
  }

  resetBoard() {
    this.gameBoard = new Array(this.columnCount)
      .fill('')
      .map(() => new Array(this.rowCount).fill(''));
    this.winner = undefined;
  }

  userMakesMove(userColumnNumber: number) {
    this.gameBoard = this.commonService.addToGameBoard(
      this.gameBoard,
      userColumnNumber - 1,
      'P'
    );
    if (this.checkForGameEndingCondition('P', 'The player')) {
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
    if (this.checkForGameEndingCondition('C', 'The computer')) {
      return;
    }
  }
}

export type GameOutcome = GameWinner | 'No one';
export type GameWinner = 'The player' | 'The computer';
