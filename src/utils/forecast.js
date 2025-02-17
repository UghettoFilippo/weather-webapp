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
            let location= response.body.location
    
            callback(undefined,'In <strong>'+location.name+'</strong> it is currently <strong>'+ bd.temp_c + '</strong> degrees out. It feels like <strong>'+bd.feelslike_c+ "</strong><br>"+
                'The weather condition is <strong>'+bd.condition.text+ "</strong><br>"+
                'Local time : <strong>'+ location.localtime+ "</strong><br>"+
                'Last update: <strong>'+ bd.last_updated+"</strong>"

            )
            
        }
        })
            }

module.exports=forecast