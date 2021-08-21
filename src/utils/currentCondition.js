const request = require('request')

const currentCondition = (key, callback) => {
    const url = 'http://dataservice.accuweather.com/currentconditions/v1/'+encodeURIComponent(key)+'?apikey=8SGZYIAiy6Kir6AnxmIvwlubPY01tGNu'
    request({url,json:true},(error, { body } = {})=>{
      if(error){
        callback('Unable to connect to location services',  undefined)
      }else if(body.Message){
        callback('Unable to find location. Try another Search.', undefined)
      }else{
        var precipitation
        if(body[0].HasPrecipitation === false){
           precipitation = 'No Precipitation'
        }else{
          precipitation = 'Yes Precipitaion'
        }
        callback(undefined, ' Its ' + body[0].WeatherText + ' and the Current Temperature is ' + body[0].Temperature.Metric.Value+ ' ' +body[0].Temperature.Metric.Unit+ ' '+ precipitation)       
      }
    })
  }
module.exports = currentCondition