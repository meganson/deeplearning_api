/**
 * Created by megan on 2017-11-03.
 */

"use strict";

const name = 'sp_GetAmi_Deeplearning';
export { name };
export function getResult (rows){
    let strReturn = {};
    if(rows.length > 0) {
        if (typeof rows[0][0].result !== 'undefined') return rows[0][0];
        else {
            strReturn.result = 0;
            strReturn.ver = rows[0][0].ami;
            return strReturn;
        }
    }
    strReturn.result = 1;
    return strReturn;
}