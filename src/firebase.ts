import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyCxEBpHMyUX-dG0cxU42uwIujyg1rvFQtY",
  authDomain: "fusionlink-5053a.firebaseapp.com",
  projectId: "fusionlink-5053a",
  storageBucket: "fusionlink-5053a.appspot.com",
  messagingSenderId: "569764079398",
  appId: "1:569764079398:web:88726039f9f81d706483e7",
  measurementId: "G-50WVG15C8K",
  vapidKey: "BHow1FzrVkNxgZCNMmY5berDPYl0sZldmr5tFLn8URrQBbM7YKqfjLn2tQBbtp2lKQxisuuKLKDGVzoZV9ooGYs"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };

