const express = require('express');
const {generatePassword} = require('./internal');

const app = new express();
app.get('/generate',(req,res)=>{
    //default values
    let length=10,quantity=1;

    if(req.query['length'])
        length = req.query['length'];
    if(req.query['quantity'])
        quantity = req.query['quantity'];
    if(length>=8){
        let t = (new Date()).getTime();
        let response = {'passwords': []};
        try{
            for(let i=1;i<=quantity;i++){
                response['passwords'].push(generatePassword(length));
            }
            res.json(response);
            console.log(`Generated ${quantity} passwords in ${((new Date()).getTime() - t)/1000}s`);
        }catch(err){
            res.josn({'error': "Internal error"});
        }
    }
    else
        res.json({'error': "length cannot be lessa than 8"});
})

app.use((req,res)=>res.send("Use endpoint: /generate"));

app.listen(8080,()=>console.log("Started"));