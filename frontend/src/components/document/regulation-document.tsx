import { JSX, SyntheticEvent } from 'react';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import * as RegulationDocumentTypes from '../../types/document';

const ParagraphView = ({ paragraph, parentId }: { paragraph: RegulationDocumentTypes.Paragraph, parentId: string }): JSX.Element => {
  const { id, content, paragraphs } = paragraph;
  const itemId = `${parentId}|paragraphs|${id}`;

  // Nested paragraphs are stored as json strings in DocumentDB,
  // see data-api src/models/regulation-document.ts -> paragraph schema.
  const mapInnerParagraph = (innerParagraph: string) => {
    const innerParagraphObject = JSON.parse(innerParagraph);

    return <ParagraphView key={innerParagraphObject.id} parentId={itemId} paragraph={innerParagraphObject} />;
  };

  return (
    <TreeItem key={itemId} itemId={itemId} label={id}>
      {content && content}
      {paragraphs && paragraphs.map((innerParagraph) => mapInnerParagraph(innerParagraph))}
    </TreeItem>
  );
};

const SectionView = ({ section, parentId }: { section: RegulationDocumentTypes.Section, parentId: string }): JSX.Element => {
  const { id, title, paragraphs } = section;
  const itemId = `${parentId}|sections|${id}`;

  return (
    <TreeItem key={itemId} itemId={itemId} label={title}>
      {paragraphs && paragraphs.map((paragraph) => (<ParagraphView key={paragraph.id} parentId={itemId} paragraph={paragraph} />))}
    </TreeItem>
  );
};

const SubpartView = ({ subpart, parentId }: { subpart: RegulationDocumentTypes.Subpart, parentId: string }): JSX.Element => {
  const { id, title, sections } = subpart;
  const itemId = `${parentId}|subparts|${id}`;

  return (
    <TreeItem key={itemId} itemId={itemId} label={title}>
      {sections && sections.map((section) => (<SectionView key={section.id} parentId={itemId} section={section} />))}
    </TreeItem>
  );
};

const AppendixView = ({ appendix, parentId }: { appendix: RegulationDocumentTypes.Appendix, parentId: string }): JSX.Element => {
  const { id, title, paragraphs, content } = appendix;
  const itemId = `${parentId}|appendices|${id}`;

  return (
    <TreeItem key={itemId} itemId={itemId} label={title}>
      {content && content}
      {paragraphs && paragraphs.map((paragraph) => (<ParagraphView key={paragraph.id} parentId={itemId} paragraph={paragraph} />))}
    </TreeItem>
  );
};

const PartView = ({ part, parentId }: { part: RegulationDocumentTypes.Part, parentId: string }): JSX.Element => {
  const { id, title, sections, subparts, appendices } = part;
  const itemId = `${parentId}|parts|${id}`;

  return (
    <TreeItem key={itemId} itemId={itemId} label={title}>
      {sections && sections.map((section) => (<SectionView key={section.id} parentId={itemId} section={section} />))}
      {subparts && subparts.map((subpart) => (<SubpartView key={subpart.id} parentId={itemId} subpart={subpart} />))}
      {appendices && appendices.map((appendix) => (<AppendixView key={appendix.id} parentId={itemId} appendix={appendix} />))}
    </TreeItem>
  );
};

const ChapterView = ({ chapter, parentId }: { chapter: RegulationDocumentTypes.Chapter, parentId: string }): JSX.Element => {
  const { id, title, parts } = chapter;
  const itemId = `${parentId}|chapters|${id}`;

  return (
    <TreeItem key={itemId} itemId={itemId} label={title}>
      {parts.map((part) => (<PartView key={part.id} parentId={itemId} part={part} />))}
    </TreeItem>
  );
};

const SubtitleView = ({ subtitle }: { subtitle: RegulationDocumentTypes.Subtitle }): JSX.Element => {
  const { id, title, chapters, parts } = subtitle;
  const itemId = `subtitles|${id}`;

  return (
    <TreeItem key={itemId} itemId={itemId} label={title}>
      {chapters && chapters.map((chapter) => (<ChapterView key={chapter.id} parentId={itemId} chapter={chapter} />))}
      {parts && parts.map((part) => (<PartView key={part.id} parentId={itemId} part={part} />))}
    </TreeItem>
  );
};

type RegulationDocumentViewProps = {
  document: RegulationDocumentTypes.RegulationDocument;
  onSelectedItemsChange?: (event: SyntheticEvent<Element, Event>, selectedItemId: Array<string> | string) => void;
};

const RegulationDocumentView: React.FC<RegulationDocumentViewProps> = ({
  document,
  onSelectedItemsChange = () => {},
}): JSX.Element => {
  const { id, title, source, subtitles } = document;

  return (
    <div data-document-id={id}>
      <h3>{title}</h3>
      <div>
        <b>Source:</b>&nbsp;
        {source}

        <SimpleTreeView onSelectedItemsChange={onSelectedItemsChange}>
          {subtitles.map((subtitle) => (<SubtitleView key={subtitle.id} subtitle={subtitle} />))}
        </SimpleTreeView>
      </div>
    </div>
  );
};

export default RegulationDocumentView;
