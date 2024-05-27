import ParserStrategy from './parser-strategy';

export default class ParserStrategyEcfr extends ParserStrategy {
    public getParsedData(inputData: object): object {
        return inputData;
    }
}
