import Source from './source/source';
import NormalyzerStrategy from './normalyzer/strategy';

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
