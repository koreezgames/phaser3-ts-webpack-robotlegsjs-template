import { inject, injectable } from '@robotlegsjs/core';
import { GameStartupSignal } from '../events/GameStartupSignal';
import { GameModel } from '../models/GameModel';
import Main from '../scenes/Main';
import { BaseSceneMediator } from './BaseSceneMediator';

@injectable()
export class MainMediator extends BaseSceneMediator<Main> {
  @inject(GameModel)
  public gameModel: GameModel;
  @inject(GameStartupSignal)
  public gameStartupSignal: GameStartupSignal;

  public initialize(): void {
    super.initialize();
    this.gameStartupSignal.dispatch(Phaser.Math.Between(1000, 5000));
  }

  protected update(): void {
    super.update(arguments);
    this.scene.redraw(
      this.gameModel.width,
      this.gameModel.height,
      this.gameModel.rotationDirection,
    );
  }
}
