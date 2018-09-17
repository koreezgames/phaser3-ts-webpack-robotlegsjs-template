import { SceneKey } from '../constants/SceneKey';
import { BaseScene } from './BaseScene';
import { Atlases, Images } from '../assets';
import { loadAtlases, loadImages } from '../assetLoader';

export default class Preload extends BaseScene {
  public preload(): void {
    loadAtlases(this, Atlases.Main.Atlas);
    loadImages(this, Images);
  }

  public create(): void {
    super.create();
    this.scene.start(SceneKey.MAIN);
    this.scene.remove(this);
  }
}
