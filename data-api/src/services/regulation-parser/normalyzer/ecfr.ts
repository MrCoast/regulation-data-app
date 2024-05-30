import NormalyzerStrategy from './strategy';
import { PlainObject } from '../parser';
import * as RegulationDTO from '../../../dto/regulation-document';

export default class EcfrNormalyzer extends NormalyzerStrategy {
    public getNormalyzedData(inputData: PlainObject): RegulationDTO.RegulationDocument {
        return this.processDocument(inputData.children![0]);
    }

    private processDocument(plainDocument: PlainObject) {
        const regulationDocument = new RegulationDTO.RegulationDocument();

        regulationDocument.id = plainDocument.attributes!.id;

        const documentTitle = this.extractGroupTitle(plainDocument);

        if (!documentTitle) {
            throw new Error('Document title is missing');
        }

        regulationDocument.title = documentTitle;

        const plainSubtitles = this.filterByClassName(plainDocument.children!, 'subtitle');
        regulationDocument.subtitles = this.processSubtitles(plainSubtitles);

        return regulationDocument;
    }

    private processSubtitles(plainSubtitles: Array<PlainObject>) {
        const processedSubtitles = [];

        for (const plainSubtitle of plainSubtitles) {
            const processedSubtitle = new RegulationDTO.Subtitle();
            processedSubtitle.id = plainSubtitle.attributes!.id;

            const groupTitle = this.extractGroupTitle(plainSubtitle);
            if (!groupTitle) {
                continue;
            }
            processedSubtitle.title = groupTitle;

            const plainParts = this.filterByClassName(plainSubtitle.children!, 'part');
            processedSubtitle.parts = this.processParts(plainParts);

            const plainChapters = this.filterByClassName(plainSubtitle.children!, 'chapter');
            processedSubtitle.chapters = this.processChapters(plainChapters);

            processedSubtitles.push(processedSubtitle);
        }

        return processedSubtitles;
    }

    private processChapters(plainChapters: Array<PlainObject>) {
        const processedChapters = [];

        for (const plainChapter of plainChapters) {
            const processedChapter = new RegulationDTO.Chapter();
            processedChapter.id = plainChapter.attributes!.id;

            const groupTitle = this.extractGroupTitle(plainChapter);
            if (!groupTitle) {
                continue;
            }
            processedChapter.title = groupTitle;

            const plainParts = this.filterByClassName(plainChapter.children!, 'part');
            processedChapter.parts = this.processParts(plainParts);

            processedChapters.push(processedChapter);
        }

        return processedChapters;
    }

    private processParts(plainParts: Array<PlainObject>) {
        const processedParts = [];

        for (const plainPart of plainParts) {
            const processedPart = new RegulationDTO.Part();
            processedPart.id = plainPart.attributes!.id;

            const groupTitle = this.extractGroupTitle(plainPart);
            if (!groupTitle) {
                continue;
            }
            processedPart.title = groupTitle;

            const plainSubparts = this.filterByClassName(plainPart.children!, 'subpart');
            processedPart.subparts = this.processSubparts(plainSubparts);

            const plainAppendices = this.filterByClassName(plainPart.children!, 'appendix');
            processedPart.appendices = this.processAppendices(plainAppendices);

            const plainSections = this.filterByClassName(plainPart.children!, 'section');
            processedPart.sections = this.processSections(plainSections);

            processedParts.push(processedPart);
        }

        return processedParts;
    }

    private processSubparts(plainSubparts: Array<PlainObject>) {
        const processedSubparts = [];

        for (const plainSubpart of plainSubparts) {
            const processedSubpart = new RegulationDTO.Subpart();
            processedSubpart.id = plainSubpart.attributes!.id;

            const groupTitle = this.extractGroupTitle(plainSubpart);
            if (!groupTitle) {
                continue;
            }
            processedSubpart.title = groupTitle;

            const plainSections = this.filterByClassName(plainSubpart.children!, 'section');
            processedSubpart.sections = this.processSections(plainSections);

            processedSubparts.push(processedSubpart);
        }

        return processedSubparts;
    }

