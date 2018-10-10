/**
 * Created by megan on 2017-11-01.
 */

"use strict";

import jobController from 'controllers/jobController';

// 딥러닝용 잡 체크
export function getJob (req, res){
    jobController.getJob(req, res, (rows) => {
        res.send(rows);
    });
}

// 딥러닝용 잡 보고
export function reportJob (req, res){
    jobController.reportJob(req, res, (rows) => {
        res.send(rows);
    });
}

export function test(req, res){
    jobController.test(req, res, (rows) => {
       res.send(rows);
    });
}
