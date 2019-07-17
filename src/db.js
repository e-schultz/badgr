import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "_",
  authDomain: "badgrtest.firebaseapp.com",
  databaseURL: "https://badgrtest.firebaseio.com",
  projectId: "badgrtest",
  storageBucket: "",
  messagingSenderId: "1054250129538",
  appId: "_"
};
firebase.initializeApp(firebaseConfig);
// Initialize Firebase
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

// date issue fix according to firebase

// firebase collections
const nominationsCollection = db.collection("nominations");
const provider = new firebase.auth.GoogleAuthProvider();
export default {
  db,
  auth,
  currentUser,
  nominationsCollection,
  provider
};
