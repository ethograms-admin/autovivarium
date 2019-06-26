
var fs = require('fs');
var path = require('path');
var uptime = new Date;
var sender = require('./sender');

let logDTO = class LogDTO {
    constructor(ID, 
                temperature, 
                humidity, 
                loggedTime) {
                    this.ID = ID;
                    this.temperature = temperature;
                    this.humidity = humidity;
                    this.loggedTime = loggedTime;
    }    
}

let conclusionDTO = class ConclusionDTO {
    constructor(ID,
                text, 
                loggedTime) {
                    this.ID = ID;
                    this.text = text;
                    this.loggedTime = loggedTime;
    }    
}

let frameDTO = class FrameDTO {
    constructor(ID,
                base64, 
                loggedTime) {
                    this.ID = ID;
                    this.base64 = base64;
                    this.loggedTime = loggedTime;
    }    
}

module.exports = {
    fs,
    uptime,
    sender,
    logDTO,
    conclusionDTO,
    frameDTO
}




