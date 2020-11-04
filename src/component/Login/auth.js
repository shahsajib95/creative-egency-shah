
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "../cofigs/firebase.config";

export const initializeFirebaseApp = () =>{
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}

initializeFirebaseApp()

export const googleSignIn = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(res=>{
        const {displayName, photoURL, email} = res.user;
        
        const userData ={
            name: displayName,
            photo: photoURL,
            email: email,
        }
        sessionStorage.setItem('user', JSON.stringify(userData))
        return userData;
    })
}

export const idToken = () =>{
    return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
        sessionStorage.setItem('token', idToken)
      }).catch(function(error) {
        // Handle error
      });
}

