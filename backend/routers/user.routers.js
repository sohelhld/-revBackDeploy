
const express = require('express');
const { userModel } = require('../model/user.model');
const userRouter = express.Router()


userRouter.post("/resister",async(req,res)=>{
    const {Title,Author,Genre ,Description ,Price} = req.body
try {

    const isdataPresent = await userModel.findOne({Title})
    if(isdataPresent) return res.send("books is alraday present")


    const data = new userModel({Title,Author,Genre,Description,Price})

    await data.save()

    res.send("book is resister")
    
} catch (error) {
    res.send(error.message)
}
})

userRouter.get("/all",async(req,res)=>{
    const {minPrice,maxPrice,Genre}=req.query
    const query ={}
    if(minPrice){
        query.Price ={$gte:minPrice}
    }

    if(maxPrice){
      if(query.Price){
        query.Price.$lte=maxPrice
      }else{
        query.Price={$lte:maxPrice}
      }   
    }


    if(Genre){
       query.Genre =Genre
    }

 

    console.log(query);




    // const quary = req.query
    try {
       const user =await userModel.find(query)
        res.status(200).send(user)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

userRouter.delete("/delete/:userID",async(req,res)=>{
    const {userID}= req.params

    try {
        await userModel.findByIdAndDelete({_id:userID})
        res.status(200).send({msg:"data is delleted"})
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// userRouter.get('/filter',async (req, res) => {
//     const genre = req.params;

//     try {
//        const user =await userModel.find(genre)
//         res.status(200).send(user)
//     } catch (err) {
//         res.status(400).send(err.message)
//     }
//   });
  
//   userRouter.get('/sort', async (req, res) => {
//     const {minprice,maxprice} = req.params;

//     try {
//        const user =await userModel.find({minprice,maxprice})
//         res.status(200).send(user)
//     } catch (err) {
//         res.status(400).send(err.message)
//     }
//   });
  


module.exports={
    userRouter
}

