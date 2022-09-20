import mongoose, { Schema } from 'mongoose';
import _ from 'lodash'


// User Schema
export const PatientSchema = new Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	dob: {
		type: String,
		required: true,
	},
	sex: {
		// true = male
		// false = female
		type: Boolean,
		required: true,
		default: true
	},
	disease: {
        type: Array,
        default: []
     }
});

export const patientmodel = mongoose.model('patient', PatientSchema);
//module.exports = { Patient };