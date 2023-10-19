// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCbupdZvGl0TzIcrD9btG9FCkrKD1Rb6lo",
    authDomain: "yacht-ecommerce.firebaseapp.com",
    projectId: "yacht-ecommerce",
    storageBucket: "yacht-ecommerce.appspot.com",
    messagingSenderId: "25307279341",
    appId: "1:25307279341:web:cf8a04486834877278c1e4"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

  export default app