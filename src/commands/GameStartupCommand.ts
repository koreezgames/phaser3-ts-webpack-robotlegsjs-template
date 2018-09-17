import { inject, injectable } from '@robotlegsjs/core';
import { GameModel } from '../models/GameModel';
import { BaseAsyncCommand } from './BaseAsyncCommand';
import { BaseSequenceMacro } from './BaseSequenceMacro';

@injectable()
export class GameStartupCommand extends BaseSequenceMacro {
  @inject(GameModel)
  public gameModel: GameModel;

  public prepare(): void {
    // this.atomic = false;
    this.add(GameStartupSubCommand);
  }

  protected dispatchComplete(success: boolean): void {
    this.gameModel.changeRotationDirection();
    this.gameModel.resize(this.gameModel.width / 2, this.gameModel.height / 2);
    super.dispatchComplete(success);
  }
}

@injectable()
// tslint:disable-next-line
export class GameStartupSubCommand extends BaseAsyncCommand {
  @inject(Number)
  protected _delay: number;

  public execute(): void {
    super.execute();
    setTimeout(this.onTimeout.bind(this), this._delay);
  }

  protected onTimeout(): void {
    this.dispatchComplete(true);
  }
}
