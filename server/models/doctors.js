import mongoose from 'mongoose';
import _ from 'lodash'


// User Schema
export const DoctorsSchema = mongoose.Schema({
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
	speciality: {
        type: Array,
        required: true,
        default: []
     }
});

export const Doctor = mongoose.model('Doctor', DoctorsSchema);