var admin = require("firebase-admin");

var serviceAccount = require("./projectsdashboard-de093-firebase-adminsdk-ltb59-3db108ef2f.json");

var uid = process.argv[2];

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

admin
  .auth()
  .setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log("Custom Claims set for user", uid);
    process.exit();
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
