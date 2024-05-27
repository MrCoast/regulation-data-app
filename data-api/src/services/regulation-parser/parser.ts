import Source from './source/source';
import ParserStrategy from './parser-strategy/parser-strategy';

export default class Parser {
    constructor(
        private source: Source,
        private parserStrategy: ParserStrategy
    ) {}

    public parse(inputData: string) {
        const plainData = this.source.getPlainData(inputData);

        return this.parserStrategy.getParsedData(plainData);
    }
}
