/**
 * Created by megan on 2017-11-09.
 */

'use strict';

import http from 'http';
import https from 'https';
import url from 'url';
import request from 'request';
import querystring from 'querystring';
import log from './logModule';

export default {
    request (host, method, data, timeout, callback) {
        let object = url.parse(host);
        let dataString = JSON.stringify(data);
        let req;

        // if(method == 'GET'){
        //     object.path += '?' + querystring.stringify(data);
        // }
        // else{
        if(method === 'POST'){
            let headers = {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(dataString)
            };
        }
        // }

        let options = {
            host: object.hostname,
            port: (object.port !== null) ? object.port : (object.protocol === 'https:') ? 443 : 80,
            // path: object.protocol + '//' + object.host + object.path + '?' + querystring.stringify(data),
            path: `${object.protocol}//${object.host}${object.path}?${querystring.stringify(data)}`,
            method: method,
            headers: headers,
            timeout: timeout || 1000
        };
        log.debug(options);

        if(object.protocol === 'https:'){
            req = https.request(options, (res) => {
                res.setEncoding('utf-8');

                let responseString = '';

                res.on('data', (data) => {
                    responseString += data;
                });

                res.on('end', () => {
                    callback(null, res.statusCode, responseString);
                });
            });
        }else{
            req = http.request(options, (res) => {
                res.setEncoding('utf-8');

                let responseString = '';

                res.on('data', (data) => {
                    responseString += data;
                });

                res.on('end', () => {
                    callback(null, res.statusCode, responseString);
                });
            });
        }

        req.on('error', (err) => {
            log.error(err);
            callback(err, null, null);
        });

        if(method === 'POST') {
            req.write(dataString);
            log.debug(dataString);
        }
        req.end();
    },
    port (host, port, path, data, callback) {
        let dataString = JSON.stringify(data);
        let headers = {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(dataString)
        };

        let options = {
            hostname: host,
            port: port,
            path: path, // '/compile',
            method: 'POST',
            headers: headers
        };

        let req = http.request(options, (res) => {
            res.setEncoding('utf-8');

            let responseString = '';

            res.on('data', (data) => {
                responseString += data;
            });

            res.on('end', () => {
                log.info(responseString);
                let responseObject = JSON.parse(responseString);
                callback(false, responseObject);
            });
        });

        req.on('error', (err) => {
            log.error(err);
            callback(err, null);
        });

        req.write(dataString);
        req.end();
    },
    get (httpType, host, port, path, data, callback) {
        let req;
        let options = {
            host: host,
            port: (port != '') ? port : (httpType == 'https') ? 443 : 80,
            path: path, // '/compile',
            headers : {}
        };

        if(httpType == 'https'){
            req = https.get(options, (res) => {
                res.on('data', (data) => {
                    log.info(path, res.statusCode, JSON.parse(data));
                });
            });
        }else{
            req = http.get(options, (res) => {
                res.on('data', (data) => {
                    log.info(path, res.statusCode, JSON.parse(data));
                });
            });
        }

        req.on('error', (e) => {
            log.error(path, e);
        });

        callback();
    }
}
