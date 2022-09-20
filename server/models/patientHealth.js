import mongoose from 'mongoose';
import _ from 'lodash'


// User Schema
export const PatientHealthSchema = mongoose.Schema({
	bp: {
		type: Number,
		required: true
	},
	heartrate: {
		type: Number,
		required: true
	},
	pulse: {
		type: Number,
		required: true,
	},
	ecg: {
        type: Number,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    }
});

export const PatientHealth = mongoose.model('PatientHealth', PatientHealthSchema);