const generateBoundary = () => {
    let boundary = '---------------------------'

    for (let i = 0; i < 24; i++) {
        boundary += Math.floor(Math.random() * 10).toString(16);
    }

    return boundary;
}

const createMultipartDataBuffer = (boundary, buffer, name, fileName) => {
    return Buffer.concat([
        Buffer.from(
            `--${boundary}\r\n` +
            `Content-Disposition: form-data; name="${name}"; filename="${fileName}"\r\n` +
            `Content-Type: image/jpeg\r\n\r\n`
        ),
        buffer,
        Buffer.from(`\r\n--${boundary}--\r\n`)
    ]);
}

const generateMultipartFormData = (buffer, name, fileName) => {
    const boundary = generateBoundary();
    const body = createMultipartDataBuffer(boundary, buffer, name, fileName);

    return { boundary, body };
}

module.exports = { generateMultipartFormData };