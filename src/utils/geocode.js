const request = require("request")


const geoCodeing = (address, callback) => {

    const geoUrl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiMTNtYWRoYXYiLCJhIjoiY2tpdmhlMXFrMGptYzJzbWViMzZmbHpqcCJ9.3MB36BYlh0dT9QCO8dhYKQ&limit=1'
    request({url:geoUrl,json:true},(error,{body})=>{
        if(error)
        {
            callback("Not able to conenct with Weather Stack API",undefined)
        }  
        else if(body.features.length === 0)
        {
            callback(body.message,undefined)
        }
        else
        {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                place: body.features[0].place_name
            })
        }

    })
}
module.exports = geoCodeing