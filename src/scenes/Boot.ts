import { SceneKey } from '../constants/SceneKey';
import { BaseScene } from './BaseScene';

export class Boot extends BaseScene {
  public create(): void {
    super.create();
    this.scene.start(SceneKey.PRELOAD);
    this.scene.remove(this);
  }
}
