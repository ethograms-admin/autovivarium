var conclusionsService = require('../services/conclusionsService');

exports.get = function(req, res) {
    res.send(conclusionsService.getAll());
};

exports.post = function(req, res) {
    var conclusion = req.body;
    var newConclusionID = conclusionsService.createNew(conclusion);
    res.send(JSON.stringify(newConclusionID));
};

