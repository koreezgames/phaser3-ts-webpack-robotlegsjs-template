import { injectable } from '@robotlegsjs/core';
import { getCircularReplacer } from '../utils/utils';
import { Signal } from '@robotlegsjs/signals';

@injectable()
export class BaseSignal extends Signal {
  private static readonly dispatchConsoleArgs: string[] = [
    ``,
    `background: ${'#757130'}`,
    `background: ${'#DED434'}`,
    `color: ${'#2F2E15'}; background: ${'#FFF325'};`,
    `background: ${'#DED434'}`,
    `background: ${'#757130'}`,
  ];

  public dispatch(...valueObjects: any[]): void {
    let str: string = '';
    valueObjects.forEach((valueObject: any, index: number) => {
      str += `${this.valueClasses[index].name}:'${JSON.stringify(
        valueObject,
        getCircularReplacer(),
      )}'`;
      str += valueObjects.length - 1 === index ? '' : ' | ';
    });
    BaseSignal.dispatchConsoleArgs[0] = `%c %c %c ${
      this.constructor.name
    }: dispatch [ ${str} ] %c %c `;
    console.log.apply(console, BaseSignal.dispatchConsoleArgs);
    super.dispatch(...valueObjects);
  }
}
