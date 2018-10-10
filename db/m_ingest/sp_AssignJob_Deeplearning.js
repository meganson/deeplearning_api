/**
 * Created by megan on 2017-11-03.
 */

"use strict";

const name = 'sp_AssignJob_Deeplearning';
export { name };
export function setParameters (data) {
    return [
        {
            name: 'workerId',
            value: data.workerId
        }
    ];
}

export function getResult (rows){
    let strReturn = {};
    if(rows.length > 0){
        if (typeof rows[0][0].result !== 'undefined') return rows[0][0];
        else{
            strReturn.result = 0;
            strReturn.jobList = rows[0];
            return strReturn;
        }
    }
    strReturn.result = 1;
    return strReturn;
}