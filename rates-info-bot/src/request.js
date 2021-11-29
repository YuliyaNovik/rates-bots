const https = require("https");

const get = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let data = "";
    
            response.on("data", (chunk) => {
                data += chunk;
            });
    
            response.on("end", () => {
                resolve(JSON.parse(data));
            });
            
        }).on("error", (err) => {
            reject(err);
        });
    })
}

const post = (options, body) => {
    return new Promise((resolve, reject) => {
        const request = https.request(options, (response) => {
            let data = "";

            response.on("data", (chunk) => {
                data += chunk;
            });

            response.on("end", () => {
                resolve(JSON.parse(data));
            });

        }).on("error", (err) => {
            reject(err);
        });

        request.end(body);
    })
}

const getStream = (url) => {
    return new Promise((resolve, reject) => {
        return https.get(url, (response) => {
            resolve(response);
        })
        .on("error", (err) => {
            reject(err);
        });
    });
}

module.exports = { get, getStream, post }