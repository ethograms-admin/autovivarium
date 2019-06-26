const server = 'http://31.14.131.42:3111';
// const server = 'http://localhost:3111';


// first component

var data;
var proxyDataAll = '';
var proxyDataPreview = '';
var temperatureData = [];
var humidityData = [];


var canvasHumidity = document.getElementById('humidity-linechart-canvas');  
var canvasTemperature = document.getElementById('temperature-linechart-canvas');  
var contextHumidity = canvasHumidity.getContext('2d');  
var contextTemperature = canvasTemperature.getContext('2d');  
   
var canvasTop = 0;  
var canvasBottom = 400;  
var canvasLeft = 0;  
var canvasRight = 946;   
var markingsMargin = 10;   

var canvasHeight = 200;   
var canvasWidth = 950;  
   
contextHumidity.clearRect(0, 0, canvasWidth, canvasHeight);   
   
contextHumidity.beginPath();  
contextHumidity.moveTo(canvasLeft, canvasBottom);  
contextHumidity.lineTo(canvasRight, canvasBottom); 
contextHumidity.moveTo(canvasLeft, canvasBottom);  
contextHumidity.lineTo(canvasLeft, canvasTop);  

contextHumidity.stroke();  
   


contextTemperature.clearRect(0, 0, canvasWidth, canvasHeight);   
   
contextTemperature.beginPath();  
contextTemperature.moveTo(canvasLeft, canvasBottom);  
contextTemperature.lineTo(canvasRight, canvasBottom); 
contextTemperature.moveTo(canvasLeft, canvasBottom);  
contextTemperature.lineTo(canvasLeft, canvasTop);  

contextTemperature.stroke();  
   

const xhr = new XMLHttpRequest()

xhr.onreadystatechange = () => {

  if (xhr.readyState === 4) {

        if (xhr.status === 200) {

            data = JSON.parse(xhr.responseText);
            // console.log(data);

            proxyDataPreview = '<div class="table-row"><div class="table-column">date</div><div class="table-column">temperature</div><div class="table-column">humidity</div></div>';
            proxyDataAll = proxyDataPreview;

            var highestHumidity = 0;  
            var highestTemperature = 0;  

            for (let index = 0; index < data.length; index++) {
                const reading = data[index];
                
                var newRow = '<div class="table-row">' + 
                                '<div class="table-column">' + reading.loggedTime + '</div>' +  
                                '<div class="table-column">' + reading.temperature + ' C</div>' +
                                '<div class="table-column">' + reading.humidity + '%</div>' +
                              '</div>'

                if (index < 10)
                    proxyDataPreview = proxyDataPreview.concat(newRow);

                proxyDataAll = proxyDataAll.concat(newRow);
                
                if (reading.humidity > highestHumidity)
                    highestHumidity = reading.humidity;  
                                    
                if (reading.temperature > highestTemperature)
                    highestTemperature = reading.temperature;  

                temperatureData.push(reading.temperature);
                humidityData.push(reading.humidity);
            }

            proxyTemperatureHumidityData.rows = proxyDataPreview;

            var margin = 10;
            var marginTime = 20;
            var originalHighestHumidity = highestHumidity;
            console.log(originalHighestHumidity);
            highestHumidity = highestHumidity + margin;

            contextHumidity.beginPath();   
            contextHumidity.strokeStyle = "blue";   
            contextHumidity.moveTo(canvasLeft, (canvasHeight - humidityData[0] / highestHumidity * canvasHeight) + canvasTop);
            
            for( var i = 1; i < humidityData.length; i++ ) {
                contextHumidity.lineTo(canvasRight / humidityData.length * i + canvasLeft, (canvasHeight - humidityData[i] / highestHumidity * canvasHeight) + canvasTop);  

                var loggedDate = new Date(data[i].loggedTime);

                if (loggedDate.getHours() == 0 &&
                    loggedDate.getMinutes() == 0) {
                    contextHumidity.fillText(loggedDate.toLocaleTimeString(), 
                                             canvasRight / humidityData.length * i + canvasLeft, 
                                             (canvasHeight - humidityData[i] / highestHumidity * canvasHeight) + canvasTop - marginTime);  
                    
                    contextHumidity.fillRect(canvasRight / humidityData.length * i + canvasLeft, 
                                             (canvasHeight - humidityData[i] / highestHumidity * canvasHeight) + canvasTop - marginTime, 
                                             1, 
                                             200);
                }

                var previousFillStyle = contextHumidity.fillStyle;
                contextHumidity.fillStyle = "#8dc3be";   

                if (originalHighestHumidity == humidityData[i])
                    contextHumidity.fillRect(canvasRight / humidityData.length * i + canvasLeft, 
                                                    (canvasHeight - humidityData[i] / highestHumidity * canvasHeight) + canvasTop - margin,
                                                    2,
                                                    200);  
                contextHumidity.fillStyle = previousFillStyle;   
                   
            }   

            contextHumidity.stroke();


            for( var i = 0; i < highestHumidity; i++ ) {  
                contextHumidity.beginPath();   

                contextHumidity.fillText(i * 10, 
                                         canvasRight - markingsMargin, 
                                         (canvasHeight - (i*10) / highestHumidity * canvasHeight) + canvasTop);  
                
                contextHumidity.stroke();

                contextHumidity.beginPath();   
                contextHumidity.strokeStyle = '#aaa';  
               
                contextHumidity.moveTo(canvasLeft, (canvasHeight - (i*10) / highestHumidity * canvasHeight) + canvasTop);  
                contextHumidity.lineTo(canvasRight, (canvasHeight - (i*10) / highestHumidity * canvasHeight) + canvasTop);  

                contextHumidity.stroke();
            }   




            



            var margin = 10;
            var originalHighestTemperature = highestTemperature;
            highestTemperature = highestTemperature + margin;

            contextTemperature.beginPath();   
            contextTemperature.strokeStyle = "red";   

            contextTemperature.moveTo(canvasLeft, (canvasHeight - temperatureData[0] / highestTemperature * canvasHeight) + canvasTop);
            
            for( var i = 1; i < temperatureData.length; i++ ) {  

                contextTemperature.lineTo(canvasRight / temperatureData.length * i + canvasLeft, (canvasHeight - temperatureData[ i ] / highestTemperature * canvasHeight) + canvasTop);  

                var loggedDate = new Date(data[i].loggedTime);

                if (loggedDate.getHours() == 0 &&
                    loggedDate.getMinutes() == 0) {
                        contextTemperature.fillText(loggedDate.toLocaleTimeString(), 
                                             canvasRight / temperatureData.length * i + canvasLeft, 
                                             (canvasHeight - temperatureData[i] / highestTemperature * canvasHeight) + canvasTop - marginTime);  
                    
                                             contextTemperature.fillRect(canvasRight / temperatureData.length * i + canvasLeft, 
                                             (canvasHeight - temperatureData[i] / highestTemperature * canvasHeight) + canvasTop - marginTime, 
                                             1, 
                                             200);
                }

                var previousFillStyle = contextTemperature.fillStyle;
                contextTemperature.fillStyle = "#8dc3be";   

                if (originalHighestTemperature == temperatureData[i])
                    contextTemperature.fillRect(canvasRight / temperatureData.length * i + canvasLeft, 
                                                (canvasHeight - temperatureData[i] / highestTemperature * canvasHeight) + canvasTop - marginTime,
                                                2,
                                                200);  
                contextTemperature.fillStyle = previousFillStyle;   

            }  

            contextTemperature.stroke();


            for( var i = 0; i < highestTemperature; i++ ) {  
                contextTemperature.beginPath();   

                contextTemperature.fillText(i * 10, 
                                         canvasRight - markingsMargin, 
                                         (canvasHeight - (i*10) / highestTemperature * canvasHeight) + canvasTop);  

                contextTemperature.stroke();

                contextTemperature.beginPath();   
                contextTemperature.strokeStyle = '#aaa';  

                contextTemperature.moveTo(canvasLeft, (canvasHeight - (i*10) / highestTemperature * canvasHeight) + canvasTop);  
                contextTemperature.lineTo(canvasRight, (canvasHeight - (i*10) / highestTemperature * canvasHeight) + canvasTop);  

                contextTemperature.stroke();
            }   

        }
        else    
            console.error(xhr.responseText);
    }
}
xhr.open('GET', server + '/api/logs')
xhr.send()

