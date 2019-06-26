var framesService = require('../services/framesService');

exports.get = function(req, res) {
    res.send(framesService.getLatest());
};

exports.post = function(req, res) {
    var frame = req.body;
    var newFrameID = framesService.createNew(frame);
    res.send(JSON.stringify(newFrameID));
};

