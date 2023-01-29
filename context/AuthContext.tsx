import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, getAuth, updateProfile
} from 'firebase/auth'

import { auth } from '../config/firebase'

const AuthContext = createContext<any>({})

export const useAuth = () => useContext(AuthContext)

// Type for our user
export interface userState {
    ID: string;
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
        ID: '',
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
//   console.log(user)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
            setUser({
                ID: user.uid,
                avatar: user.photoURL,
                userName: user.displayName,
                email: user.email,
                gender: '',
                marketingEmails: false,
                shareData: false,
                lovedSongs: [],
                collections: [],
                lovedCollections: [],
            });
        } else {
            setUser({
                ID: '',
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

    const signup = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password)
        /* .then(()=> {
            updateProfile(auth.currentUser!, {
                displayName: userName, photoURL: avatar, gender: gender, marketingEmails: marketingEmails, shareData: shareData, lovedSongs: lovedSongs, collections: collections, lovedCollections: lovedCollections,
              }).then(() => {
                console.log('signed up secceflly');
                console.log(user)
                
              }).catch((error) => {
                console.log('error - signup');
                console.log(error);
              });
        }) */
    }

  const signin = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    setUser({
        ID: '',
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
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, signin, signup, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}