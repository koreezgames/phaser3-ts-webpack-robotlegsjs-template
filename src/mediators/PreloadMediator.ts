import { injectable } from '@robotlegsjs/core';
import { Preload } from '../scenes/';
import { BaseSceneMediator } from './BaseSceneMediator';

@injectable()
export class PreloadMediator extends BaseSceneMediator<Preload> {}
