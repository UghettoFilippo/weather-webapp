const request=require('request')

const geocode=(address,callback)=>{
    const url='http://api.weatherapi.com/v1/current.json?key=1dbcad049170487e93c91813251202&q='+encodeURIComponent(address)
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect',undefined)
        }else if(response.body.error){
            callback('unable to find location',undefined)
        }else{
            const rbl=response.body.location;
            callback(undefined, {
                loc:rbl.name + ','+rbl.region+ ','+rbl.country,
                lat:rbl.lat,
                lon:rbl.lon
            })
   
        }
    })
}



module.exports = geocode