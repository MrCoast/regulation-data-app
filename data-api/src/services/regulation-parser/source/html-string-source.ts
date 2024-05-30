import jsdom from 'jsdom';
import Source from './source';
import { PlainObject } from '../parser';

const { JSDOM } = jsdom;

const DOM_NODE_ELEMENT = 1;
const DOM_NODE_TEXT = 3;
export default class HtmlStringSource extends Source {
    public getPlainData(inputData: string): object {
        // JSDOM loads the whole HTML document in memory, currently it works with --max_old_space_size=8192 set in package.json
        // for larger documents another approaches might be considered:
        // e.g. stream parsing with sax library - https://www.npmjs.com/package/sax
        const webPageDom = new JSDOM(inputData);
        const document = webPageDom.window.document;

        return this.convertNodeToPlainObject(document.body);
    }

    private convertNodeToPlainObject(node: HTMLElement) {
        const plainObject: PlainObject = {};
      
        switch (node.nodeType) {
          case DOM_NODE_ELEMENT:
            plainObject.tagName = node.tagName.toLowerCase();
            plainObject.attributes = {};
            for (const attr of node.attributes) {
              plainObject.attributes[attr.name] = attr.value;
            }
            plainObject.children = [];
            for (const child of node.childNodes) {
              plainObject.children.push(this.convertNodeToPlainObject(child as HTMLElement));
            }
            break;
          case DOM_NODE_TEXT:
            plainObject.textContent = node.textContent!.trim();
            break;
        }
      
        return plainObject;
    }
}
