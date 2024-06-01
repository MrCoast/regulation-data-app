export function getS3KeyByUrl(url: string) {
    const sanitizedUrl = url.split(/[^\w-]/).filter(Boolean).join('_').slice(0, 20);
    const filename = Buffer.from(sanitizedUrl, 'utf-8').toString('base64');

    return `regulations-cache-${filename}`;
}
