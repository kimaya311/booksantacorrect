import firebase from 'firebase'
 require('@firebase/firestore') 

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAWmsKkcPaGjIr3ZBudUmZpOa2XhyJzJWw",
    authDomain: "booksanta-a07ae.firebaseapp.com",
    databaseURL: "https://booksanta-a07ae.firebaseio.com",
    projectId: "booksanta-a07ae",
    storageBucket: "booksanta-a07ae.appspot.com",
    messagingSenderId: "170073663288",
    appId: "1:170073663288:web:6754ebee9eca4b193703cd"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
