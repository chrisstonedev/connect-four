import { TestBed } from '@angular/core/testing';
import { GameBoard } from './common.service';
import { OpponentService } from './opponent.service';

describe('OpponentService', () => {
  let service: OpponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should pick an empty column', () => {
    const gameBoard: GameBoard = [
      ['P', 'C', 'P', 'C', 'P', 'C'],
      ['C', 'P', 'C', 'P', 'C', 'P'],
      ['P', 'C', 'P', 'C', 'P', 'C'],
      ['', '', '', '', '', ''],
      ['P', 'C', 'P', 'C', 'P', 'C'],
      ['C', 'P', 'C', 'P', 'C', 'P'],
      ['P', 'C', 'P', 'C', 'P', 'C'],
    ];
    let i: number;
    for (i = 0; i < 10; i++) {
      const move = service.makeMove(gameBoard);
      expect(move).toEqual(4);
    }
  });

  it('should aim to prevent the player from winning', () => {
    const gameBoard: GameBoard = [
      ['', '', '', '', '', ''],
      ['C', '', '', '', '', ''],
      ['P', 'P', 'P', '', '', ''],
      ['C', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
    ];
    let i: number;
    for (i = 0; i < 10; i++) {
      const move = service.makeMove(gameBoard);
      expect(move).toEqual(3);
    }
  });

  it('should prioritize winning over blocking player', () => {
    const gameBoard: GameBoard = [
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['P', 'P', 'P', '', '', ''],
      ['C', '', '', '', '', ''],
      ['C', '', '', '', '', ''],
      ['C', '', '', '', '', ''],
      ['', '', '', '', '', ''],
    ];
    let i: number;
    for (i = 0; i < 10; i++) {
      const move = service.makeMove(gameBoard);
      expect(move).toEqual(7);
    }
  });
});
