/**
 * Created by megan on 2017-11-09.
 */

'use strict';

import mongodb from 'mongodb';
import * as config from './configModule';
import log from './logModule';

const host = config.conf.mongo.url;
const name = config.conf.mongo.database;
let db, coll;

new mongodb.MongoClient.connect(`${host}${name}`)
    .then((database) => {
        db = database;
        log.info(`Connected to mongod server on :: ${host}${name}`);
    }, err => {
        log.error(err);
});

export default {
    find (collection, params, callback){
        coll = db.collection(collection);
        // return new Promise((resolve, reject) => {
        //     coll.find(params).toArray().then((err, docs) => {
        //         console.error(err, docs)
        //         if (err) return reject;
        //         log.info(docs);
        //         resolve(docs);
        //     }).catch((err) => log.error(err));
        //
        //     // coll.find(params).toArray(err, docs)
        //     //     .then((err, docs) => {
        //     //         if (err) throw err;
        //     //         log.info(docs);
        //     //         resolve(docs);
        //     //     }).catch((err) => log.error('find error', err));
        // });

        coll.find(params).toArray((err, docs) => {
            if (err) throw err;
            log.info('find success');
            log.debug('find success', JSON.stringify(docs));
            callback(docs);
        });
    },
    findOne(collection, params){
        coll = db.collection(collection);
        return new Promise((resolve, reject) => {
            coll.findOne(params, {}).then((doc)  => {
                log.info('findOne success');
                log.debug('find success', JSON.stringify(doc));
                resolve(doc);
            }).catch((err) => {
                log.error('findOne error', err);
                reject();
            });
        });
    },
    findOneAndUpdate(collection, params, updates){
        coll = db.collection(collection);
        coll.findOneAndUpdate(params, updates, (err, result) => {
            if(!err){
                log.debug('findOneAndUpdate success', JSON.stringify(result));
                return log.info('findOneAndUpdate success');
            }
            log.error('findOneAndUpdate error', err);
        });
    },
    save(collection, model){
        coll = db.collection(collection);
        coll.save(model, (err, data) => {
            if(!err){
                log.debug('save success', JSON.stringify(data));
                return log.info('save success');
            }
            log.error(err);
        });
    },
    updateOne(collection, params, update, options){
        coll = db.collection(collection);
        log.debug(collection, params, update);
        coll.updateOne(params, update, {upsert: true});
    }
}