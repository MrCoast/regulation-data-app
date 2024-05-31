import * as fs from 'fs';
import RegulationParser from './regulation-parser/parser';
import HtmlStringSource from './regulation-parser/source/html-string-source';
import EcfrNormalyzer from './regulation-parser/normalyzer/ecfr';
import { fetchDocument, getCacheFilenameByUrl } from '../utils/utils';

function getRegulationDocumentFromData(data: string) {
    const regulationParser = new RegulationParser(
        new HtmlStringSource(),
        new EcfrNormalyzer()
    );

    return regulationParser.parse(data);
}

export async function getCachedRegulationData(url: string) {
    const filename = getCacheFilenameByUrl(url);

    let data;

    if (fs.existsSync(filename)) {
        data = fs.readFileSync(filename, 'utf-8').toString();
    } else {
        data = await fetchDocument(url);
        fs.writeFileSync(filename, data);
    }

    return data;
}

export async function getRegulationDocumentFromUrl(url: string) {
    const webPageHtml = await fetchDocument(url);

    return getRegulationDocumentFromData(webPageHtml);
}

export async function getCachedRegulationDocument(url: string) {
    const data = await getCachedRegulationData(url);

    return getRegulationDocumentFromData(data);
}
