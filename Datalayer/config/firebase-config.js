import { initializeApp } from "firebase/app";
import { getFirestore,initializeFirestore,CACHE_SIZE_UNLIMITED,memoryLocalCache,persistentLocalCache} from '@firebase/firestore'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcgdJi_YkRGHY5IEsNDgSbnFa8hRioxNo",
  authDomain: "admin-dashboard-394ad.firebaseapp.com",
  projectId: "admin-dashboard-394ad",
  storageBucket: "admin-dashboard-394ad.appspot.com",
  messagingSenderId: "848219920017",
  appId: "1:848219920017:web:a18b35e175136d10169130",
  measurementId: "G-R7PT4BPHQ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


//export const db = getFirestore(app)
export const db = initializeFirestore(app,{
localCache: persistentLocalCache({})
//cacheSizeBytes:CACHE_SIZE_UNLIMITED
})
