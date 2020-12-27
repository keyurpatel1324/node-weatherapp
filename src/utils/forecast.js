const request= require('request')

const forecast = (lat, long, callback) => {

    const url='http://api.weatherstack.com/current?access_key=fcea1be44f460f18d89335c6ae8497ff&query='+lat+','+long
    
    request({url,json: true},(error, {body})=>{

        if(error)
        {
            callback("Not able to conenct with Weather Stack API", undefined)
        }
        else if(body.error)
        {
            callback("Error Occured "+body.error.info+ " Error Code: "+body.error.code, undefined)
        }
        else
        {
            callback(undefined,{
                temp:body.current.temperature,
                feelslike: body.current.feelslike,
                humidity: body.current.humidity
            })
        }
    })
}

module.exports = forecast








// const url='http://api.weatherstack.com/current?access_key=fcea1be44f460f18d89335c6ae8497ff&query=37.8267,-122.4233&units=f'
// request({url:url,json:true},(error,response,body) => {

// if(error)
// {
// console.log("Not able to conenct with Weather Stack API")
// }
// else if(body.error)
// {
//     console.log("Error Occured "+body.error.info+ " Error Code: "+body.error.code)
// }
// else
// {
//     console.log("Currently its "+body.current.temperature+" out here and its feels like "+body.current.feelslike+" weather description is "+body.current.weather_descriptions[0]) 
// }
 
// })