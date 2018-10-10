/**
 * Created by megan on 2017-11-02.
 */

"use strict";

import * as megan from 'modules';
import Cast from '../models/cast';
import Genre from '../models/genre';

export default {
    /**
     * 딥러닝용 작업 할당
     * @param req
     * @param res
     * @param callback
     */
    getJob (req, res, callback){
        megan.log.debug(req.url);

        let sp_AssignJob_Deeplearning = require('../db/m_ingest/sp_AssignJob_Deeplearning');
        let params = sp_AssignJob_Deeplearning.setParameters(req.query);
        // megan.common.validateParameters(params, function (output) {
        megan.common.validateParameters(params, output => {
            if (output) return callback(megan.common.getParamErr(output));

            megan.db.execute(sp_AssignJob_Deeplearning.name, params, (err, rows) => {
                callback(sp_AssignJob_Deeplearning.getResult(rows));
            });
        });
    },
    /**
     * 딥러닝용 작업 보고
     * @param req
     * @param res
     * @param callback
     */
    reportJob (req, res, callback) {
        let self = this;
        megan.log.debug(req.url, req.body);

        // job db insert
        let sp_ReportJob_Deeplearning = require('../db/m_ingest/sp_ReportJob_Deeplearning');
        let params = sp_ReportJob_Deeplearning.setParameters(req.body);
        megan.common.validateParameters(params, output => {
            if (output) return callback(megan.common.getParamErr(output));

            megan.db.execute(sp_ReportJob_Deeplearning.name, params,  (err, rows) => {
                if(!err && rows[0].length > 0){
                    self.fn_Backup(rows[0][0], req.body);
                    self.fn_Report(rows[0][0], req.body);
                }

                callback(sp_ReportJob_Deeplearning.getResult(rows));
            });
        });
    },
    /**
     * functions
     * @param rows
     * @param data
     */
    fn_Backup: function(rows, data){
        // mongodb backup
        let cast, genre, params, json, name;
        if (data.type === 'cast') {
            cast = {
                contentId : rows.contentId,
                cornerId: rows.cornerId,
                cast: data.json
            };
            name = 'cast';
            params = { contentId: rows.contentId, cornerId: rows.cornerId };
            json = { cast: data.json };

            megan.mongo.findOne(name, params).then((doc) => {
                if(!megan.common.isNull(doc)) megan.mongo.findOneAndUpdate(name, params, cast);
                else megan.mongo.save(name, cast);
            }).catch((err) => megan.log.error(err));

            // megan.mongo.findOneAndUpdate(name, params, cast);
            // megan.mongo.updateOne(name, params, cast);
            // megan.mongo.updateOne(name, params, cast, {upsert: true});
            // megan.mongo.findOne(name, params).then((models) => {
            //     if(!megan.common.isNull(models)) megan.mongo.findOneAndUpdate(name, params, cast);
            //     else megan.mongo.save(name, cast);
            // }).catch((err) => megan.log.error(err));

            // megan.mongo.find(params, Cast, function(models){console.error(models)
            //     if(models.length > 0) megan.mongo.findOneAndUpdate(params, json, Cast, function(){});
            //     else megan.mongo.save(cast);
            // });
        } else if (data.type === 'genre') {
            genre = {
                contentId: rows.contentId,
                cornerId: rows.cornerId,
                genre: data.json
            };
            name = 'genre';
            params = { contentId: rows.contentId, cornerId: rows.cornerId };

            megan.mongo.findOne(name, params).then((doc) => {
                megan.log.debug(doc);
                if(!megan.common.isNull(doc)) megan.mongo.findOneAndUpdate(name, params, genre);
                else megan.mongo.save(name, genre);
            }).catch((err) => megan.log.error(err));
        }
    },
    fn_Report: function(rows, data){
        // pooq api 보고
        if(typeof rows.result === 'undefined'){
            // var params = 'channelId='+rows.channelId+'&contentId='+rows.contentId+'&cornerId='+rows.cornerId+'&type='+data.type+'&comment='+rows.comment;
            let json = {
                'channelId': rows.channelId,
                'contentId': rows.contentId,
                'cornerId': rows.cornerId,
                'type': data.type,
                'comment': rows.comment
            };
            let body = {
                'contentId': rows.contentId,
                'corenrId': rows.cornerId,
                'json': data.json
            };
            // megan.http.request(rows.reportApiUrl.replace("acquirereport", "scenereport")+'/'+rows.channelId, 'POST', json, body, 5 * 60 * 1000, function(err, statusCode, data){
            //     if(!err & statusCode == 200 && megan.common.isJsonString(data)){
            //         let responseObject;
            //         responseObject = JSON.parse(data);
            //         if(responseObject.message == 'success' && responseObject.returnCode == '200' && responseObject.result.status == 'OK'){
            //             // params = {'reportId': rows.reportId, 'reportState': 'S'};
            //             // self.fn_executeReportState(params);
            //             // megan.log.debug('pooq api report success', responseObject);
            //             // if(typeof callback !== 'undefined') return callback(0);
            //             // return;
            //         }
            //     }
            //
            //     // params = {'reportId': rows.reportId, 'reportState': 'F'};
            //     // self.fn_executeReportState(params);
            //     // megan.log.error('pooq api report fail', data);
            //     // if(typeof callback !== 'undefined') return callback(505);
            // });
            // return;
        }
        // if(typeof callback !== 'undefined') callback(500);
    },
    test: function(req, res, callback){
        let cast = Cast({
            contentId : 'test',
            cornerId: 1,
            cast: {'a': 88.89}
        });

        megan.mongo.save(cast);
    }
}