const path = require('path')
const express = require('express')
const hbs =require('hbs')
const geocode = require('./utils/geocede')
const currentCondition = require('./utils/currentCondition')
const app = express()

//Define paths for Express config
app.use(express.static(path.join(__dirname, '../public')))

const viewsPath= path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(rew, res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'nimit'    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name :'Nimit'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'This is for your help',
        name:'Nimit'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Address is required'
        })
    }
    geocode(req.query.address,(error,{Key, city, country} = {})=>{
        if(error){
            return res.send({error})
        }
        currentCondition(Key,(error,currentData)=>{
            if (error){return res.send({error})}
            res.send({
                forecast: currentData,
                location: city+ ' ' + country,

            })
        })
    })
})
    

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render("error",{
        message:"Help article not found",
        title: "Error 404",
        name: 'Nimit'
    })
})


app.get('*',(req,res)=>{
    res.render('error',{
        title:"ERROR 404",
        message:"Page Not Found",
        name: "Nimit"
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})