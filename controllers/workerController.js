/**
 * Created by megan on 2017-11-03.
 */

"use strict";

import * as megan from 'modules';

export default {
    version (req, res, callback){
        megan.log.debug(req.url);

        let sp_GetAmi_Deeplearning = require('../db/m_ingest/sp_GetAmi_Deeplearning');
        megan.db.execute(sp_GetAmi_Deeplearning.name, {}, (err, rows) => {
            callback(sp_GetAmi_Deeplearning.getResult(rows));
        });
    },
    terminate (req, res, callback){
        megan.log.debug(req.url);

        let sp_ReportWorker_V3 = require('../db/m_ingest/sp_ReportWorker_V3');
        let params = sp_ReportWorker_V3.setParameters(req.query);
        megan.common.validateParameters(params, output => {
            if (output) return callback(megan.common.getParamErr(output));
            megan.db.execute(sp_ReportWorker_V3.name, params, (err, rows) => {
                callback(sp_ReportWorker_V3.getResult(rows));
            });
        });
    }
}