import { injectable } from '@robotlegsjs/core';
import { BaseSignal } from './';

@injectable()
export class GameStartupSignal extends BaseSignal {
  constructor() {
    super(Number);
  }
}
