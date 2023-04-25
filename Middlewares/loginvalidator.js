const jsonwebtoken=require("jsonwebtoken");
require('dotenv').config();

const validator=(req,res,next)=>{
    let token=req.headers.authorization;
    if(token){
        let check=jsonwebtoken.verify(token,process.env.secret);
        if(check){
             req.body.userId=check.userid;
             next()
        }else{
            res.status(409).send({"msg":"token is not valid"})
        }
    }
   
};



module.exports={
    validator
}