const functions = require("firebase-functions");
const admin = require('firebase-admin');
require("firebase-functions/lib/logger/compat");


// admin.initializeApp();
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
});

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});


exports.createNewAdminUser = functions.https.onCall((data, context) => {

    console.log("++++++++++ NEW ADMIN USER FIRED ++++++++++");
    return console.log(data);

    // try {
    //     user = await admin.auth().createUser({
    //         email: 'user@example.com',
    //         emailVerified: false,
    //         phoneNumber: '+11234567890',
    //         password: 'secretPassword',
    //         displayName: 'John Doe',
    //         disabled: false,
    //     });

    //     admin.firestore().collection('Tenant').doc(data.dbObjKey).collection('users').doc(user.uid).set({
    //         activeTemplate: 'Template One',
    //         admin: false,
    //         department: data.department,
    //         email: data.email,
    //         name: data.displayName, 
    //         roles: [],
    //         tenant: data.tenant,
    //         uid: user.uid,
    //         username: data.displayName,

    //     })
    //     console.log(user.uid);

    //     return {
    //         response: user
    //     };
    // } catch (error) {
    //     throw new functions.https.HttpsError(error);
    // }
}); 