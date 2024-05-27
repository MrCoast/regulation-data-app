import fetch from 'node-fetch';
import RegulationParser from './regulation-parser/parser';
import HtmlStringSource from './regulation-parser/source/html-string-source';
import ParserStrategyEcfr from './regulation-parser/parser-strategy/ecfr';

export async function getRegulationDocumentFromUrl(url: string) {
    const webPageHtmlResponse = await fetch(url);
    const webPageHtml = await webPageHtmlResponse.text();

    const regulationParser = new RegulationParser(
        new HtmlStringSource(),
        new ParserStrategyEcfr()
    );

    return regulationParser.parse(webPageHtml);
}
