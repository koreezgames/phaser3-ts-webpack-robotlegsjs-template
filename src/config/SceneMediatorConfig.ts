import { IConfig, inject, injectable } from '@robotlegsjs/core';
import { ISceneMediatorMap } from '@robotlegsjs/phaser';
import { BootMediator } from '../mediators/BootMediator';
import { MainMediator } from '../mediators/MainMediator';
import { PreloadMediator } from '../mediators/PreloadMediator';
import Boot from '../scenes/Boot';
import Main from '../scenes/Main';
import Preload from '../scenes/Preload';

@injectable()
export class SceneMediatorConfig implements IConfig {
  @inject(ISceneMediatorMap)
  public sceneMediatorMap: ISceneMediatorMap;

  public configure(): void {
    this.mapStateMediators();
  }

  private mapStateMediators(): void {
    this.sceneMediatorMap.map(Boot).toMediator(BootMediator);
    this.sceneMediatorMap.map(Preload).toMediator(PreloadMediator);
    this.sceneMediatorMap.map(Main).toMediator(MainMediator);
    // this.sceneMediatorMap.map(GameTitle).toMediator(GameTitleMediator);
    // this.sceneMediatorMap.map(Main).toMediator(MainMediator);
    // this.sceneMediatorMap.map(GameOver).toMediator(GameOverMediator);
  }
}
