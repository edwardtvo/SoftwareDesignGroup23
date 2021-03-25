/*const MongoClient = require('mongodb').MongoClient;
const mongoDB_uri = "mongodb+srv://sdgroup23username:sdgroup23pw@cluster0.4pi4i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const mongoDB_client = new MongoClient(mongoDB_uri, { useNewUrlParser: true, useUnifiedTopology: true });
*/
// const dbname = "cluster0";

async function mongoDB_run(dbName, mgclient) {

        try {
            await mgclient.connect();
            console.log("\n MongoDB datatbase connected !\n");
            const db = mgclient.db(dbName);

            /* add collection people */
            // const col = db.collection("user");

            /* add new document to people */ /*
            let sampleUser = {
                "username": "caitlinUsername",
                "pwhash": "randomhash2",
                "full_name": { "first_name": "Caitlin", "last_name": "Dooley" },
                "address1": "200 Second Street",
                "address2": "Apt 200",
                "city": "Houston",
                "state": "TX",
                "zip": "54321"
            } */

            /* insert a document, wait for Promise so we can read it */
            //const p = await col.insertOne(sampleUser);
            /* find one document */
            //const myDocument = await col.findOne();
            /* print to console */
            //console.log(myDocument);

        } catch (err) {
            console.log(err.stack);
        }
        finally {
            await mgclient.close();
        }

}

//mongoDB_run().catch(console.dir);
exports.mongoDB_run = mongoDB_run;

