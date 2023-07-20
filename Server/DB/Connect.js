const mongoose = require('mongoose');
mongoose.connect(process.env.DB,{
    useNewURLParser:true,
    useUnifiedTopology:true,

})
.then(()=>{console.log("DB connected")})
.catch((err)=>{console.log(err)});