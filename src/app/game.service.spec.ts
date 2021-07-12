import { TestBed } from '@angular/core/testing';
import { GameBoard } from './common.service';
import { GameService } from './game.service';
import { OpponentService } from './opponent.service';

describe('GameService', () => {
  let service: GameService;
  let opponent: OpponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpponentService],
    });
    service = TestBed.inject(GameService);
    opponent = TestBed.inject(OpponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should place pieces appropriately when using different columns', () => {
    spyOn(opponent, 'makeMove').and.returnValue(2);

    service.userMakesMove(1);

    expect(opponent.makeMove).toHaveBeenCalled();
    expect(service.gameBoard).toEqual([
      ['P', '', '', '', '', ''],
      ['C', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
    ]);
  });

  it('should place pieces on top when using the same column', () => {
    spyOn(opponent, 'makeMove').and.returnValue(1);

    service.userMakesMove(1);

    expect(opponent.makeMove).toHaveBeenCalled();
    expect(service.gameBoard).toEqual([
      ['P', 'C', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
    ]);
  });

  it('should let the opponent win vertically', () => {
    spyOn(opponent, 'makeMove').and.returnValue(2);

    service.userMakesMove(1);
    service.userMakesMove(3);
    service.userMakesMove(4);

    expect(service.winner).toBeUndefined();

    service.userMakesMove(5);

    expect(service.winner).toEqual('The computer');
    expect(service.gameBoard).toEqual([
      ['P', '', '', '', '', ''],
      ['C', 'C', 'C', 'C', '', ''],
      ['P', '', '', '', '', ''],
      ['P', '', '', '', '', ''],
      ['P', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
    ]);
  });

  it('should let the user win horizontally', () => {
    spyOn(opponent, 'makeMove').and.returnValue(2);

    service.userMakesMove(3);
    service.userMakesMove(4);
    service.userMakesMove(5);

    expect(service.winner).toBeUndefined();

    service.userMakesMove(6);

    expect(service.winner).toEqual('The player');
    expect(service.gameBoard).toEqual([
      ['', '', '', '', '', ''],
      ['C', 'C', 'C', '', '', ''],
      ['P', '', '', '', '', ''],
      ['P', '', '', '', '', ''],
      ['P', '', '', '', '', ''],
      ['P', '', '', '', '', ''],
      ['', '', '', '', '', ''],
    ]);
  });

  it('should let the player win diagonally up', () => {
    let opponentChoice = 2;
    spyOn(opponent, 'makeMove').and.callFake((): number => {
      return opponentChoice;
    });
    service.userMakesMove(1);

    opponentChoice = 4;
    service.userMakesMove(3);

    opponentChoice = 3;
    service.userMakesMove(2);

    opponentChoice = 5;
    service.userMakesMove(4);

    opponentChoice = 4;
    service.userMakesMove(3);

    expect(service.winner).toBeUndefined();

    opponentChoice = 5;
    service.userMakesMove(4);

    expect(service.winner).toEqual('The player');

    //expect(service.winner).toEqual('player');
    expect(service.gameBoard).toEqual([
      ['P', '', '', '', '', ''],
      ['C', 'P', '', '', '', ''],
      ['P', 'C', 'P', '', '', ''],
      ['C', 'P', 'C', 'P', '', ''],
      ['C', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
    ]);
  });

  it('should let the computer win diagonally down', () => {
    let opponentChoice = 2;
    spyOn(opponent, 'makeMove').and.callFake((): number => {
      return opponentChoice;
    });
    service.userMakesMove(1);

    opponentChoice = 4;
    service.userMakesMove(3);

    opponentChoice = 1;
    service.userMakesMove(2);

    opponentChoice = 3;
    service.userMakesMove(1);

    opponentChoice = 2;
    service.userMakesMove(3);

    expect(service.winner).toBeUndefined();

    opponentChoice = 1;
    service.userMakesMove(2);

    expect(service.winner).toEqual('The computer');

    //expect(service.winner).toEqual('player');
    expect(service.gameBoard).toEqual([
      ['P', 'C', 'P', 'C', '', ''],
      ['C', 'P', 'C', 'P', '', ''],
      ['P', 'C', 'P', '', '', ''],
      ['C', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
    ]);
  });

  it('should return when no moves are remaining', () => {
    const gameBoard: GameBoard = [
      ['P', 'P', 'P', 'C', 'C', 'C'],
      ['C', 'C', 'C', 'P', 'P', 'P'],
      ['P', 'P', 'P', 'C', 'C', 'C'],
      ['C', 'C', 'C', 'P', 'P', 'P'],
      ['P', 'P', 'P', 'C', 'C', 'C'],
      ['C', 'C', 'C', 'P', 'P', 'P'],
      ['P', 'P', 'P', 'C', 'C', 'C'],
    ];

    expect(service.noMovesRemaining(gameBoard)).toBeTruthy();
  });

  it('should declare a stalemate when there are no moves remaining', () => {
    service.gameBoard = [
      ['P', 'P', 'P', 'C', 'C', 'C'],
      ['C', 'C', 'C', 'P', 'P', 'P'],
      ['P', 'P', 'P', 'C', 'C', 'C'],
      ['C', 'C', 'C', 'P', 'P', ''],
      ['P', 'P', 'P', 'C', 'C', 'C'],
      ['C', 'C', 'C', 'P', 'P', 'P'],
      ['P', 'P', 'P', 'C', 'C', 'C'],
    ];

    expect(service.noMovesRemaining(service.gameBoard)).toBeFalsy();

    service.userMakesMove(4);
    expect(service.noMovesRemaining(service.gameBoard)).toBeTruthy();
    expect(service.winner).toEqual('No one');
  });
});
