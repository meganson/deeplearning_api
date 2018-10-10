/**
 * Created by megan on 2017-10-31.
 */

'use strict';

import log from './logModule';

export default {
    validateParameters (params, callback) {
        // find - only one
        log.debug(params);
        let output = params.find((v) =>
            this.isUndefined(v.value)
        );
        callback(output);
    },
    isUndefined (str) {
        return (typeof str === 'undefined' || str === null)
    },
    filterParameters (params, callback) {
        // filter - all of them
        let output = params.filter((v) =>
            this.isNull(v.value)
        );
        callback(output);
    },
    findArray (array, str, callback) {
        let output = array.find((v) =>
            v.value = str
        );
        callback(output)
    },
    isBlank (str) {
        return (str === '')
    },
    isNull (str) {
        return (str === '' || typeof str === 'undefined' || str === null)
    },
    replaceBlank (str) {
        return str.replace(/\s/g, "");
    },
    replaceBlankToString (str, replaceStr) {
        return str.replace(/\s/g, replaceStr);
    },
    toUpperCase (str) {
        return str.toUpperCase();
    },
    toLowerCase (str) {
        return str.toLowerCase();
    },
    isJsonString (str) {
        try {
            JSON.parse(str);
        } catch(e) {
            return false;
        }
        return true;
    },
    getParamErr (output) {
        return {
            'result': 100,
            'param': output
        }
    }
}