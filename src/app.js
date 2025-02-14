const path = require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const port = process.env.PORT || 3000
// define pats for Express config
const publicPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//setup static drectroy to serve
app.use(express.static(publicPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather24',
        name:'filippo'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'filippo'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help page',
        contact:'12345678',
        name:'filippo'
    })
})


app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'You must provide address'
        })
    }

    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({error})
        }
        forecast(data.lat,data.lon,(error,Fdata)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast:Fdata,
                location:data.loc,
                address:req.query.address
            })
        })

    })

/*     res.send({
        forecast: 'snowing',
        location:'torino',
        address: req.query.address
    }) */
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        message:'help article not found !',
        name:'filippo',
        title:'404 Not Found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        message:'page not found !',
        name:'filippo',
        title:'404 Not Found'
    })
})


app.listen(port,()=>{

    console.log('server up on '+port)
})