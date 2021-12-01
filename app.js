const express=require("express");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
    

const https=require("https");

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    
});
app.post("/",function(req,res){
    var city=req.body.cn;
    const api="https://"+"api.openweathermap.org/data/2.5/weather?appid=27b16862a91aae6cf78f0c7a354c7595&q="+city+"&units=metric";
    https.get(api,function(response){
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const desc=weatherData.weather[0].description;
            const ic=weatherData.weather[0].icon;
            const iconUrl="http://openweathermap.org/img/wn/"+ic+"@2x.png";
            res.write("<h1>Currently the temperature in "+city+" is "+temp+" degree celsius</h1>");
            res.write("<h3>Here we can experience "+desc+" conditions</h3>"+"<img src="+iconUrl+">");
            // res.write("<img src="+iconUrl+">");
            res.send();
        });
    });
})
app.listen(3000,function(){
    console.log("Server is fetching data");
});