import _ from 'lodash';
import React, { JSX, SyntheticEvent, useState } from 'react';
import { loadDocumentFromApi } from '../utils/document';
import * as utils from '../utils/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const loadPartialData = async (selectedItemId: string, documentObject: any) => {
  const normalizedItemIds = utils
    .splitIntoPairs(selectedItemId.split('|'))
    .map((pieces: string[]) => ({
      field: pieces[0],
      id: pieces[1],
    }));

  const partialData = await loadDocumentFromApi(documentObject.id, normalizedItemIds);
  const documentFieldKeyForUpdate = utils.getDocumentFieldKeyForUpdate(normalizedItemIds, documentObject);

  _.set(documentObject, documentFieldKeyForUpdate, partialData);
};

const LazyPartialLoadDecorator = (props: { children: JSX.Element|JSX.Element[] }): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [updatedDocument, setUpdatedDocument] = useState(null);
  const handleUpdateDocument = (newUpdatedDocument) => {
    setUpdatedDocument(newUpdatedDocument);
  };

  const { children } = props;
  const childrenComponents = React.Children.toArray(children);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mappedChildren = childrenComponents.map((child: any) => {
    if (!child.type || typeof child.type !== 'function') {
      return child;
    }

    const documentDataPropKey = Object.keys(child.props)[0];
    const documentDataPropValue = (updatedDocument && updatedDocument.document) || child.props[documentDataPropKey];

    const modifiedChildProps = {
      ...child.props,
      key: (documentDataPropValue && documentDataPropValue.id) || null,
      onSelectedItemsChange: async (event: SyntheticEvent<Element, Event>, selectedItemId: Array<string> | string) => {
        await loadPartialData(selectedItemId as string, documentDataPropValue);

        handleUpdateDocument({
            selectedItemId,
            document: documentDataPropValue,
        });
      },
    };

    return React.cloneElement(child, modifiedChildProps);
  });

  return (
    <>
      {mappedChildren}
    </>
  );
};

export default LazyPartialLoadDecorator;
