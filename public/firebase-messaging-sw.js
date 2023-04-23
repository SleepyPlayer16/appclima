import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging"

importScripts("https://www.gstatic.com/firebasejs/9.18.0/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/9.18.0/firebase-messaging-compat.js")

const firebaseConfig = {
  apiKey: "AIzaSyAqLGlFXo8ZDULfryB7cCP2TwQsdrdjaN4",
  authDomain: "notifipush-7d34b.firebaseapp.com",
  projectId: "notifipush-7d34b",
  storageBucket: "notifipush-7d34b.appspot.com",
  messagingSenderId: "360603901999",
  appId: "1:360603901999:web:600bf6cb0c43a6814ba6da"
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);


messaging.onBackgroundMessage(payload=> {
    console.log("habei recibido un mensaje aweonao aaaaa");
    console.log(payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: ".(logo192.png)"
    };

    return self.ServiceWorkerRegistration.showNotification(
        notificationTitle,
        notificationOptions
    )
})