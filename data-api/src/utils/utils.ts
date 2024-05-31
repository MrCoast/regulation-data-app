import fetch from 'node-fetch';

export async function fetchDocument(url: string) {
    const response = await fetch(url);

    return response.text();
}

export function getCacheFilenameByUrl(url: string) {
    const sanitizedUrl = url.split(/[^\w-]/).filter(Boolean).join('_').slice(0, 20);
    const filename = Buffer.from(sanitizedUrl, 'utf-8').toString('base64');

    return `/tmp/regulations-cache-${filename}`;
}
