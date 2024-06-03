import { JSX } from 'react';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import * as RegulationDocumentTypes from '../../types/document';

const ParagraphView = ({ paragraph }: { paragraph: RegulationDocumentTypes.Paragraph }): JSX.Element => {
  const { id, content, paragraphs } = paragraph;

  const mapInnerParagraph = (innerParagraph: string) => {
    const innerParagraphObject = JSON.parse(innerParagraph);

    return <ParagraphView key={innerParagraphObject.id} paragraph={innerParagraphObject} />;
  };

  return (
    <TreeItem key={id} itemId={id} label={id}>
      {content && content}
      {paragraphs && paragraphs.map((innerParagraph) => mapInnerParagraph(innerParagraph))}
    </TreeItem>
  );
};

const SectionView = ({ section }: { section: RegulationDocumentTypes.Section }): JSX.Element => {
  const { id, title, paragraphs } = section;

  return (
    <TreeItem key={id} itemId={id} label={title}>
      {paragraphs && paragraphs.map((paragraph) => (<ParagraphView key={paragraph.id} paragraph={paragraph} />))}
    </TreeItem>
  );
};

const SubpartView = ({ subpart }: { subpart: RegulationDocumentTypes.Subpart }): JSX.Element => {
  const { id, title, sections } = subpart;

  return (
    <TreeItem key={id} itemId={id} label={title}>
      {sections && sections.map((section) => (<SectionView key={section.id} section={section} />))}
    </TreeItem>
  );
};

const AppendixView = ({ appendix }: { appendix: RegulationDocumentTypes.Appendix }): JSX.Element => {
  const { id, title, paragraphs, content } = appendix;

  return (
    <TreeItem key={id} itemId={id} label={title}>
      {content && content}
      {paragraphs && paragraphs.map((paragraph) => (<ParagraphView key={paragraph.id} paragraph={paragraph} />))}
    </TreeItem>
  );
};

const PartView = ({ part }: { part: RegulationDocumentTypes.Part }): JSX.Element => {
  const { id, title, sections, subparts, appendices } = part;

  return (
    <TreeItem key={id} itemId={id} label={title}>
      {sections && sections.map((section) => (<SectionView key={section.id} section={section} />))}
      {subparts && subparts.map((subpart) => (<SubpartView key={subpart.id} subpart={subpart} />))}
      {appendices && appendices.map((appendix) => (<AppendixView key={appendix.id} appendix={appendix} />))}
    </TreeItem>
  );
};

const ChapterView = ({ chapter }: { chapter: RegulationDocumentTypes.Chapter }): JSX.Element => {
  const { id, title, parts } = chapter;

  return (
    <TreeItem key={id} itemId={id} label={title}>
      {parts.map((part) => (<PartView key={part.id} part={part} />))}
    </TreeItem>
  );
};

const SubtitleView = ({ subtitle }: { subtitle: RegulationDocumentTypes.Subtitle }): JSX.Element => {
  const { id, title, chapters, parts } = subtitle;

  return (
    <TreeItem key={id} itemId={id} label={title}>
      {chapters && chapters.map((chapter) => (<ChapterView key={chapter.id} chapter={chapter} />))}
      {parts && parts.map((part) => (<PartView key={part.id} part={part} />))}
    </TreeItem>
  );
};

const RegulationDocumentView = ({ document }: { document: RegulationDocumentTypes.RegulationDocument }): JSX.Element => {
  const { id, title, source, subtitles } = document;

  return (
    <div data-document-id={id}>
      <h3>{title}</h3>
      <div>
        <b>Source:</b>&nbsp;
        {source}

        <SimpleTreeView>
          {subtitles.map((subtitle) => (<SubtitleView key={subtitle.id} subtitle={subtitle} />))}
        </SimpleTreeView>
      </div>
    </div>
  );
};

export default RegulationDocumentView;
