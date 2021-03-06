import { injectable } from '@robotlegsjs/core';
import { SceneMediator } from '@robotlegsjs/phaser';
import { BaseScene } from '../scenes/BaseScene';
import BaseMediatorsUtil from './BaseMediatorsUtil';

@injectable()
export class BaseSceneMediator<T extends BaseScene> extends SceneMediator<T> {
  protected baseMediatorsUtil: BaseMediatorsUtil;

  public initialize(): void {
    this.baseMediatorsUtil = new BaseMediatorsUtil(this);
    this.scene.onCreationCompleteCb = this.sceneCreated.bind(this);
  }

  public destroy(): void {
    this.baseMediatorsUtil.destroy();
    this.baseMediatorsUtil = null;
  }

  protected addReaction(
    reaction: (...args: any[]) => void,
    debug: boolean = false,
  ): this {
    this.baseMediatorsUtil.addReaction(reaction, debug);
    return this;
  }

  protected removeReaction(reaction: (...args: any[]) => void): this {
    this.baseMediatorsUtil.removeReaction(reaction);
    return this;
  }

  protected sceneCreated(): void {
    // ...
  }
}
