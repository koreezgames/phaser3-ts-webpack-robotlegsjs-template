import { autorun, IReactionDisposer } from 'mobx';

export default class BaseMediatorsUtil {
  private static readonly consoleArgs: string[] = [
    ``,
    `background: ${'#2A3351'}`,
    `background: ${'#364D98'}`,
    `color: ${'#F4F6FE'}; background: ${'#3656C1'};`,
    `background: ${'#364D98'}`,
    `background: ${'#2A3351'}`,
  ];

  private static readonly reactionConsoleArgs: string[] = [
    ``,
    `background: ${'#702420'}`,
    `background: ${'#D81C12'}`,
    `color: ${'#FFF4F3'}; background: ${'#FF0D00'};`,
    `background: ${'#D81C12'}`,
    `background: ${'#702420'}`,
  ];

  private reactionMap: Map<(...args: any[]) => void, IReactionDisposer>;
  private mediatorContext: object;

  constructor(context: object) {
    this.mediatorContext = context;
    this.reactionMap = new Map();
    this.initialize();
  }

  public initialize(): void {
    BaseMediatorsUtil.consoleArgs[0] = `%c %c %c ${
      this.mediatorContext.constructor.name
    }: initialize %c %c `;
    console.log.apply(console, BaseMediatorsUtil.consoleArgs);
  }

  public destroy(): void {
    this.reactionMap.forEach((reactionDisposer: IReactionDisposer) => {
      reactionDisposer();
    });
    this.reactionMap.clear();
    this.reactionMap = null;
    BaseMediatorsUtil.consoleArgs[0] = `%c %c %c ${
      this.mediatorContext.constructor.name
    }: destroy %c %c `;
    console.log.apply(console, BaseMediatorsUtil.consoleArgs);
  }

  public addReaction(reaction: (...args: any[]) => void, debug: boolean): void {
    this.reactionMap.set(
      reaction,
      debug
        ? this.debugAutorun(reaction, this.mediatorContext)
        : autorun(reaction.bind(this.mediatorContext)),
    );
  }

  public removeReaction(reaction: (...args: any[]) => void): void {
    if (this.reactionMap.has(reaction)) {
      const reactionDisposer: IReactionDisposer = this.reactionMap.get(
        reaction,
      );
      reactionDisposer();
      this.reactionMap.delete(reaction);
    }
  }

  private debugAutorun(
    reaction: (...args: any[]) => void,
    context: object,
  ): IReactionDisposer {
    return autorun((...args: any[]) => {
      if (args[0]) {
        const observing: any[] = args[0].observing as any[];
        const props: string[] = [];
        observing.forEach((obj: any) => {
          const { name, value }: { name: string; value: any } = obj;
          props.push(`${name} => ${value}`);
        });
        BaseMediatorsUtil.reactionConsoleArgs[0] = `%c %c %c ${
          context.constructor.name
        }: ${reaction.name} [ ${props.join(' | ')} ] %c %c `;
        console.log.apply(console, BaseMediatorsUtil.reactionConsoleArgs);
      }
      reaction.apply(context);
    });
  }
}
