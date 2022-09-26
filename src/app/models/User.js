const mongoose = require('mongoose');
const Activity = require('./Activity');

const opts = { 
        toJSON: {virtuals: true},
        id: false
    };

const userSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    birthdate: {
        type: Date, 
        required: true
    },
    email:{
        type: String, 
        required: true
    },
    observations: {
        type: String, 
        required: false
    },
}, opts);

// Create possible actions to the Schema.
// patientSchema.methods.findByName = (name) => {
//     return Patient.findOne({name: name});
// }

// Create a virtual property to be used across the application, but that is not in the document.
userSchema.virtual('age')
    .get(function () {
        return Math.floor((new Date() - this.birthdate) / 1000 / 60 / 60 / 24 / 365);
    });

// Create a middleware to be executed before the document is saved.
// patientSchema.pre('save', function (next) {
//     this.updatedAt = Date.now();
//     next();
// });
userSchema.pre('deleteOne', function(next) {
    Activity.deleteMany({user: this._conditions._id}).exec();
    next();
})

module.exports = mongoose.model('User', userSchema);