/**
 * Created by megan on 2017-11-01.
 */

"use strict";

import workerController from 'controllers/workerController';

// server version
export function version (req, res){
    workerController.version(req, res, (rows) => {
        res.send(rows);
    });
}

// server terminate
export function terminate (req, res){
    workerController.terminate(req, res, (rows) => {
        res.send(rows);
    });
}