var dataTable = {
    rows: '<div class="table-row"><div class="table-column">date</div><div class="table-column">temperature</div><div class="table-column">humidity</div></div>'
};








const proxyTemperatureHumidityData = new Proxy(dataTable, {  
    set: (target, property, value) => {
        target[property] = value
        table.render(dataTable)
    }  
})

const table = document.querySelector('.readings-table')

table.template = table.innerHTML  
table.render = function render (data) {  
    this.innerHTML = this.template.replace(/\{\{\s?(\w+)\s?\}\}/g, (match, variable) => {
        return data[variable] || ''
    })
}












// second component

var conclusionsDataTable = {
    rows: ''
};

const proxyConclusionsData = new Proxy(conclusionsDataTable, {  
    set: (target, property, value) => {
        target[property] = value
        conclusions.render(conclusionsDataTable)
    }  
})

const conclusions = document.querySelector('.conclusions-table')

conclusions.template = conclusions.innerHTML  
conclusions.render = function render (data) {  
    this.innerHTML = this.template.replace(/\{\{\s?(\w+)\s?\}\}/g, (match, variable) => {
        return data[variable] || ''
    })
}


const conclusionsXHR = new XMLHttpRequest()
conclusionsXHR.onreadystatechange = () => {

  if (conclusionsXHR.readyState === 4) {

        if (conclusionsXHR.status === 200) {

            var data = JSON.parse(conclusionsXHR.responseText);
            // console.log(data);

            data.forEach(reading => {
                proxyConclusionsData.rows = proxyConclusionsData.rows.concat(
                    '<p class="boxed">' + reading.text + '</p>'
                );
            });
        }
    }
}

conclusionsXHR.open('GET', server + '/api/conclusions')
conclusionsXHR.send()

function expandReadings() {
    proxyTemperatureHumidityData.rows = proxyDataAll;
    var expandLink = document.getElementById("expand-link");
    expandLink.classList.add("hidden");
}



















// third component

var frameData = {
    base64inImgTag: ''
};

const proxyFrameData = new Proxy(frameData, {  
    set: (target, property, value) => {
        target[property] = value
        webcam.render(frameData)
    }  
})

const webcam = document.querySelector('.webcam-feed')

webcam.template = webcam.innerHTML  
webcam.render = function render (data) {  
    this.innerHTML = this.template.replace(/\{\{\s?(\w+)\s?\}\}/g, (match, variable) => {
        return data[variable] || ''
    })
}


const lastFrameXHR = new XMLHttpRequest()
lastFrameXHR.onreadystatechange = () => {

  if (lastFrameXHR.readyState === 4) {

        if (lastFrameXHR.status === 200) {
            var data = JSON.parse(lastFrameXHR.responseText);
            proxyFrameData.base64inImgTag = '<img src="data:image/png;base64, ' + data.base64 + '" alt="webcam feed" height="400" width="600">';
        }
    }
}

lastFrameXHR.open('GET', server + '/api/frames')
lastFrameXHR.send()
