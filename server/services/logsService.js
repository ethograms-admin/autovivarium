var fs = require('fs');
var globals = require('../globals')
const uuidv4 = require('uuid/v4');

const logsFolder = '../server/database/logs/';


exports.getLast24h = function() {

    var logs = [];

    fs.readdirSync(logsFolder).forEach(file => {
        let raw = fs.readFileSync(logsFolder + file);  
        let log = JSON.parse(raw);  
        logs.push(log);
    });

    var last24h = logs.slice(0, 360);

    last24h.sort(function(a, b){
            return new Date(a.loggedTime) - new Date(b.loggedTime);
    });

    return last24h;
};

exports.createNew = function(log) {

    var newLog = new globals.logDTO(
        uuidv4(),
        log.temperature,
        log.humidity,
        new Date
    );

    var jsonToStore = JSON.stringify(newLog);

    fs.writeFileSync(logsFolder + newLog.ID + '.json', jsonToStore, 'utf8');

    return newLog.ID;
};


