
const https = require('https');
const url = require('url');

const genOptionsObject = (query, host, endpoint) => {
    const requestUrl =  url.parse(url.format({
        protocol: 'https',
        hostname: host,
        pathname: endpoint,
        query
    }));
    const options = {
        host: requestUrl.host,
        path: requestUrl.path,
        method: "GET"
    }
    return options
}

const genApiRequestPromise = (options) => {
    return new Promise( (resolve, reject) => {
        https.request(
            options,
            apiResponse => {
                let data = '';
                apiResponse.on('data', chunk => { data += chunk});
                // when request completes, resolve the promise with final data object
                apiResponse.on('end', () => resolve(data));
            }
        ).on('error',error => { // throw err
            reject(error.message);
        }).end();
    });
}

module.exports = {
    genOptionsObject,
    genApiRequestPromise
}
