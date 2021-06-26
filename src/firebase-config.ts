import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyD1Yk18JOg2vAqv2_R1TxChcZkKgo12jpY",
  authDomain: "trip-locator-cd980.firebaseapp.com",
  projectId: "trip-locator-cd980",
  storageBucket: "trip-locator-cd980.appspot.com",
  messagingSenderId: "729678208317",
  appId: "1:729678208317:web:74c013b1bead2f69907954"
})

export const auth = firebase.auth()

export const firestore = firebase.firestore()
