import _ from 'lodash';
import mongoose from 'mongoose';

function buildAggregationFromFieldPath(documentId: string, fieldPath: string) {
    const pipeline = [];

    pipeline.push({
        $match: {
            id: documentId,
        }
    });

    const pathComponents = JSON.parse(fieldPath) as [{ field: string; id: string }];

    if (!Array.isArray(pathComponents)) {
        throw new Error('fieldPath is incorrect');
    }
    // const pathComponents = [
    //     {
    //         field: 'subtitles',
    //         id: 'subtitle-A',
    //     },
    //     {
    //         field: 'parts',
    //         id: 'part-1',
    //     },
    //     {
    //         field: 'subparts',
    //         id: 'subpart-A',
    //     },
    // ];

    let level = 0;

    for (const pathComponent of pathComponents) {
        level++;

        const projectionFieldName = `level${level}`;
        const filterInputFieldName = level === 1
            ? `$${pathComponent.field}`
            : `$level${level - 1}.${pathComponent.field}`;

        pipeline.push({
            $project: {
                [projectionFieldName]: {
                    $filter: {
                        input: filterInputFieldName,
                        as: 'item',
                        cond: { $eq: ['$$item.id', pathComponent.id] },
                        limit: 1,
                    }
                },
            },
        });

        pipeline.push({
            $unwind: `$${projectionFieldName}`,
        });
    }

    const lastProjectedFieldName = `$level${level}`;

    pipeline.push({
        $project: {
            _id: 0,
            desiredField: lastProjectedFieldName,
        },
    });

    return pipeline;
}

/**
 * Leave only 3 nesting levels.
 * This also could be done on Mongo aggregation level, but tried to avoid overcomplication of aggregations.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function filterNestedFields(documentData: any) {
    const filteredDocumentData = _.cloneDeep(documentData);

    for (const fieldKey of Object.keys(filteredDocumentData)) {
        if (Array.isArray(filteredDocumentData[fieldKey])) {
            for (const collectionItem of filteredDocumentData[fieldKey]) {
                for (const collectionItemFieldKey of Object.keys(collectionItem)) {
                    if (Array.isArray(collectionItem[collectionItemFieldKey])) {
                        for (const collectionItemSubItem of collectionItem[collectionItemFieldKey]) {
                            for (const collectionSubItemFieldKey of Object.keys(collectionItemSubItem)) {
                                if (Array.isArray(collectionItemSubItem[collectionSubItemFieldKey])) {
                                    collectionItemSubItem[collectionSubItemFieldKey] = [];
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return filteredDocumentData;
}

export async function getDocumentData(documentId: string, fieldPath?: string) {
    if (!fieldPath || fieldPath === 'undefined') {
        const documentData = await mongoose.connection.db
            .collection('regulationdocuments')
            .findOne({ id: documentId });

        return documentData
            ? filterNestedFields(documentData)
            : null;
    }

    const aggregationPipeline = buildAggregationFromFieldPath(documentId, fieldPath);
    console.log(JSON.stringify(aggregationPipeline));

    const result = await mongoose.connection.db
        .collection('regulationdocuments')
        .aggregate(aggregationPipeline)
        .toArray();

    return result[0] && result[0].desiredField
        ? filterNestedFields(result[0].desiredField)
        : null;
}
