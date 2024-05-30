import * as cheerio from 'cheerio';
import Source from './source';
import { PlainObject } from '../parser';

const DOM_NODE_ELEMENT = 1;
const DOM_NODE_TEXT = 3;

export default class HtmlStringSource extends Source {
    public getPlainData(inputData: string): object {
        // Cheerio works with the whole HTML document in memory, --max_old_space_size=2048 set in package.json
        // This is much more effecient than JSDOM.
        // For larger documents another approaches might be considered:
        // e.g. using stream parsing libraries like https://www.npmjs.com/package/sax or https://www.npmjs.com/package/htmlparser2
        const $ = cheerio.load(inputData);
        const htmlBody = $('body').get(0);

        return this.convertNodeToPlainObject(htmlBody);
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
              // node object returned by Cheerio uses "data" property instead of "textContent"
              plainObject.textContent = (node as any).data.trim();
              break;
        }
      
        return plainObject;
    }
}
