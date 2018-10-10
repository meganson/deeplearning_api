/**
 * Created by megan on 2017-11-01.
 */

'use strict';

import winston from 'winston';
import 'winston-daily-rotate-file';
import fs from 'fs';
import moment from 'moment';
import * as config from './configModule';
import date from './dateModule';

let logDir = config.conf.log.dir;
if(!fs.existsSync(logDir)){
    fs.mkdirSync(logDir);
}
logDir += config.conf.appName;
if(!fs.existsSync(logDir)){
    fs.mkdirSync(logDir);
}

let seoulZone = date.getTimeDifference() + 9;

let customLog = {
    levels: {
        emerg: 0,
        alert: 1,
        crit: 2,
        error: 3,
        warn: 4,
        notice: 5,
        info: 6,
        debug: 7
    },
    colors: {
        emerg: 'red',
        alert: 'yellow',
        crit: 'red',
        error: 'red',
        warn: 'red',
        notice: 'yellow',
        info: 'green',
        debug: 'blue'
    }
};

let logger = new (winston.Logger)({
    levels: customLog.levels,
    colors: customLog.colors,
    timestamp: true,
    transports: [
        // Console transport
        new (winston.transports.Console)({
            level: config.conf.log.consoleLevel || 'debug',
            colorize: true,
            timestamp: () => { return date.getBarDatetimeMsFormat_24(date.getDatetime() + seoulZone); }
        }),
        // File transport
        // new (winston.transports.File)({
        //     level: 'debug',
        //     colorize: true,
        //     silent: false,
        //     timestamp: function(){ return moment().format('YYYY-MM-DD hh:mm:ss.SSS') },
        //     name: 'debug-file',
        //     filename: `${logDir}_debug.log.${moment().format('YYYYMMDD')}`,
        //     maxFiles: 2,
        //     json: false
        //         //moment().format('YYYYMMDD')+'.log';
        // }),
        // File transport
        new winston.transports.DailyRotateFile({
            level: 'debug',
            colorize: true,
            timestamp: () => { return date.getBarDatetimeMsFormat_24(date.getDatetime() + seoulZone); },
            name: 'debug-file',
            filename: `${logDir}/debug.`,
            datePattern: `${date.getDateFormat_24(date.getDatetime() + seoulZone)}.log`,
            maxFiles: 5,
            json: false
        }),
        new winston.transports.DailyRotateFile({
            level: 'error',
            colorize: true,
            timestamp: () => { return date.getBarDatetimeMsFormat_24(date.getDatetime() + seoulZone); },
            name: 'error-file',
            filename: `${logDir}/error.`,
            datePattern: `${date.getDateFormat_24(date.getDatetime() + seoulZone)}.log`,
            maxFiles: 5,
            json: false
        })
    ]
    // ,
    // exceptionHandlers: [
    //     // Console transport
    //     new (winston.transports.Console)(),
    //
    //     // new winston.transports.File({
    //     new (require('winston-daily-rotate-file'))({
    //         filename: `${logDir}_exceptions.log.`,
    //         datePattern: 'yyyyMMdd',
    //         maxFiles: 2
    //     })
    // ]
});

if(!(config.conf.log.fileDebug || true))
    logger.remove('debug-file');

if(!(config.conf.log.fileError || true))
    logger.remove('error-file');

export default {
    debug () {
        logger.debug.apply(logger, arguments);
    },
    info () {
        logger.info.apply(logger, arguments);
    },
    notice () {
        logger.notice.apply(logger, arguments);
    },
    warn () {
        logger.warn.apply(logger, arguments);
    },
    error () {
        logger.error.apply(logger, arguments);
    },
    crit () {
        logger.crit.apply(logger, arguments);
    },
    alert () {
        logger.alert.apply(logger, arguments);
    },
    emerg () {
        logger.emerg.apply(logger, arguments);
    }
}