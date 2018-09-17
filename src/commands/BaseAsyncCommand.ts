import { injectable } from '@robotlegsjs/core';
import { AsyncCommand } from '@robotlegsjs/macrobot';

@injectable()
export class BaseAsyncCommand extends AsyncCommand {
  private static readonly consoleArgs: string[] = [
    ``,
    `background: ${'#190226'}`,
    `background: ${'#49046F'}`,
    `color: ${'#FAF3FE'}; background: ${'#5C038D'};`,
    `background: ${'#49046F'}`,
    `background: ${'#190226'}`,
  ];

  public execute(): void {
    BaseAsyncCommand.consoleArgs[0] = `%c %c %c ${
      this.constructor.name
    }: execute: start %c %c `;
    console.log.apply(console, BaseAsyncCommand.consoleArgs);
  }

  protected dispatchComplete(success: boolean): void {
    BaseAsyncCommand.consoleArgs[0] = `%c %c %c ${
      this.constructor.name
    }: execute: complete [${success}] %c %c `;
    console.log.apply(console, BaseAsyncCommand.consoleArgs);
    super.dispatchComplete(success);
  }
}
