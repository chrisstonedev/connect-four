import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OpponentService {
  constructor() {}

  makeMove(): number {
    throw new Error('Method not implemented.');
  }
}
