import { injectable } from '@robotlegsjs/core';
import { BaseSignal } from './BaseSignal';

@injectable()
export class GameStartupSignal extends BaseSignal {
  constructor() {
    super(Number);
  }
}