    private processAppendices(plainAppendices: Array<PlainObject>) {
        const processedAppendices = [];

        for (const plainAppendix of plainAppendices) {
            const processedAppendix = new RegulationDTO.Appendix();
            processedAppendix.id = plainAppendix.attributes!.id;

            const groupTitle = this.extractGroupTitle(plainAppendix);
            processedAppendix.title = groupTitle || '';

            processedAppendix.content = this.extractPlainText(plainAppendix);

            const plainParagraphs = this.filterByIdRegex(plainAppendix.children!, /^p-/);
            processedAppendix.paragraphs = this.processParagraphs(plainParagraphs);

            processedAppendices.push(processedAppendix);
        }

        return processedAppendices;
    }

    private processSections(plainSections: Array<PlainObject>) {
        const processedSections = [];

        for (const plainSection of plainSections) {
            const processedSection = new RegulationDTO.Section();
            processedSection.id = plainSection.attributes!.id;

            const groupTitle = this.extractGroupTitle(plainSection);
            processedSection.title = groupTitle || '';

            const plainParagraphs = this.filterByIdRegex(plainSection.children!, /^p-/);
            processedSection.paragraphs = this.processParagraphs(plainParagraphs);

            processedSections.push(processedSection);
        }

        return processedSections;
    }

    private processParagraphs(plainParagraphs: Array<PlainObject>) {
        const processedParagraphs = [];

        for (const plainParagraph of plainParagraphs) {
            const processedParagraph = new RegulationDTO.Paragraph();
            processedParagraph.id = plainParagraph.attributes!.id;

            processedParagraph.content = this.extractPlainText(plainParagraph);

            const innerPlainParagraphs = this.filterByIdRegex(plainParagraph.children!, /^p-/);
            processedParagraph.paragraphs = this.processParagraphs(innerPlainParagraphs);

            processedParagraphs.push(processedParagraph);
        }

        return processedParagraphs;
    }

    private extractGroupTitle(group: PlainObject) {
        if (!group.children || !group.children[0]) {
            return null;
        }

        if (group.children[0].textContent) {
            return group.children[0].textContent;
        }

        const headerTags = this
            .filterByTagNameRegex(group.children, /^h\d/i)
            .filter((headerTag) => !!headerTag.children && !!headerTag.children[0] && !!headerTag.children[0].textContent);

        if (headerTags.length === 0) {
            return null;
        }

        const firstHeaderTag = headerTags[0];

        return firstHeaderTag.children![0].textContent;
    }

    private extractPlainText(node: PlainObject) {
        if (!node.children) {
            return node.textContent || '';
        }

        return node.children
            // exclude any header tags
            .filter((childNode) => !!childNode.tagName && !/^h\d/i.test(childNode.tagName))
            // exclude any sub-paragraphs as those are handled separately
            .filter((childNode) => !(childNode.attributes && /^p-/.test(childNode.attributes.id)))
            // combine all text content of child nodes
            .map((childNode) => {
                let textContent = '';

                if (childNode.textContent) {
                    textContent += childNode.textContent;
                }

                if (childNode.children) {
                    childNode.textContent += "\n";

                    textContent += childNode.children
                        .map((x) => this.extractPlainText(x))
                        .join("\n");
                }

                return textContent;
            })
            .join("\n");
    }

    private filterByClassName(nodes: Array<PlainObject>, targetClassName: string) {
        return nodes.filter((node) => node.attributes && node.attributes['class'] === targetClassName);
    }

    private filterByClassNameRegex(nodes: Array<PlainObject>, targetClassNameRegexp: RegExp) {
        return nodes.filter((node) => node.attributes && targetClassNameRegexp.test(node.attributes['class']));
    }

    private filterByIdRegex(nodes: Array<PlainObject>, targetIdRegexp: RegExp) {
        return nodes.filter((node) => node.attributes && targetIdRegexp.test(node.attributes.id));
    }

    private filterByTagNameRegex(nodes: Array<PlainObject>, targetTagNameRegexp: RegExp) {
        return nodes.filter((node) => node.tagName && targetTagNameRegexp.test(node.tagName));
    }
}
