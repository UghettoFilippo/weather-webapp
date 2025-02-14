const request=require('request')

const forecast = (lat,lon, callback)=>{

    const url='http://api.weatherapi.com/v1/current.json?key=1dbcad049170487e93c91813251202&q='+encodeURIComponent(lat)+","+encodeURIComponent(lon)

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect',undefined)
        }else if(response.body.error){
            callback('cannot find the location',undefined)
        }else{

            let bd=response.body.current
            let location= response.body.location.name
            callback(undefined,'in '+location+' it is currently '+ bd.temp_c + ' degrees out. It feels like '+bd.feelslike_c)
        }
        })
            }

module.exports=forecast