var admin = require("firebase-admin");

var serviceAccount = require("./projectdashboard-production-firebase-adminsdk-shzjt-23b50df62b.json");

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
