import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from '@/firebaseconfig';

const firebaseconfig = firebaseConfig.firebaseConfig;
firebase.initializeApp(firebaseconfig);

const db = firebase.firestore();
export { firebase, db };
