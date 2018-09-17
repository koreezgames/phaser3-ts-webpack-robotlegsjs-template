import { injectable } from '@robotlegsjs/core';
import Boot from '../scenes/Boot';
import { BaseSceneMediator } from './BaseSceneMediator';

@injectable()
export class BootMediator extends BaseSceneMediator<Boot> {}
