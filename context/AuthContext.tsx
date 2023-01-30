import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, updateProfile
} from 'firebase/auth'
import { collection, addDoc, getDocs, query, where, } from "firebase/firestore";
import { auth, firestore } from '../config/firebase'
import { async } from '@firebase/util';

const AuthContext = createContext<any>({})

export const useAuth = () => useContext(AuthContext)

// Type for our user
export interface userState {
    ID: string | null;
    avatar: string | null;
    userName: string | null;
    email: string | null;
    gender: string | null;
    marketingEmails: boolean | null;
    shareData: boolean | null;
    lovedSongs: string[] | null;
    collections: string[] | null;
    lovedCollections: string[] | null;
}


export const AuthContextProvider = ({ children, }: { children: React.ReactNode }) => {

  const [user, setUser] = useState<userState>({
      ID: null,
      avatar: null,
      userName: null,
      email: null,
      gender: null,
      marketingEmails: null,
      shareData: null,
      lovedSongs: [],
      collections: [],
      lovedCollections: [],
  });
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
          getUser(user.uid);
      } else {
          setUser({
              ID: null,
              avatar: null,
              userName: null,
              email: null,
              gender: null,
              marketingEmails: null,
              shareData: null,
              lovedSongs: [],
              collections: [],
              lovedCollections: [],
          });
        }
        setLoading(false)
    });
        return () => unsubscribe();
    }, )

  const signup = (email: string, password: string, avatar:string, name:string, gender:string, marketingEmails:Boolean, shareData:Boolean) => {
      return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        const userData = {
          ID: user.uid,
          name: (user.displayName ) ? user.displayName : name,
          email: user.email,
          avatar: avatar,
          gender: gender,
          marketingEmails: marketingEmails,
          shareData: shareData,
          collections: [],
          lovedSongs: [],
          lovedCollections: [],
        }
        if (user.uid) {
            console.log('sasas');
            console.log(userData);
            try {
              const docRef = await addDoc(collection(firestore, "users"), {userData});
              console.log("Document written with ID: ", docRef.id);
            } catch (e) {
              console.error("Error adding document: ", e);
            }
        }

        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  const signin = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      getUser(user.uid);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      
    });
  }

  const getUser = async (uid:string) => {
    const userData = {
      ID: null,
      avatar: null,
      userName: null,
      email: null,
      gender: null,
      marketingEmails: null,
      shareData: null,
      lovedSongs: [],
      collections: [],
      lovedCollections: [],
    }

    const q = query(collection(firestore, "users"), where("userData.ID", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      // console.log(doc.data().userData.ID);

      setUser({
        ID: doc.data().userData.ID,
        avatar: doc.data().userData.avatar,
        userName: doc.data().userData.name,
        email: doc.data().userData.email,
        gender: doc.data().userData.gender,
        marketingEmails: doc.data().userData.marketingEmails,
        shareData: doc.data().userData.shareData,
        lovedSongs: doc.data().userData.lovedSongs,
        collections: doc.data().userData.collections,
        lovedCollections: doc.data().userData.lovedCollections,
      });

      const userData = {
        ID: doc.data().userData.ID,
        avatar: doc.data().userData.avatar,
        userName: doc.data().userData.name,
        email: doc.data().userData.email,
        gender: doc.data().userData.gender,
        marketingEmails: doc.data().userData.marketingEmails,
        shareData: doc.data().userData.shareData,
        lovedSongs: doc.data().userData.lovedSongs,
        collections: doc.data().userData.collections,
        lovedCollections: doc.data().userData.lovedCollections,
      }

      return userData;
    });
  }

  const logout = async () => {

    signOut(auth).then(() => {
        setUser({
            ID: null,
            avatar: null,
            userName: null,
            email: null,
            gender: null,
            marketingEmails: null,
            shareData: null,
            lovedSongs: [],
            collections: [],
            lovedCollections: [],
        });
      }).catch((error) => {
        console.log(error);
      });

    console.log('user done dead2');

  }

  return (
    <AuthContext.Provider value={{ user, signin, signup, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  )
}