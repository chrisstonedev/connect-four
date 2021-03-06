import {Component} from '@angular/core';
import {GameBoard, GameCharacter} from './common.service';
import {GameOutcome, GameService} from './game.service';

type BoardElement = {
  Value: BoardElementValue;
  StyleClass: BoardElementStyleClass;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'connect-four';
  winner?: GameOutcome = undefined;
  options?: { startsFirst: StartsFirst } = undefined;
  boardUi: BoardElement[][] = [];
  arrayOfNumbersFromOneToColumnCount: number[] = [];

  constructor(private gameService: GameService) {
    this.drawBoard(this.gameService.gameBoard);
  }

  drawBoard(gameBoard: GameBoard) {
    let col: number;
    let row: number;

    if (this.arrayOfNumbersFromOneToColumnCount.length !== gameBoard.length) {
      this.arrayOfNumbersFromOneToColumnCount = Array.from(
        {length: gameBoard.length},
        (_, i) => i + 1
      );
    }

    this.boardUi = [];
    for (row = gameBoard[0].length - 1; row >= 0; row--) {
      let elementRow: BoardElement[] = [];
      for (col = 0; col < gameBoard.length; col++) {
        switch (gameBoard[col][row]) {
          case 'C':
            elementRow.push({Value: 'C', StyleClass: 'play-x-computer'});
            break;
          case 'P':
            elementRow.push({Value: 'P', StyleClass: 'play-x-player'});
            break;
          default:
            elementRow.push({Value: '_', StyleClass: 'play-x-blank'});
            break;
        }
      }
      this.boardUi.push(elementRow);
    }
  }

  noMoreRoomInColumn(column: number): boolean {
    let columnValues = this.gameService.gameBoard[column - 1];
    return columnValues[columnValues.length - 1].length > 0;
  }

  resetGame() {
    let whoStartsFirstElement: HTMLSelectElement = <HTMLSelectElement>(document.getElementById('starts-first'));
    let whoStartsFirstValue: string = whoStartsFirstElement.options[whoStartsFirstElement.options.selectedIndex].value;

    this.options = {
      startsFirst: this.determineWhoStartsFirst(whoStartsFirstValue),
    };

    this.winner = undefined;
    this.gameService.resetBoard();
    this.drawBoard(this.gameService.gameBoard);

    if (this.options.startsFirst === 'player') {
      return;
    }

    this.gameService.waitForOpponentToMakeMove();
    this.drawBoard(this.gameService.gameBoard);
  }

  userClicks(column: number) {
    this.gameService.userMakesMove(column);
    this.drawBoard(this.gameService.gameBoard);
    if (this.gameService.winner !== null) {
      this.winner = this.gameService.winner;
    }
  }

  private determineWhoStartsFirst(startsFirstString: string): StartsFirst {
    if (startsFirstString === 'player' || startsFirstString === 'opponent')
      return startsFirstString;
    return Math.floor(Math.random() * 2) === 1 ? 'player' : 'opponent';
  }
}

type BoardElementStyleClass =
  | 'play-x-blank'
  | 'play-x-computer'
  | 'play-x-player';
type BoardElementValue = GameCharacter | '_';
type StartsFirst = 'player' | 'opponent';
