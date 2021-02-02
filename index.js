var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
var router = express.Router();
var petsArray = [];
let indexNumber = 0;
router.get('/',function(req,res){
  res.json({"error" : false, "message" : "result", list: petsArray});
});

//Create New Pets....
router.post('/',function(req,res){
    indexNumber = indexNumber+1;
    let {name,age,colour } = req.body;
    if(!name ||  name==''){
        res.json({"error" : true, "message" : "name field is required.", "result" : null});
    } else if(!age || age=='' ){
        res.json({"error" : true, "message" : "age field is required.", "result" : null});
    }
    else if(!colour || colour=='' ){
        res.json({"error" : true, "message" : "colour field is required.", "result" : null});
    } else{
        petsArray.push({...req.body,id: indexNumber});
        res.json({"error" : false, "message" : "success", "result" : true});
    }
});

//Gets pets....
router.get('/:id',function(req,res){
    let findObj  = petsArray.find(row=> row['id']== req.params['id']);
  res.json({"error" : false, "message" : "success", "result" : {...findObj}});
});

//Remove Pets....
router.delete('/:id',function(req,res){
    //indexNumber = indexNumber+1;
    petsArray  = petsArray.filter(row=> row['id']!= req.params['id']);
  res.json({"error" : false, "message" : "success", "result" : true});
});

//>> Router Middleware...
app.use('/pets',router);
// Port Number 
app.listen(8080,function(){
  console.log("I am listening at PORT 8080");
})