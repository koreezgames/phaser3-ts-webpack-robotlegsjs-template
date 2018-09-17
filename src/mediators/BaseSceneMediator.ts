import { injectable } from '@robotlegsjs/core';
import { SceneMediator } from '@robotlegsjs/phaser';
import { autorun, IReactionDisposer } from 'mobx';
import { BaseScene } from '../scenes/BaseScene';

@injectable()
export class BaseSceneMediator<T extends BaseScene> extends SceneMediator<T> {
  private static readonly consoleArgs: string[] = [
    ``,
    `background: ${'#2A3351'}`,
    `background: ${'#364D98'}`,
    `color: ${'#F4F6FE'}; background: ${'#3656C1'};`,
    `background: ${'#364D98'}`,
    `background: ${'#2A3351'}`,
  ];

  private static readonly updateConsoleArgs: string[] = [
    ``,
    `background: ${'#702420'}`,
    `background: ${'#D81C12'}`,
    `color: ${'#FFF4F3'}; background: ${'#FF0D00'};`,
    `background: ${'#D81C12'}`,
    `background: ${'#702420'}`,
  ];

  protected autorunDisposer: IReactionDisposer;

  public initialize(): void {
    BaseSceneMediator.consoleArgs[0] = `%c %c %c ${
      this.constructor.name
    }: initialize %c %c `;
    console.log.apply(console, BaseSceneMediator.consoleArgs);
    this.scene.onCreationCompleteCb = this.sceneCreated.bind(this);
  }

  public destroy(): void {
    this.autorunDisposer();
    BaseSceneMediator.consoleArgs[0] = `%c %c %c ${
      this.constructor.name
    }: destroy %c %c `;
    console.log.apply(console, BaseSceneMediator.consoleArgs);
  }

  protected sceneCreated(): void {
    this.autorunDisposer = autorun(this.update.bind(this));
  }

  protected update(_arguments: any): void {
    if (_arguments[0]) {
      const observing: any[] = _arguments[0].observing as any[];
      const props: string[] = [];
      observing.forEach((obj: any) => {
        const { name, value }: { name: string; value: any } = obj;
        props.push(`${name} => ${value}`);
      });
      BaseSceneMediator.updateConsoleArgs[0] = `%c %c %c ${
        this.constructor.name
      }: update [ ${props.join(' | ')} ] %c %c `;
      console.log.apply(console, BaseSceneMediator.updateConsoleArgs);
    }
  }
}
