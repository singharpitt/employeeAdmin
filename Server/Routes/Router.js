const express=require('express');
const Router=express.Router();
const Users=require('../Models/UserSchema')

Router.post('/register',async (req, res) => {
    const {name,email,age,mobile,work,add,desc}=req.body;
    if(!name || !email || !age || !mobile || !work || !add || !desc)
    {
        res.status(404).json("plz fill the field");
    }
    try
    {
        const preuser=await Users.findOne({email:email});
        console.log(preuser);
        if(preuser)
        res.status(404).json("this user already exist");
        else
        {
            const addUser=new Users({
                name:name,
                email:email,
                age:age,
                mobile:mobile,
                work:work,
                add:add,
                desc:desc
            });
            await addUser.save();
            res.status(201).json(addUser);
        }

    }
    catch(err)
    {
        res.status(404).json(err);
    }
});



Router.get('/getdata', async(req,res)=>{
    try
    {
        const RegisterUsers=await Users.find();
        console.log(RegisterUsers);
        res.status(201).json(RegisterUsers);

    }
    catch(err)
    {
        res.status(404).json(err);
    }
})



Router.get('/getuser/:id',async (req,res)=>{
    try{
        console.log(req.params);
        const {id}=req.params;

        const userIndividual=await Users.findById({_id:id});
        console.log(userIndividual);
        res.status(201).json(userIndividual);
    }
    catch(err)
    {
        res.status(404).json(err);
    }
})



Router.patch('/updateuser/:id',async (req,res)=>{
    let {id}=req.params;
    try
    {
        const updateUser= await Users.findByIdAndUpdate(id,req.body,{
            new:true
        });
        res.status(201).json(updateUser);
    }
    catch(err)
    {
        console.log(err);
        res.status(404).json(updateUser);
    }
})



Router.delete('/deleteuser/:id',async(req,res)=>{
    try
    {
        const {id}=req.params;
        const deleteUserId=await Users.findByIdAndDelete({_id:id});
        console.log(deleteUserId);
        res.status(201).json(deleteUserId);

    }
    catch(err)
    {
        res.status(404).json(err);
    }
})
module.exports=Router;