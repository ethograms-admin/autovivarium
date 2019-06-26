var fs = require('fs');
var globals = require('../globals')
const uuidv4 = require('uuid/v4');

const conclusionsFolder = '../server/database/conclusions/';


exports.getAll = function() {

    var conclusions = [];

    fs.readdirSync(conclusionsFolder).forEach(file => {
        let raw = fs.readFileSync(conclusionsFolder + file);  
        let conclusion = JSON.parse(raw);  
        conclusions.push(conclusion);
    });

    conclusions.sort(function(a, b){
            return new Date(b.loggedTime) - new Date(a.loggedTime);
    });

    return conclusions;
};

exports.createNew = function(conclusion) {

    var newConclusion = new globals.conclusionDTO(
        uuidv4(),
        conclusion.text,
        new Date
    );

    var jsonToStore = JSON.stringify(newConclusion);

    fs.writeFileSync(conclusionsFolder + newConclusion.ID + '.json', jsonToStore, 'utf8');

    return newConclusion.ID;
};


