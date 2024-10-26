const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const DATABASE_HOST=dpg-csej8v68ii6s73957q4g-a
const DATABASE_USER=facetracedb_user
const DATABASE_PASSWORD=YcRb2xcTYDA15g7dZfsK2zx2HqpxBqDW
const DATABASE_DB=facetracedb
const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_HOST,
        port: 5432,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DB,
    },
});


const app = express();


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Success')
})

app.post('/signIn', (req, res) => signIn.handleSignIn(req, res, db, bcrypt))

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})





app.listen(3000, () => {
    console.log("app is running on port 3000")
})

