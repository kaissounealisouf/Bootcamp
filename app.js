const express= require("express");
const fs= require("fs")
const app= express();

const PORT = process.env.PORT|| 8080
//  READY THE DATA FORMAT
app.use(express.json())
const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

//Let is the user to read the data
app.get(("/api/v1/tours"), (req, res)=>{
    res.status(200).json({
        "status":"success",
        "results":tours.length,
        data:{
            tours:tours
        }

    })
})


// Let is user create data or post some date on thr client side 

app.post(("/api/v1/tours"), (req,res)=>{
//Get the last id of the products

const NewId= tours[tours.length-1].id + 1;
console.log(NewId);

//Assign the object 
const newTour= Object.assign({id:NewId});
console.log(newTour);

//Push the data posting or creating  or Writing by the User into the application Json.

tours.push(newTour)





res.send("is done")
   
}
)


app.listen(PORT, ()=>{
    console.log(`The server is running on ${PORT}`);

})