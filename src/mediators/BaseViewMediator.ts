import { injectable } from '@robotlegsjs/core';
import { ViewMediator } from '@robotlegsjs/phaser';
import { BaseView } from '../views';
import BaseMediatorsUtil from './BaseMediatorsUtil';

@injectable()
export class BaseViewMediator<T extends BaseView> extends ViewMediator<T> {
  protected baseMediatorsUtil: BaseMediatorsUtil;

  public initialize(): void {
    this.baseMediatorsUtil = new BaseMediatorsUtil(this);
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
}
