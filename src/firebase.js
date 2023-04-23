import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging"

const firebaseConfig = {
  apiKey: "AIzaSyAqLGlFXo8ZDULfryB7cCP2TwQsdrdjaN4",
  authDomain: "notifipush-7d34b.firebaseapp.com",
  projectId: "notifipush-7d34b",
  storageBucket: "notifipush-7d34b.appspot.com",
  messagingSenderId: "360603901999",
  appId: "1:360603901999:web:600bf6cb0c43a6814ba6da"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);