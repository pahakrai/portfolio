import axios from 'axios'

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  let outputArray = new Uint8Array(rawData.length)

  for (const i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
export function displayConfirmNotification() {
  if ('serviceWorker' in navigator) {
    const options = {
      body: 'You successfully subscribed to our Notification service!',
      icon: '/src/images/icons/app-icon-96x96.png',
      image: '/src/images/sf-boat.jpg',
      dir: 'ltr',
      lang: 'en-US', // BCP 47,
      vibrate: [100, 50, 200],
      badge: '/src/images/icons/app-icon-96x96.png',
      tag: 'confirm-notification',
      renotify: true,
      actions: [
        {
          action: 'confirm',
          title: 'Okay',
          icon: '/src/images/icons/app-icon-96x96.png'
        },
        {
          action: 'cancel',
          title: 'Cancel',
          icon: '/src/images/icons/app-icon-96x96.png'
        }
      ]
    }

    navigator.serviceWorker.ready.then(function (swreg) {
      swreg.showNotification('Successfully subscribed!', options)
    })
  }
}

export function configurePushSub() {
  if (!('serviceWorker' in navigator)) {
    return
  }
  let reg
  navigator.serviceWorker.ready
    .then(function (swreg) {
      reg = swreg
      return swreg.pushManager.getSubscription()
    })
    .then(function (sub) {
      // NOTE: one subscription for one device and one browser
      if (sub === null) {
        // Create a new subscription
        const vapidPublicKey =
          'BAnw430Qsn5dmjlVRMM03A8uQjJ3XQtsWlx8UFYCGrbUBDRtjkH7JjGskyL4KuHiiY-vsT_tLXlGZ-3r92a9-_8'
        const convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey)
        return reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidPublicKey
        })
      } else {
        // We have a subscription
        return sub
      }
    })
    .then(function (newSub) {
      console.log(newSub, 'sub new')
      return axios.post(
        'https://backyard-notifications.asia-southeast1.firebasedatabase.app/notifications.json',
        newSub,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }
      )
    })
    .then(function (res) {
      if (res.ok) {
        displayConfirmNotification()
      }
    })
    .catch(function (err) {
      console.log(err)
    })
}

export function askForNotificationPermission() {
  Notification.requestPermission(function (result) {
    console.log('User Choice', result)
    if (result !== 'granted') {
      console.log('No notification permission granted!')
    } else {
      configurePushSub()
      // displayConfirmNotification();
    }
  })
}

// NOTE: IF REQUIRED NETWORK SYNC USES INDEXED DB
// function sendData() {
//     fetch('https://us-central1-backyard-notifications.cloudfunctions.net/storeNotificationData', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       },
//       body: JSON.stringify({
//         id: new Date().toISOString(),
//         title: titleInput.value,
//         location: locationInput.value,
//         image: 'https://firebasestorage.googleapis.com/v0/b/pwagram-99adf.appspot.com/o/sf-boat.jpg?alt=media&token=19f4770c-fc8c-4882-92f1-62000ff06f16'
//       })
//     })
//       .then(function(res) {
//         console.log('Sent data', res);
//         updateUI();
//       })
//   }

//   form.addEventListener('submit', function(event) {
//     event.preventDefault();

//     if (titleInput.value.trim() === '' || locationInput.value.trim() === '') {
//       alert('Please enter valid data!');
//       return;
//     }

//     closeCreatePostModal();

//     if ('serviceWorker' in navigator && 'SyncManager' in window) {
//       navigator.serviceWorker.ready
//         .then(function(sw) {
//           var post = {
//             id: new Date().toISOString(),
//             title: titleInput.value,
//             location: locationInput.value
//           };
//           writeData('sync-posts', post)
//             .then(function() {
//               return sw.sync.register('sync-new-posts');
//             })
//             .then(function() {
//               var snackbarContainer = document.querySelector('#confirmation-toast');
//               var data = {message: 'Your Post was saved for syncing!'};
//               snackbarContainer.MaterialSnackbar.showSnackbar(data);
//             })
//             .catch(function(err) {
//               console.log(err);
//             });
//         });
//     } else {
//       sendData();
//     }
//   });
