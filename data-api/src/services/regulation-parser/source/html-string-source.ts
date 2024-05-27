import Source from './source';
import jsdom from 'jsdom';

const { JSDOM } = jsdom;

export default class HtmlStringSource extends Source {
    public getPlainData(inputData: string): object {
        const webPageDom = new JSDOM(inputData);
        const document = webPageDom.window.document;

        // console.log(document.body.textContent);

        return {
            body: document.body.textContent,
        };
        // return document.body;
    }
}
