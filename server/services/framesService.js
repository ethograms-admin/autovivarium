var fs = require('fs');
var globals = require('../globals')
const uuidv4 = require('uuid/v4');

const framesFolder = '../server/database/frames/';


exports.getLatest = function() {

    var latest;
    var frames = [];

    fs.readdirSync(framesFolder).forEach(file => {
        let raw = fs.readFileSync(framesFolder + file);  
        let frame = JSON.parse(raw);

        if (frame.base64.length % 4 != 0)
            frame.base64 += ('=')

        frames.push(frame);
    });

    frames.sort(function(a, b){
        return new Date(b.loggedTime) - new Date(a.loggedTime);
    });

    latest = frames[0];

    return latest;
};

exports.createNew = function(frame) {

    var newFrame = new globals.frameDTO(
        uuidv4(),
        frame.base64,
        new Date
    );

    var jsonToStore = JSON.stringify(newFrame);

    fs.writeFileSync(framesFolder + newFrame.ID + '.json', jsonToStore, 'utf8');

    return newFrame.ID;
};


