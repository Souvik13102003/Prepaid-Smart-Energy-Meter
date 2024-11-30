// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, push } from 'firebase/database'; // Import necessary functions

// const firebaseConfig = {
//   apiKey: "AIzaSyCZl4cQZZdTlpWGKXSWtWCHANHJQfGjBwU",
//   authDomain: "prepaid-smart-energy-meter.firebaseapp.com",
//   databaseURL: "https://prepaid-smart-energy-meter-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "prepaid-smart-energy-meter",
//   storageBucket: "prepaid-smart-energy-meter.appspot.com",
//   messagingSenderId: "1070850545206",
//   appId: "1:1070850545206:web:2a15b8b576057f0c866a97",
//   measurementId: "G-CESQPEB0GX"
// };

const firebaseConfig = {
  apiKey: "AIzaSyB33_6HpzPPLnmrJJJDWGKF8sGTh35T-Bo",
  authDomain: "prepaid-smart-energy-meter-ee.firebaseapp.com",
  databaseURL: "https://prepaid-smart-energy-meter-ee-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "prepaid-smart-energy-meter-ee",
  storageBucket: "prepaid-smart-energy-meter-ee.appspot.com",
  messagingSenderId: "670155809101",
  appId: "1:670155809101:web:eceec65c9e8c9467ce1704",
  measurementId: "G-2PV4MTTKWW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Initialize the database

// Export database and other necessary functions
export { database, ref, set, onValue, push };
