const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=8SGZYIAiy6Kir6AnxmIvwlubPY01tGNu&q='+ encodeURIComponent(address)
    request({url,json:true},(error, {body} = {})=>{
      if(error){
        callback('Unable to connect to location services',  undefined)
      }else if(body.length ===0){
        callback('Unable to find location. Try another Search.', undefined)
      }else{
        callback(undefined,{
          Key:body[0].Key,
          city: body[0].LocalizedName,
          country: body[0].Country.LocalizedName
        } )
      }
    })
  }
module.exports = geocode