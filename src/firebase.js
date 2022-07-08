// PedroTech's Code:
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCPyF0rFLQ8Vd-7oEU_jakXZKAM5vly4Ow',
  authDomain: 'hiringo-cv-uploads.firebaseapp.com',
  projectId: 'hiringo-cv-uploads',
  storageBucket: 'hiringo-cv-uploads.appspot.com',
  messagingSenderId: '413404417366',
  appId: '1:413404417366:web:2e6d79643dc9458f3a1af7',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
