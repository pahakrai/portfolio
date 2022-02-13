const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })
const webpush = require('web-push')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const serviceAccount = require('./backyard-key.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    'https://backyard-notifications-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

exports.storeNotificationData = functions.https.onRequest(function (
  request,
  response
) {
  cors(request, response, function () {
    admin
      .database()
      .ref('notifications')
      .push({
        id: request.body.id,
        title: request.body.title,
        location: request.body.location,
        image: request.body.image
      })
      .then(function () {
        webpush.setVapidDetails(
          'mailto:rai.pahak@gmail.com',
          'BAnw430Qsn5dmjlVRMM03A8uQjJ3XQtsWlx8UFYCGrbUBDRtjkH7JjGskyL4KuHiiY-vsT_tLXlGZ-3r92a9-_8',
          'LGnMoRN0pxguf6zMtHNFqVZjA03CDa--xtcFTYEbmz4'
        )
        return admin.database().ref('subscriptions').once('value')
      })
      .then(function (subscriptions) {
        subscriptions.forEach(function (sub) {
          const pushConfig = {
            endpoint: sub.val().endpoint,
            keys: {
              auth: sub.val().keys.auth,
              p256dh: sub.val().keys.p256dh
            }
          }
          webpush
            .sendNotification(
              pushConfig,
              JSON.stringify({ title: 'New Post', content: 'New Post added!' })
            )
            .catch(function (err) {
              console.log(err)
            })
        })
        response
          .status(201)
          .json({ message: 'Data stored', id: request.body.id })
      })
      .catch(function (err) {
        response.status(500).json({ error: err })
      })
  })
})
