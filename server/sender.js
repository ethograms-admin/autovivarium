
module.exports = {
    checkForAlertsIn(log) {
        var message = '<h3>----- ALERT MESSAGE CONCERNING VIVARIUM SERVER ID: '+ g.config.vivariumName +'</h3>';  
        var send = true;

        // console.log('humidity:' + log.humidity);
        // console.log('humidity high threshold:' + config.humidityAlertAbove);
        // console.log('humidity low threshold:' + config.humidityAlertBelow);
        // console.log('temperature:' + log.temperature);
        // console.log('temperature high threshold:' + config.temperatureAlertAbove);
        // console.log('temperature low threshold:' + config.temperatureAlertBelow);
        // console.log('water:' + log.waterReserve);
        // console.log('water threshold:' + config.waterReserveAlertBelow);

        if (log.humidity <= config.humidityAlertAbove && log.humidity >= config.humidityAlertBelow &&
            log.temperature <= config.temperatureAlertAbove && log.temperature >= config.temperatureAlertBelow &&
            log.waterReserve >= config.waterReserveAlertBelow)
            send = false;

        if (log.humidity > config.humidityAlertAbove)
            message = message.concat('<p>WARNING: high humidity levels (' + log.humidity + ')</p>');
        else if (log.humidity < config.humidityAlertBelow)
            message = message.concat('<p>WARNING: low humidity levels (' + log.humidity + ')</p>');

        if (log.temperature > config.temperatureAlertAbove)
            message = message.concat('<p>WARNING: high temperature levels (' + log.temperature + ')</p>');
        else if (log.temperature < config.temperatureAlertBelow)
            message = message.concat('<p>WARNING: low temperature levels (' + log.temperature + ')</p>');

        if (log.waterReserve < config.waterReserveAlertBelow)
            message = message.concat('<p>WARNING: water reserve running low (' + log.waterReserve + '%)</p>');

        if (send)
            this.send(message);
    },

    send(message) {
      console.log(message);
      console.log('sent!');
    }
    
}