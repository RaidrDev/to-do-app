var firebaseConfig = {
    apiKey: "AIzaSyAXVRA1SPH7hjDHqcr5sY7wONeJlc4rU6U",
    authDomain: "todo-app-d5d21.firebaseapp.com",
    projectId: "todo-app-d5d21",
    storageBucket: "todo-app-d5d21.appspot.com",
    messagingSenderId: "860763703255",
    appId: "1:860763703255:web:e5b55ab992e2a6c9aaad92",
    measurementId: "G-RYCFYDW9S0"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();
firebase.auth().useDeviceLanguage();


function signup(event) {
    event.preventDefault();
    const userEmail = document.getElementById("email").value;
    const userPassword = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((userCredential) => {
        location.replace("/home.html");
    }).catch((error) => {
        window.alert(error);
    });
}


function login(event) {
    event.preventDefault();

    const userEmail = document.getElementById("email").value;
    const userPassword = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then((user) => {
        location.replace("/home.html");
    }).catch((error) => {
        window.alert(error);
    })

}

function logout() {
    firebase.auth().signOut().then(() => {

    }).catch((error) => {
        window.alert(error);
    });
}


