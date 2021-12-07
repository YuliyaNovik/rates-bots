const generateBoundary = () => {
    let boundary = '---------------------------'

    for (let i = 0; i < 24; i++) {
        boundary += Math.floor(Math.random() * 10).toString(16);
    }

    return boundary
}

const createMultipartDataBuffer = (boundary, photo) => {
    return Buffer.concat([
        Buffer.from(`--${boundary}\r\n`),
        Buffer.from(`Content-Disposition: form-data; name="photo"; filename="screenshot.jpeg"\r\n`),
        Buffer.from(`Content-Type: image/jpeg\r\n\r\n`),
        photo,
        Buffer.from(`\r\n--${boundary}--\r\n`)
    ]);
}

const generateMultipartFormData = (photo) => {
    const boundary = generateBoundary();
    const body = createMultipartDataBuffer(boundary, photo);

    return { boundary, body };
}

module.exports = { generateMultipartFormData };