import {
  INinePatchFactory,
  INinePatchCreator,
} from '@koreez/phaser3-ninepatch';
export abstract class BaseScene extends Phaser.Scene {
  private static readonly consoleArgs: string[] = [
    ``,
    `background: ${'#295A34'}`,
    `background: ${'#2FAA4A'}`,
    `color: ${'#102415'}; background: ${'#27D04C'};`,
    `background: ${'#2FAA4A'}`,
    `background: ${'#295A34'}`,
  ];

  public add: INinePatchFactory;
  public make: INinePatchCreator;

  public onCreationCompleteCb: () => void;

  public init(): void {
    BaseScene.consoleArgs[0] = `%c %c %c ${this.sys.settings.key}: init %c %c `;
    console.log.apply(console, BaseScene.consoleArgs);
  }

  public create(): void {
    BaseScene.consoleArgs[0] = `%c %c %c ${
      this.sys.settings.key
    }: create %c %c `;
    console.log.apply(console, BaseScene.consoleArgs);
    this.handleCreationComplete();
  }

  public shutdown(): void {
    BaseScene.consoleArgs[0] = `%c %c %c ${
      this.sys.settings.key
    }: shutdown %c %c `;
    console.log.apply(console, BaseScene.consoleArgs);
  }

  private handleCreationComplete(): void {
    if (this.onCreationCompleteCb) {
      this.onCreationCompleteCb();
    } else {
      console.warn(
        `${this.scene.key} scenes onCreationCompleteCb is not initialized`,
      );
    }
  }
}
