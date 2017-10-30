var Appointment = require('../Models/appointment');
var mongojs = require('mongojs');
var mongo = require('mongodb');
var assert = require('assert');
var mongoose = require('mongoose');




module.exports = function(router){
    
//add appointment entery to the database http://localhost:port/api/add/appointment
router.post("/add/appointment", (req, res) => {
    var myData = new Appointment(req.body);
    myData.save()
    .then(item => {
    res.send("item saved to database");
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
   });


    //delete appointment with the help of _id
    router.get('/delete/:id', function(req,res, next){
		Appointment.findOne({_id: mongojs.ObjectId(req.params.id)}).remove(function(err){
        if(err)	res.json(err);
        else { res.json({success: 'true' ,message: 'appointment is canceled'}); }
        });
       
     
    }); 

     //to retrieve on the basis of doctor_id
    router.get('/retrieve/:id', function(req,res, next){
        
		Appointment.find({doctor_id: req.params.id}, function(err, appointments) {
            if(!err){ 
                res.status(400).json(appointments);
                
            } else {
                res.json({success: 'false' ,message: 'could not retrieve data'});
            }
         });
        });
       
    
    

   return router;   
};
