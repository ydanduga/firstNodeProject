import { Router } from 'express';
import mongodb, { Collection, ObjectId } from 'mongodb'
const MongoClient = mongodb.MongoClient
const router = Router();
import mongoose from 'mongoose'
//const Schema = mongoose.Schema
//import schema from '../server/models/patients.js'
//import patient from '../server/models/patients.js';
import {createMultipleListings, findListings} from '../routes/common.js'
import { patientmodel } from '../server/models/patients.js';

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'ICU'

MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
    if(error) {
        return console.log("Error in connecting to DB")
    } 
    //const db = client.db(databaseName)
    const newRecord = new patientmodel([
        {
            firstName:'John',
            lastName: 'Doe',
            dob: '1987-12-16',
            sex: 'female',
            disease: 'BP'
        },
        {
            firstName:'John1',
            lastName: 'Doe',
            dob: '1987-12-16',
            sex: 'female',
            disease: 'BP'
        }
    ]
        
    )
    createMultipleListings(client, newRecord, 'ICU', 'Patient')

    //findListings(client, {'firstName':'John'}, 'ICU', 'Patient')
    
})



