import { RegulationDocument as RegulationDocumentDTO } from '../dto/regulation-document';
import { RegulationDocument as RegulationDocumentModel } from '../models/regulation-document';

export function createModelFromDto(dto: RegulationDocumentDTO) {
    return new RegulationDocumentModel(dto);
}