import { TestBed } from '@angular/core/testing';

import { CommonService } from './common.service';

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
    let gameBoard: ('P' | 'C' | '')[][] = [
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
    let gameBoard: ('P' | 'C' | '')[][] = [
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
    let gameBoard: ('P' | 'C' | '')[][] = [
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
    let gameBoard: ('P' | 'C' | '')[][] = [
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
