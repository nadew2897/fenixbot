const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://Own:Own@cluster0.aahbv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB URI
const client = new MongoClient(uri);

let db, contactsCollection;

async function connectToDB() {
    await client.connect();
    db = client.db('Own'); // enter you database name
    contactsCollection = db.collection('contacts');
}

function getContactsCollection() {
    return contactsCollection;
}

module.exports = { connectToDB, getContactsCollection };
