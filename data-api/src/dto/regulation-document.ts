export class RegulationDocument {
    public id?: string;
    public title?: string;
    public subtitles?: Array<Subtitle>;
    public source?: string;
}

export class Subtitle {
    public id?: string;
    public title?: string;
    public parts?: Array<Part>;
    public chapters?: Array<Chapter>;
}

export class Chapter {
    public id?: string;
    public title?: string;
    public parts?: Array<Part>;
}

export class Part {
    public id?: string;
    public title?: string;
    public subparts?: Array<Subpart>;
    public appendices?: Array<Appendix>;
    public sections?: Array<Section>;
}

export class Subpart {
    public id?: string;
    public title?: string;
    public sections?: Array<Section>;
}

export class Appendix {
    public id?: string;
    public title?: string;
    public content?: string;
    public paragraphs?: Array<Paragraph>;
}

export class Section {
    public id?: string;
    public title?: string;
    public paragraphs?: Array<Paragraph>;
}

export class Paragraph {
    public id?: string;
    public content?: string;
    public paragraphs?: Array<string>;
}
