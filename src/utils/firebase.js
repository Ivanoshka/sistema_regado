import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCX_YbLpmTh0NyZ0iUOJbHxa0C2WHxLUco",
  authDomain: "sistema-riego-a28f3.firebaseapp.com",
  projectId: "sistema-riego-a28f3",
  storageBucket: "sistema-riego-a28f3.appspot.com",
  messagingSenderId: "1072392991079",
  appId: "1:1072392991079:web:21b530fab39f02546b7fc2"
};

  const app = initializeApp(firebaseConfig);

export default app