import { injectable } from '@robotlegsjs/core';
import { SequenceMacro } from '../../node_modules/@robotlegsjs/macrobot';

@injectable()
export abstract class BaseSequenceMacro extends SequenceMacro {
  private static readonly consoleArgs: string[] = [
    ``,
    `background: ${'#2A0020'}`,
    `background: ${'#7A005C'}`,
    `color: ${'#FEF2FB'}; background: ${'#9C0075'};`,
    `background: ${'#7A005C'}`,
    `background: ${'#2A0020'}`,
  ];

  public execute(payload?: any, ...payloads: any[]): void {
    BaseSequenceMacro.consoleArgs[0] = `%c %c %c ${
      this.constructor.name
    }: execute %c %c `;
    console.log.apply(console, BaseSequenceMacro.consoleArgs);
    super.execute(payload, ...payloads);
  }

  protected dispatchComplete(success: boolean): void {
    BaseSequenceMacro.consoleArgs[0] = `%c %c %c ${
      this.constructor.name
    }: execute: complete [${success}] %c %c `;
    console.log.apply(console, BaseSequenceMacro.consoleArgs);
    super.dispatchComplete(success);
  }
}
