import { Component } from '@angular/core';
import { GameService } from './game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'connect-four';
  boardText: string = '';
  winner: string | null = null;
  options: { startsFirst: 'player' | 'opponent' | 'random' } | null = null;

  constructor(private gameService: GameService) {
    this.drawBoard(this.gameService.gameBoard);
  }

  drawBoard(gameBoard: ('' | 'P' | 'C')[][]) {
    let col: number;
    let row: number;
    let ui: string = '';

    let firstColumn = gameBoard[0];
    let topLeft = gameBoard[0][5];

    for (row = gameBoard[0].length - 1; row >= 0; row--) {
      if (ui.length > 0) ui += '\n';
      for (col = 0; col < gameBoard.length; col++) {
        let character: string = gameBoard[col][row];
        if (character.length === 0) character = ' ';
        ui += '(' + character + ')';
      }
    }
    this.boardText = ui;
  }

  userClicks(column: number) {
    this.gameService.userMakesMove(column);
    this.drawBoard(this.gameService.gameBoard);
    if (this.gameService.winner !== null) {
      this.winner = this.gameService.winner;
    }
  }

  resetGame() {
    let select1: HTMLSelectElement = <HTMLSelectElement>(
      document.getElementById('starts-first')
    );
    let startsFirst: 'player' | 'random' | 'opponent';
    let startsFirstString: string =
      select1.options[select1.options.selectedIndex].value;
    if (startsFirstString === 'player' || startsFirstString === 'opponent')
      startsFirst = startsFirstString;
    else startsFirst = 'random';

    this.options = {
      startsFirst: startsFirst,
    };

    this.winner = null;
    this.gameService.resetBoard();
    this.drawBoard(this.gameService.gameBoard);

    if (this.options.startsFirst === 'player') {
      return;
    }

    if (this.options.startsFirst === 'random') {
      if (Math.floor(Math.random() * 2) === 1) return;
    }

    this.gameService.waitForOpponentToMakeMove();
    this.drawBoard(this.gameService.gameBoard);
  }

  noMoreRoomInColumn(column: number): boolean {
    let columnValues = this.gameService.gameBoard[column - 1];
    return columnValues[columnValues.length - 1].length > 0;
  }
}
