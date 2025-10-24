importScripts('https://www.gstatic.com/firebasejs/10.3.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.3.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyCxEBpHMyUX-dG0cxU42uwIujyg1rvFQtY",
  authDomain: "fusionlink-5053a.firebaseapp.com",
  projectId: "fusionlink-5053a",
  storageBucket: "fusionlink-5053a.appspot.com",
  messagingSenderId: "569764079398",
  appId: "1:569764079398:web:88726039f9f81d706483e7"
};

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const { title, ...options } = payload.notification;
  self.registration.showNotification(title, options);
});