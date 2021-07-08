import { Component } from '@angular/core';
import { GameService } from './game.service';

type BoardElement = {
  Value: 'P' | 'C' | '_';
  StyleClass: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'connect-four';
  winner: string | null = null;
  options: { startsFirst: 'player' | 'opponent' | 'random' } | null = null;
  boardUi: BoardElement[][] = [];
  arrayOfNumbersFromOneToColumnCount: number[] = [];

  constructor(private gameService: GameService) {
    this.drawBoard(this.gameService.gameBoard);
  }

  drawBoard(gameBoard: ('' | 'P' | 'C')[][]) {
    let col: number;
    let row: number;

    if (this.arrayOfNumbersFromOneToColumnCount.length !== gameBoard.length) {
      this.arrayOfNumbersFromOneToColumnCount = Array.from(
        { length: gameBoard.length },
        (_, i) => i + 1
      );
    }

    this.boardUi = [];
    for (row = gameBoard[0].length - 1; row >= 0; row--) {
      //if (ui.length > 0) ui += '\n';
      let elementRow: BoardElement[] = [];
      for (col = 0; col < gameBoard.length; col++) {
        switch (gameBoard[col][row]) {
          case 'C':
            elementRow.push({ Value: 'C', StyleClass: 'play-x-computer' });
            break;
          case 'P':
            elementRow.push({ Value: 'P', StyleClass: 'play-x-player' });
            break;
          default:
            elementRow.push({ Value: '_', StyleClass: 'play-x-blank' });
            break;
        }
      }
      this.boardUi.push(elementRow);
    }
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
