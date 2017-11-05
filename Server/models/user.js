var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var patientSchema = new Schema({
    patient_id: {type: String,  required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    middleName: String,
    lastName: {type: String, required: true},
    gender: {type: String, required: true},
    dob: {type: Date, required: true},
    contactNumber: {type: Number, required: true},
    email: {type: String, required: true, unique: true},
    address: {
            houseNumber: String,
            street: String,
            city: String,
            state: String,
            country: String,
            zipCode: String 
            },
    occupation: String,
    patient_Details: {
                patient_height: String,
                patient_weight: String,
                patient_maritaiStatus: String,
                patient_Smoking_status: String,
                patient_Drinking_status: String,
                patient_allergy: String
              },
    responsible_person: {
                           name: String,
                           number: [Number],
                           relation: String,
                           address: String
                        }          
    
});


patientSchema.pre('save', function(next){
    var patient= this;
    bcrypt.hash(patient.password,null,null,function(err, hash){
        if (err) return next(err);
        patient.password = hash;
        next();
    });
    bcrypt.hash(patient.contactNumber,null,null,function(err, hash){
        if (err) return next(err);
        patient.contactNumber = hash;
        next();
    });

    });
    
   patientSchema.methods.comparePassword = function(password){
        return bcrypt.compareSync(password, this.password);
    };

module.exports = mongoose.model('Patient', patientSchema);
