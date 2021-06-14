const express= require("express");

 const app = express();


 const https =require("https");

 const bodyParser=require("body-parser")


app.use(bodyParser.urlencoded({extended:true}))


 app.get("/",function(req,res)
{

res.sendFile(__dirname+"/index.html")


})



app.post("/",function(req,res)
{
  const cityquery=req.body.cityName;

    https.get("https://api.openweathermap.org/data/2.5/weather?q="+cityquery+"&appid=95c0eab8b0da7c9cf41b1f582d8f2ff6&units=metric",function(response){
      console.log(response.statusCode);

      response.on("data",function(data)
    {
      const Weatherdata = JSON.parse(data)
      res.write("<h1>temperature in "+req.body.cityName+ " is "+Weatherdata.main.temp+ " degree celcius </h1>")
      res.write("weather here feels like "+Weatherdata.weather[0].description)
      res.send()


    })
  })

})














 app.listen(3000,function()
{
  console.log(" server is listening at port 3000")
})
