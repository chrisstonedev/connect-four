import { TestBed } from '@angular/core/testing';

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
    const gameBoard: ('P' | 'C' | '')[][] = [
      ['P', 'P', 'P', 'P', 'P', 'P'],
      ['P', 'P', 'P', 'P', 'P', 'P'],
      ['P', 'P', 'P', 'P', 'P', 'P'],
      ['', '', '', '', '', ''],
      ['P', 'P', 'P', 'P', 'P', 'P'],
      ['P', 'P', 'P', 'P', 'P', 'P'],
      ['P', 'P', 'P', 'P', 'P', 'P'],
    ];
    let i: number;
    for (i = 0; i < 10; i++) {
      const move = service.makeMove(gameBoard);
      expect(move).toEqual(4);
    }
  });
});
