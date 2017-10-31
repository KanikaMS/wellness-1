var Appointment = require('../Models/appointment');
var mongojs = require('mongojs');
var mongo = require('mongodb');
var assert = require('assert');
var mongoose = require('mongoose');




module.exports = function(router){
    
//add appointment entery to the database http://localhost:port/api/appointments/addAppointment
router.post("/addAppointment", (req, res) => {
    var myData = new Appointment(req.body);

    myData.save(function(err){
        if (err || !myData) {
            res.json({success: 'false', message: 'not able to provide appointment'});
        } else {
            res.json({success: 'true', message: 'appointment is booked!'});
        }
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
                res.json(appointments);
                
            } else {
                res.json({success: 'false' ,message: 'could not retrieve data'});
            }
         });
        });
       
    
    

   return router;   
};
