/**
 * Created by megan on 2017-11-01.
 */

process.env.NODE_PATH = __dirname;
require('module').Module._initPaths();

import cluster from 'cluster';
import log from './modules/logModule';

if(cluster.isMaster){
    cluster.fork();

    cluster.on('exit', function(worker, code, signal){
        log.notice('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        log.notice('Starting a new worker');
        cluster.fork();
    });
}else{
    let express = require('express');
    let app = express();
    let bodyParser = require('body-parser');

    let config = require('modules/configModule');

    let common = require('routes/common');
    let jobs = require('routes/jobs');
    let workers = require('routes/workers');

    let resTimeout = function(req, res, next){
        res.setTimeout(20 * 1000, function(){
            log.warn('Response has timed out.');
            res.send(408);
        });
        next();
    };

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(resTimeout);

    /**
     * api version 1.0
     */
    // 딥러닝용 잡 체크
    app.get('/v1/job', jobs.getJob);
    // 딥러닝용 잡 보고
    app.post('/v1/job', jobs.reportJob);

    // 딥러닝용 워커 버전
    app.get('/v1/version', workers.version);
    // 딥러닝용 서버 종료 보고
    app.get('/v1/terminate', workers.terminate);

    app.get('/test', jobs.test);
    let server = app.listen(config.conf.port, () => {
        let host = server.address().address;
        let port = server.address().port;
        log.info('Server listening on ', host, port);
    });
}
