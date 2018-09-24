import { inject, injectable } from '@robotlegsjs/core';
import { GameModel } from '../models/GameModel';
import { BaseSceneMediator } from './BaseSceneMediator';
import { Main } from '../scenes';
import { GameStartupSignal } from '../signals';

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

  // override
  protected sceneCreated(): void {
    this.addReaction(this.update);
  }

  protected update(): void {
    this.scene.redraw(
      this.gameModel.width,
      this.gameModel.height,
      this.gameModel.rotationDirection,
    );
  }
}
