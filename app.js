import express from 'express';

const app = express()

const port = process.env.port || 3000;

app.post('/users', (req, res) => {
    console.log("testing!");
})

app.listen(port, () => {
    console.log('Server is up and running on port '+port);

})