const express= require("express");
const fs= require("fs")
const app= express();

const PORT = process.env.PORT|| 8080
//  READY THE DATA FORMAT

const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

console.log((tours))

//Let is the user to read the data
app.get(("/"), (req, res)=>{
    res.status(200).json({
        "status":"success",
        "results":tours.lenght,
        data:{
            tours:tours
        }

    })
})


// Let is user create data or post some date on thr client side 




app.listen(PORT, ()=>{
    console.log(`The server is running on ${PORT}`);

})