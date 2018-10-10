/**
 * Created by megan on 2017-11-01.
 */

"use strict";

import path from 'path';
import fs from 'fs';

let megan = {};
let obj = {};

fs.readdirSync(__dirname).forEach(file => {
    if (file !== 'index.js') {
        megan[path.basename(file, 'Module.js')] = require(path.join(__dirname, file));
    }
});

let spDir = __dirname + '/../db/m_ingest';
fs.readdirSync(spDir).forEach(file => {
    megan[path.basename(file, '.js')] = require(path.join(spDir, file));
});



// console.error(moduleObj);

// for (let idx in moduleObj){
//     console.error(idx);
//     console.error(moduleObj[idx]);
// }

export { megan };

// let obj = {};
// console.error(obj)
// export moduleObj;
// export dbObj;

// export {default as common} from './commonModule';
// export {default as date} from './dateModule';
