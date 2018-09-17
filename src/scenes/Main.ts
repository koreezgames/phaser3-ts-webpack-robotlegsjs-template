import { NinePatch } from '@koreez/phaser3-ninepatch';
import { gameConfig } from '../constants/GameConfig';
import { BaseScene } from './BaseScene';
import { Atlases, Images } from '../assets';

export default class Main extends BaseScene {
  private ninePatch: NinePatch;
  private direction: number = 1;

  public create(): void {
    this.add.image(
      gameConfig.width * 0.5,
      gameConfig.height * 0.5,
      Atlases.Main.Atlas.Name,
      Atlases.Main.Atlas.Frames.Bg,
    );

    this.ninePatch = this.add.ninePatch(
      gameConfig.width * 0.5,
      gameConfig.height * 0.5,
      300,
      300,
      Images.SquareGreen.Name,
      null,
      {
        bottom: 14, // Amount of pixels for bottom
        left: 6, // Amount of pixels for left
        right: 6, // Amount of pixels for right
        top: 10, // Amount of pixels for top
      },
    );

    super.create();
  }

  public update(): void {
    this.ninePatch.angle += this.direction;
  }

  public redraw(width: number, height: number, direction: number): void {
    this.direction = direction;
    this.ninePatch.resize(width, height);
  }
}
