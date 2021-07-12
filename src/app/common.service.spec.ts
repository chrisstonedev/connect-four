import { TestBed } from '@angular/core/testing';
import { CommonService, GameBoard } from './common.service';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should consider it a win with a vertical arrangement in bottom-left corner', () => {
    const gameBoard: GameBoard = [
      ['P', 'P', 'P', 'P', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
    ];
    const win = service.checkForWinner(gameBoard, 'P');
    expect(win).toBeTruthy();
  });

  it('should consider it a win with a vertical arrangement in top-left corner', () => {
    const gameBoard: GameBoard = [
      ['C', 'C', 'P', 'P', 'P', 'P'],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
    ];
    const win = service.checkForWinner(gameBoard, 'P');
    expect(win).toBeTruthy();
  });

  it('should consider it a win with a vertical arrangement in bottom-right corner', () => {
    const gameBoard: GameBoard = [
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['P', 'P', 'P', 'P', '', ''],
    ];
    const win = service.checkForWinner(gameBoard, 'P');
    expect(win).toBeTruthy();
  });

  it('should consider it a win with a vertical arrangement in top-right corner', () => {
    const gameBoard: GameBoard = [
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['C', 'C', 'P', 'P', 'P', 'P'],
    ];
    const win = service.checkForWinner(gameBoard, 'P');
    expect(win).toBeTruthy();
  });
});
