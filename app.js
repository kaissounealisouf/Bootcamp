const { ifError } = require("assert");
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

//Request ID parameters:

app.get(("/api/v1/tours/:id"), (req, res)=>{
    console.log(req.params);
     
    const id=req.params.id *1;
    const tour=tours.find(el =>el.id===id)
    console.log(tour)

    // if (id>tours.length || !tour){
        if( !tour){
          return res.status(400).json(
            {
                "message":"invalid request"
            }
        )
        
    } 
        

    res.status(200).json({
        status:"success",
        data:{
            tour:tour
        }
       
    })
})

//Let is user create data or post some date on the client side 

app.post(("/api/v1/tours"), (req,res)=>{
//Get the last id of the products

const NewId= tours[tours.length-1].id + 1;

//Assign the object 
const newTour= Object.assign({id:NewId}, req.body);
console.log(newTour);
// Now the let us  write /create the file 
fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err=>{
    res.status(201).json({
        status: "success",
        data:{
            tours:newTour
        }
    })
});

//Push the data posting or creating  or Writing by the User into the application Json.
 tours.push(newTour)
  
}
)


app.listen(PORT, ()=>{
    console.log(`The server is running on ${PORT}`);

})