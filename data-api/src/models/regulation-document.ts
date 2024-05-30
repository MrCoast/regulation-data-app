import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const paragraph = new Schema({
    id: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: false,
        default: '',
    },
    paragraphs: {
        type: [String],
        required: false,
        default: '',
    },
});

const section = new Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    paragraphs: {
        type: [paragraph],
        required: false,
        default: [],
    },
});

const appendix = new Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: false,
        default: '',
    },
    content: {
        type: String,
        required: false,
        default: '',
    },
    paragraphs: {
        type: [paragraph],
        required: false,
        default: [],
    },
});

const subpart = new Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    sections: {
        type: [section],
        required: false,
        default: [],
    },
});

const part = new Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    subparts: {
        type: [subpart],
        required: false,
        default: [],
    },
    appendices: {
        type: [appendix],
        required: false,
        default: [],
    },
    sections: {
        type: [section],
        required: false,
        default: [],
    },
});

const chapter = new Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    parts: {
        type: [part],
        required: true,
    },
});

const subtitle = new Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    parts: {
        type: [part],
        required: false,
        default: [],
    },
    chapters: {
        type: [chapter],
        required: false,
        default: [],
    },
});

const regulationDocument = new Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    subtitles: {
        type: [subtitle],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const RegulationDocument = mongoose.model('RegulationDocument', regulationDocument);
