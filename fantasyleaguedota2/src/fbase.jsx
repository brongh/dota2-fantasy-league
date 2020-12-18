import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { functions } from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

/* firebase.initilizeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}); */

const firebaseConfig = {
  apiKey: "AIzaSyA9UeU6xvNi4tkNsNFK3_fw-sE5E_5UPVw",
  authDomain: "fantasyleaguedota2.firebaseapp.com",
  projectId: "fantasyleaguedota2",
  storageBucket: "fantasyleaguedota2.appspot.com",
  messagingSenderId: "195320714168",
  appId: "1:195320714168:web:7fa4fa188690e4e5b6f54d",
  measurementId: "G-KDS1JHR0WT",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`user/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};
const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`user/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const grabPlayerIntoFirebase = (playerDetail) => {
  const shortlistedPlayers = firestore.collection("shortlistedPlayers");
  shortlistedPlayers.add({
    ...playerDetail,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

export const ShowShortListed = () => {
  const shortlistedPlayers = firestore.collection("shortlistedPlayers");
  const query = shortlistedPlayers.orderBy("createdAt").limit(25);

  const [shortlistedPlayersRequest] = useCollectionData(query, {
    idField: "id",
  });
  console.log(shortlistedPlayersRequest);
  return shortlistedPlayersRequest;
};

export const readData = (callbackFn) => {
  const q = (querySnapshot) => {
    const items = querySnapshot.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    }));
    callbackFn(items);
  };
  firestore.collection("shortlistedPlayers").get().then(q);
};

export const addOne = (product, callbackFn) => {
  firestore
    .collection("chosenTeam")
    .add(product)
    .then((docRef) => {
      callbackFn(docRef); // show success
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

export const readDataChosen = (callbackFn) => {
  const q = (querySnapshot) => {
    const items = querySnapshot.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    }));
    callbackFn(items);
  };
  firestore.collection("chosenTeam").get().then(q);
};

export const deleteChosen = (x) => {
  firestore.collection("chosenTeam").doc(`${x}`).delete();
};

export const deleteShort = (x) => {
  firestore.collection("shortlistedPlayers").doc(`${x}`).delete();
};

export default firebase;
