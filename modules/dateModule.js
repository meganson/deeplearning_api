/**
 * Created by megan on 2017-11-01.
 */

'use strict';

import moment from 'moment';

export default {
    getTimeDifference (){
        let d = new Date();
        //time diff
        let tdm = d.getTimezoneOffset();
        return tdm / 60;
    },
    getNowHoursTimezone (th) {
        let d = new Date();
        //time diff
        let tdm = d.getTimezoneOffset();
        let tdh = (tdm / 60);

        let h = d.getHours();
        h = (h + (tdh + th)) % 24;
        return h;
    },
    getDatetime () {
        return new Date().getTime();
    },
    getDatetimeFormat (date) {
        return new Date(date).getTime();
    },
    getBarDatetime () {
        return moment(new Date().getTime()).format('YYYY-MM-DD hh:mm:ss');
    },
    getBarDatetimeMs () {
        return moment(new Date().getTime()).format('YYYY-MM-DD hh:mm:ss.SSS');
    },
    getBarDatetimeMsFormat () {
        return moment(date).format('YYYY-MM-DD hh:mm:ss.SSS');
    },
    getBarDatetime_24 () {
        return moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss');
    },
    getBarDatetimeMs_24 () {
        return moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss.SSS');
    },
    getBarDatetimeMsFormat_24 (date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss.SSS');
    },
    getDate_24 () {
        return moment(new Date().getTime()).format('YYYYMMDD');
    },
    getDateFormat_24 (date) {
        return moment(date).format('YYYYMMDD');
    },
    addDays (days) {
        let date = new Date();
        date.setDate(date.getDate() + parseInt(days));
        return date;
    },
    subtractDays (days) {
        let date = new Date();
        date.setDate(date.getDate() - parseInt(days));
        return date;
    }
}
