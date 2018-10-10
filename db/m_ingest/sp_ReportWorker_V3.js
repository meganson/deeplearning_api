/**
 * Created by megan on 2017-11-03.
 */

"use strict";

const name = 'sp_ReportWorker_V3';
export { name };
export function setParameters (data) {
    return [
        {
            name: 'workerId',
            value: data.workerId
        },
        {
            name: 'workerStatus',
            value: 'S'
        }
    ];
}

export function getResult(rows){
    if(rows.length > 0)
        return { 'result': rows[0][0].result };
    return { 'result': 1 };
}