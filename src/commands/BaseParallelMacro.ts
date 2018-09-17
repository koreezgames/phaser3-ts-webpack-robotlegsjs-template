import { injectable } from '@robotlegsjs/core';
import { ParallelMacro } from '@robotlegsjs/macrobot';

@injectable()
export abstract class BaseParallelMacro extends ParallelMacro {
  private static readonly consoleArgs: string[] = [
    ``,
    `background: ${'#2A0020'}`,
    `background: ${'#7A005C'}`,
    `color: ${'#FEF2FB'}; background: ${'#9C0075'};`,
    `background: ${'#7A005C'}`,
    `background: ${'#2A0020'}`,
  ];

  public execute(payload?: any, ...payloads: any[]): void {
    BaseParallelMacro.consoleArgs[0] = `%c %c %c ${
      this.constructor.name
    }: execute %c %c `;
    console.log.apply(console, BaseParallelMacro.consoleArgs);
    super.execute(payload, ...payloads);
  }

  protected dispatchComplete(success: boolean): void {
    BaseParallelMacro.consoleArgs[0] = `%c %c %c ${
      this.constructor.name
    }: execute: complete [${success}] %c %c `;
    console.log.apply(console, BaseParallelMacro.consoleArgs);
    super.dispatchComplete(success);
  }
}
