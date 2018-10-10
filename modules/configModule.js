/**
 * Created by megan on 2017-11-01.
 */

"use strict";

import path from 'path';
import fs from 'fs';

let confDir = `${__dirname}/../conf`;
let confName = 'default.json';

fs.readdirSync(confDir).forEach(file => {
    for(let i = 0; i < process.argv.slice(2).length; i+=2){
        if(process.argv.slice(2)[i] === '-c'){
            confName = `${process.argv.slice(2)[i+1]}.json`;
            if(file == confName){
                confName = file;
            }
        }
    }
});

let conf = require(path.join(confDir, confName));
export { conf };