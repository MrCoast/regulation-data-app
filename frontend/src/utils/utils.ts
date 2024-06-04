import _ from 'lodash';

export const splitIntoPairs: <T>(arr: T[]) => T[][] = (arr) => (
  // eslint-disable-next-line no-sequences
  arr.reduce((acc, val, i) => (i % 2 === 0 ? acc.push([val]) : acc[acc.length - 1].push(val), acc), [])
);


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getItemIndexByIdField = (collection: Array<any>, id: string) => _.findIndex(collection, { id });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDocumentFieldKeyForUpdate = (normalizedItemIds: { field: string, id: string }[], documentObject: any) => {
  let partialFieldKey = '';
  return normalizedItemIds
    .map((item) => {
      partialFieldKey += item.field;
      const itemIndex = getItemIndexByIdField(_.get(documentObject, partialFieldKey), item.id);
      partialFieldKey += `[${itemIndex}].`;
      return `${item.field}[${itemIndex}]`;
    })
    .join('.');
};
