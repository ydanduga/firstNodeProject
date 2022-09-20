import mongoose from 'mongoose';
import _ from 'lodash'


// User Schema
export const NursesSchema = mongoose.Schema({
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
	}
});

export const Nurse = mongoose.model('Nurse', NursesSchema);