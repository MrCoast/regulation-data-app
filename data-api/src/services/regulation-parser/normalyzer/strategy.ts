import { PlainObject } from '../parser';
import { RegulationDocument } from '../../../dto/regulation-document';

export default abstract class NormalyzerStrategy {
    public abstract getNormalyzedData(inputData: PlainObject): RegulationDocument;
}
