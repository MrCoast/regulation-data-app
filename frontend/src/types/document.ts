export type RegulationDocument = {
    id: string;
    title: string;
    subtitles: Array<Subtitle>;
    source: string;
}

export type Subtitle = {
    id: string;
    title: string;
    parts?: Array<Part>;
    chapters?: Array<Chapter>;
}

export type Chapter = {
    id: string;
    title: string;
    parts: Array<Part>;
}

export type Part = {
    id: string;
    title: string;
    subparts?: Array<Subpart>;
    appendices?: Array<Appendix>;
    sections?: Array<Section>;
}

export type Subpart = {
    id: string;
    title: string;
    sections?: Array<Section>;
}

export type Appendix = {
    id: string;
    title: string;
    content?: string;
    paragraphs?: Array<Paragraph>;
}

export type Section = {
    id: string;
    title: string;
    paragraphs?: Array<Paragraph>;
}

export type Paragraph = {
    id: string;
    content?: string;
    paragraphs?: Array<string>;
}
