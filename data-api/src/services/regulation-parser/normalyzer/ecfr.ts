import NormalyzerStrategy from './strategy';

export default class NormalyzerStrategyEcfr extends NormalyzerStrategy {
    public getNormalyzedData(inputData: object): object {
        return inputData;
    }
}
