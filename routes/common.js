import { Router } from 'express';
//import { isEmpty, capitalize, toUpper } from 'lodash';
import mongodb, { Collection, ObjectId } from 'mongodb'
const MongoClient = mongodb.MongoClient
const router = Router();
//import patient from '../server/models/patients.js';
//import { PatientSchema } from '../server/models/patients.js';
//import isValidDate from 'is-valid-date';
//import client from 
import { ConnectionDetails } from '../server/db/mongoose.js'
import { patientmodel } from '../server/models/patients.js';



/*Create MultipleListings in DB */

export async function createMultipleListings(client, newListings, dbName, collectionName){
    const db = client.db(dbName)
    const result = await db.collection(collectionName).insertMany(newListings);
    console.log(result.insertedIds);       
}

/* Read Listings */

export async function findListings(client, listingDetail, dbName, collectionName) {
    const db = client.db(dbName)
    const cursor = db.collection(collectionName).find(listingDetail);
    const result = await cursor.toArray();
    if (result) {
        console.log(result);
    } else {
        console.log(`No listings found with the name '${listingDetail}'`);
    }
}


export async function deleteListings(client, listingDetail, dbName, collectionName) {
    const db = client.db(dbName)
    const result = await db.collection(collectionName).deleteMany(listingDetail);
    if (result) {
        console.log(result);
    } else {
        console.log(`No listings found with the name '${listingDetail}'`);
    }
}
