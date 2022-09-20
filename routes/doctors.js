import { Router } from 'express';
//import { isEmpty, capitalize, toUpper } from 'lodash';
import mongodb, { Collection, ObjectId } from 'mongodb'
const MongoClient = mongodb.MongoClient
const router = Router();
import { Patient } from '../server/models/patients.js';
//import isValidDate from 'is-valid-date'; 
import { ConnectionDetails } from '../server/db/mongoose.js'
import { createMultipleListings } from './patients.js';


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'ICU'

MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
    if(error) {
        return console.log("Error in connecting to DB")
    } 
    const db = client.db(databaseName)

    createMultipleListings(db, [{
        doctornurseID: '004',
        firstName: 'John',
        lastName: 'Doe',
        dob: '1987-12-16',
        sex: 'female'
    },
    {
        doctornurseID: '005',
        firstName: 'John',
        lastName: 'Doe',
        dob: '1987-12-16',
        sex: 'female'
    }], 'ICU', 'Staff')
})