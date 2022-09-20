import mongoose from "mongoose";


mongoose.Promise = global.Promise;

export const ConnectionDetails = mongoose.connect('mongodb://127.0.0.1:27017', { 
    useNewUrlParser: true
})

//module.exports = {mongoose};