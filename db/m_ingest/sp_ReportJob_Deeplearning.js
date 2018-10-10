/**
 * Created by megan on 2017-11-01.
 */

"use strict";

const name = 'sp_ReportJob_Deeplearning';
export { name };
export function setParameters (data) {
    return [
        {
            name: 'jobId',
            value: data.jobId
        },
        {
            name: 'jobState',
            value: data.jobState
        },
        {
            name: 'errCode',
            value: data.errCode
        }
    ];
}

export function getResult (rows){
    let strReturn = {};
    if(rows.length > 0){
        if (typeof rows[0][0].result !== 'undefined') return rows[0][0];
        else {
            strReturn.result = 0;
            return strReturn;
        }
    }
    strReturn.result = 1;
    return strReturn;
}