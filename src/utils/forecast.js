const request = require('request')

//    https://api.darksky.net/forecast/31fa890fa99c7689cb34bea9f206c872/31.23944,30.05611?units=si
const forecast = (longitude,latitude,callback)=>{
    let url = "https://api.darksky.net/forecast/31fa890fa99c7689cb34bea9f206c872/"+latitude+","+longitude+"?units=si"
    //console.log(url)
    request({url , json:true},(connectionError,{body})=>{
        const {error,currently,daily,hourly} = body
        if(connectionError){
            callback("error in getting data from network")
        }else if(error){
            callback(error)
        }else {
            let temperature = currently.temperature
            let precipProbability = currently.precipProbability*100.0
            callback(undefined, 'hi :)   the weather is ' + daily.data[0].summary + ' the highest temprature is '
            + daily.data[0].temperatureHigh
            + '    and the lowwest is ' + daily.data[0].temperatureLow
            + '    it\'s currently ' + temperature 
            + ' degrees out. There is a ' + precipProbability + '% chance of Rain')
        }
    })
}

module.exports = forecast