var Appointment = require('../Models/appointment');
var mongojs = require('mongojs');
var mongo = require('mongodb');
var assert = require('assert');



module.exports = function(router){
    
//add appointment entery to the database http://localhost:port/api/add/appointment
router.post('/add/appointment', function(req, res){
    var appointment = new Appointment();
   
    appointment.patientname= req.body.patientname;
    appointment.age= req.body.age;
    appointment.gender= req.body.gender;
    appointment.date= req.body.date;
    appointment.time= req.body.time;
    appointment.doctor_id= req.body.doctor_id;
    appointment.create_date= req.body.create_date;
    

    if (req.body.patientname == null || req.body.patientname == '' || req.body.age == null || req.body.age == '' 
    || req.body.gender == null || req.body.gender == '' || req.body.date == null || req.body.date == ''
    || req.body.time == null || req.body.time == '' || req.body.doctor_id == null || req.body.doctor_id == '' 
    || req.body.create_date == null || req.body.create_date == ''){
        res.send('Ensure all the fields were provided');
    } else {
    appointment.save(function(err){
        if (err) {
            res.send('appointment already Scheduled or not able to provide right now');
        } else {
            res.send('appointment is scheduled');
        }
    });
}
});


    //delete appointment with the help of _id
    router.get('/delete/:id', function(req,res, next){
		Appointment.findOne({_id: mongojs.ObjectId(req.params.id)}).remove(function(err){
        if(err)	res.json(err);
        else { res.json({success: 'true' ,message: 'appointment is canceled'}); }
        });
       
     
    }); 

     //to retrieve on the basis of doctor_id
    router.get('/retrieve', function(req,res, next){
        
		Appointment.find({doctor_id: '2'}, function(err, appointments) {
            if(!err){
                res.send(appointments);
            } else {
                res.send('could not retrived data or doctor_id does not exists!');
            }
         });
        });
       
    
    

   return router;   
};
