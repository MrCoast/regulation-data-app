import Source from './source/source';
import NormalyzerStrategy from './normalyzer/strategy';

export type PlainObject = {
    tagName?: string;
    attributes?: { [key: string]: string };
    children?: Array<PlainObject>;
    textContent?: string;
};

export default class Parser {
    constructor(
        private source: Source,
        private normalyzerStrategy: NormalyzerStrategy
    ) {}

    public parse(inputData: string) {
        const plainData = this.source.getPlainData(inputData);

        return this.normalyzerStrategy.getNormalyzedData(plainData);
    }
}
