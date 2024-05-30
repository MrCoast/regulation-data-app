import fetch from 'node-fetch';
import RegulationParser from './regulation-parser/parser';
import HtmlStringSource from './regulation-parser/source/html-string-source';
import EcfrNormalyzer from './regulation-parser/normalyzer/ecfr';

export async function getRegulationDocumentFromUrl(url: string) {
    const webPageHtmlResponse = await fetch(url);
    const webPageHtml = await webPageHtmlResponse.text();
    // @TODO: add this to unit tests
    //     const webPageHtml = `<html><body><div class="section" id="1.1">
    // <h4 data-hierarchy-metadata="{&quot;path&quot;:&quot;/on/2024-03-01/title-49/section-1.1&quot;,&quot;citation&quot;:&quot;49 CFR 1.1&quot;}">§ 1.1 Overview.</h4>
    //     <p>This part describes the organization of the United States Department of Transportation and provides for the performance of duties imposed upon, and the exercise of powers vested in, the Secretary of Transportation by law.</p>
    //   </div></body></html>`;

    const regulationParser = new RegulationParser(
        new HtmlStringSource(),
        new EcfrNormalyzer()
    );

    return regulationParser.parse(webPageHtml);
}
