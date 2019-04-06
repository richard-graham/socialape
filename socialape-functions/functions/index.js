const functions = require('firebase-functions');
const app = require('express')()

const FBAuth = require('./util/fbAuth')

const { getAllScreams, postOneScream, getScream } = require('./handlers/screams')
const { signup, login, uploadImage, addUserDetails, getAuthenticatedUser } = require('./handlers/users')

// Scream routes
app.get('/screams', getAllScreams)
app.get('/scream/:screamId', getScream)
app.post('/scream', FBAuth, postOneScream)
// TODO
// deletescream
// likescream
// unlikeScream
// commentOnScream

// User routes
app.post('/signup', signup)
app.post('/login', login)
app.post('/user/image', FBAuth, uploadImage)
app.post('/user', FBAuth, addUserDetails)
app.get('/user', FBAuth, getAuthenticatedUser)

// Helper Functions 


exports.api = functions.https.onRequest(app) 
// exports.api = functions.region('europe-west1').https.onRequest(app)

