import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebaseConfig from "@/firebaseconfig";

const firebaseconfig = firebaseConfig.firebaseConfig;
firebase.initializeApp(firebaseconfig);

const db = firebase.firestore();
const storage = firebase.storage();
export { firebase, db, storage };
