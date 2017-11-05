var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


var PatientSchema = new Schema({

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








module.exports = mongoose.model('Patient', PatientSchema);
