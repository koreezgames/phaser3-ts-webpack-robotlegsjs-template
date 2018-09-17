import { injectable } from '@robotlegsjs/core';

@injectable()
export class BaseCommand {
  private static readonly consoleArgs: string[] = [
    ``,
    `background: ${'#3F234E'}`,
    `background: ${'#6E2994'}`,
    `color: ${'#D4BFE0'}; background: ${'#8724BD'};`,
    `background: ${'#6E2994'}`,
    `background: ${'#3F234E'}`,
  ];

  public execute(): void {
    BaseCommand.consoleArgs[0] = `%c %c %c ${
      this.constructor.name
    }: execute %c %c `;
    console.log.apply(console, BaseCommand.consoleArgs);
  }
}
