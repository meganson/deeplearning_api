/**
 * Created by megan on 2017-11-01.
 */

'use strict';

import mysql from 'mysql';
import log from './logModule';

let config = require('./configModule');

let pool = mysql.createPool({
    connectionLimit : config.conf.db.connLimit,
    host : config.conf.db.hostname,
    user : config.conf.db.username,
    password : config.conf.db.password,
    port : config.conf.db.port,
    database : config.conf.db.database
});

export default {
    getConnection (callback) {
        pool.getConnection((err, connection) => {
            if(err){
                log.error(err.code);
                callback(err);
                return;
            }
            connection.release();
            callback(connection);
        });
    },
    // procedure execute
    execute (sp, params, callback){
        pool.getConnection((err, connection) => {
            if(err){
                log.error(err.code);
                return callback(err, null);
            }

            let p = [], sql;
            for(let i = 0; i < params.length; i++){
                p.push(params[i].value);
            }

            (p.length > 0) ? sql = "call " + sp + "(" + mysql.escape(p) + ");" : sql = "call " + sp + "();";
            connection.query(sql, (err, rows, fields) => {
                if(err){
                    log.error(err);
                    return callback(err, null);
                }
                connection.release();
                if(rows.length > 0) rows.pop();
                log.debug(rows);
                callback(null, rows);
            });
        });
    },
    // streaming execute
    stream_execute (sp, params, callback){
        pool.getConnection((err, connection) => {
            if(err){
                log.error(err.code);
                return callback(err);
            }

            let p = [];
            for(let i = 0; i < params.length; i++){
                p.push(params[i].value);
            }

            let sql, result = [];
            (p.length > 0) ? sql = "call " + sp + "(" + mysql.escape(p) + ");" : sql = "call " + sp + "();";
            let query = connection.query(sql);

            query.on('error', (err) => {
                log.error(err);
                callback(err);
            });

            query.on('fields', (fields, index) => {

            });

            query.on('result', (rows, index) => {
                log.debug(rows);
                result.push(rows);
            });

            query.on('end', () => {
                connection.release();
                callback(result.shift());
            });
        });
    },
    // sql query
    query (sql, callback){
        pool.getConnection((err, connection) => {
            if(err){
                log.error(err.code);
                return callback(err);
            }

            connection.query(sql, (err, rows, fields) => {
                if(err){
                    log.error(err);
                    connection.release();
                    return callback(err);
                }
                log.debug(params, rows, fields);
                connection.release();
                callback(rows[0]);
            });
        });
    }
}