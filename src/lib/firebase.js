import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAuhvTwzEt-UdUznJscj3-oBdSGMQB5Eu0",
    authDomain: "whisperdb-58058.firebaseapp.com",
    projectId: "whisperdb-58058",
    storageBucket: "whisperdb-58058.firebasestorage.app",
    messagingSenderId: "1034940126842",
    appId: "1:1034940126842:web:cdd3b8bdd04fe0c2964dc3",
    measurementId: "G-B8XDL566NH"
    //   apiKey: "your-api-key",
    //   authDomain: "your-auth-domain",
    //   projectId: "your-project-id",
    //   storageBucket: "your-storage-bucket",
    //   messagingSenderId: "your-messaging-sender-id",
    //   appId: "your-app-id",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()
