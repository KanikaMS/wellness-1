var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


var PatientSchema = new Schema({
    username: {type: String, required: true},
    name: {
        firstName: {type: String, required: true},
        middleName: {type: String, required: true},
        lastName: {type: String, required: true}
        },

    password: {type: String, required: true},   
    gender: {type: String, required: true},
    dob: {type: String, required: true},
    contactNumber: {type: Number, required: true},
    email: {type: String, required: true, unique: true},

    address: {
            line1: String,
            line2: String,
            city: String,
            district: String,
            state: String,
            pinCode: String, 
            country: String
            
            },

    occupation: String,

    patient_Details: {
                patient_height: String,
                patient_weight: String,
                patient_maritaiStatus: String,
                patient_Smoking_status: String,
                patient_Drinking_status: String,
                patient_allergy: String,
                patient_history: String
              },
              
    responsible_person: {
                           name: String,
                           number: Number,
                           relation: String,
                           address: String
                        } 
                       
    
});

//bcrypt password
PatientSchema.pre('save', function(next){
    var user= this;
    bcrypt.hash(user.password,null,null,function(err, hash){
        if (err) return next(err);
        user.password = hash;
        next();
    });
    });

    PatientSchema.methods.comparePassword = function(password){
        return bcrypt.compareSync(password, this.password);
    };    

module.exports = mongoose.model('Patient', PatientSchema);