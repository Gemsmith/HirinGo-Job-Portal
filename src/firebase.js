// PedroTech's Code:
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'ADD_YOUR_FIREBASE_DATA_HERE',
  authDomain: 'ADD_YOUR_FIREBASE_DATA_HERE',
  projectId: 'ADD_YOUR_FIREBASE_DATA_HERE',
  storageBucket: 'ADD_YOUR_FIREBASE_DATA_HERE',
  messagingSenderId: 'ADD_YOUR_FIREBASE_DATA_HERE',
  appId: 'ADD_YOUR_FIREBASE_DATA_HERE',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
