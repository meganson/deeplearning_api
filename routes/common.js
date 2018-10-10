/**
 * Created by megan on 2017-11-01.
 */

"use strict";

import commonController from 'controllers/commonController';

export function test (req, res){
    commonController.test(req, res, (rows) => {
        res.send(rows);
    });
}