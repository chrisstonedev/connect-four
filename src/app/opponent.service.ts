import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OpponentService {
  constructor() {}

  makeMove(gameBoard: ('P' | 'C' | '')[][]): number {
    for (;;) {
      const randomChoice = Math.floor(Math.random() * gameBoard.length) + 1;
      if (gameBoard[randomChoice - 1].includes('')) {
        return randomChoice;
      }
    }
  }
}
