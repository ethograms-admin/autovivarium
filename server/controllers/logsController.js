var logsService = require('../services/logsService');

exports.get = function(req, res) {
    res.send(logsService.getLast24h());
};

exports.post = function(req, res) {
    var log = req.body;
    var newLogID = logsService.createNew(log);
    res.send(JSON.stringify(newLogID));
};

