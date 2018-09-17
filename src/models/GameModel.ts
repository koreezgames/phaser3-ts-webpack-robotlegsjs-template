import { injectable } from '@robotlegsjs/core';
import { action, computed, observable } from 'mobx';

@injectable()
export class GameModel {
  @observable
  private _rotationDirection: number = 1;
  @observable
  private _width: number = 300;
  @observable
  private _height: number = 300;

  @computed
  public get rotationDirection(): number {
    return this._rotationDirection;
  }

  @computed
  public get width(): number {
    return this._width;
  }

  @computed
  public get height(): number {
    return this._height;
  }

  @action
  public changeRotationDirection(): void {
    this._rotationDirection = -this._rotationDirection;
  }

  @action
  public resize(width: number, height: number): void {
    this._width = width;
    this._height = height;
  }
}
