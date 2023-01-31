import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, updateProfile
} from 'firebase/auth'
import { collection, addDoc, getDocs, setDoc, doc, updateDoc, query, where, } from "firebase/firestore";
import { auth, firestore } from '../config/firebase'
import { async } from '@firebase/util';

const AuthContext = createContext<any>({})

export const useAuth = () => useContext(AuthContext)

interface owner {
  name: string;
  ID: string;
  canonicalURL: string;
  thumbnails?: string[];
}

interface Music {
  ID: string;
  URL: string;
  title: string;
  thumbnails: string[];
  owner: owner;
  musicLengthSec?: number;
  message?: string;
}

interface Music_small {
  ID: string;
  title: string;
  thumbnails: string[];
}

interface Collection {
  ID: string;
  title: string;
  desc: string;
  thumbnails: string;
  ownerID: string;
  music: Music[];
  likes: number;
  categories: string[];
  date: Date;
}

// Type for our user
export interface userState {
    ID: string | null;
    UID_Col: string | null;
    avatar: string | null;
    userName: string | null;
    email: string | null;
    gender: string | null;
    marketingEmails: boolean | null;
    shareData: boolean | null;
    lovedSongs: Music_small[];
    collections: string[];
    lovedCollections: string[];
    followers: string[];
    following: string[];
}


export const AuthContextProvider = ({ children, }: { children: React.ReactNode }) => {

  const [user, setUser] = useState<userState>({
      ID: null,
      UID_Col: null,
      avatar: null,
      userName: null,
      email: null,
      gender: null,
      marketingEmails: null,
      shareData: null,
      lovedSongs: [],
      collections: [],
      lovedCollections: [],
      followers: [],
      following: [],
  });
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
          getUser(user.uid);
      } else {
          setUser({
              ID: null,
              UID_Col: null,
              avatar: null,
              userName: null,
              email: null,
              gender: null,
              marketingEmails: null,
              shareData: null,
              lovedSongs: [],
              collections: [],
              lovedCollections: [],
              followers: [],
              following: [],
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
          UID_Col: '',
          name: (user.displayName ) ? user.displayName : name,
          email: user.email,
          avatar: avatar,
          gender: gender,
          marketingEmails: marketingEmails,
          shareData: shareData,
          collections: [],
          lovedSongs: [],
          lovedCollections: [],
          followers: [],
          following: [],
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
      UID_Col: null,
      avatar: null,
      userName: null,
      email: null,
      gender: null,
      marketingEmails: null,
      shareData: null,
      lovedSongs: [],
      collections: [],
      lovedCollections: [],
      followers: [],
      following: [],
    }

    const q = query(collection(firestore, "users"), where("userData.ID", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      // console.log(doc.data().userData.ID);

      setUser({
        ID: doc.data().userData.ID,
        UID_Col: doc.id,
        avatar: doc.data().userData.avatar,
        userName: doc.data().userData.userName,
        email: doc.data().userData.email,
        gender: doc.data().userData.gender,
        marketingEmails: doc.data().userData.marketingEmails,
        shareData: doc.data().userData.shareData,
        lovedSongs: [...doc.data().userData.lovedSongs],
        collections: [...doc.data().userData.collections],
        lovedCollections: [...doc.data().userData.lovedCollections],
        followers: [...doc.data().userData.followers] || [],
        following: [...doc.data().userData.following] || [],
      });

      const userData = {
        ID: doc.data().userData.ID,
        UID_Col: doc.id,
        avatar: doc.data().userData.avatar,
        userName: doc.data().userData.userName,
        email: doc.data().userData.email,
        gender: doc.data().userData.gender,
        marketingEmails: doc.data().userData.marketingEmails,
        shareData: doc.data().userData.shareData,
        lovedSongs: [...doc.data().userData.lovedSongs],
        collections: [...doc.data().userData.collections],
        lovedCollections: [...doc.data().userData.lovedCollections],
        followers: [...doc.data().userData.followers] || [],
        following: [...doc.data().userData.following] || [],
      }

      return userData;
    });
  }

  const logout = async () => {

    signOut(auth).then(() => {
        setUser({
            ID: null,
            UID_Col: null,
            avatar: null,
            userName: null,
            email: null,
            gender: null,
            marketingEmails: null,
            shareData: null,
            lovedSongs: [],
            collections: [],
            lovedCollections: [],
            followers: [],
            following: [],
        });
      }).catch((error) => {
        console.log(error);
      });

    console.log('user done dead2');

  }

  const likeMusic = async (music: Music_small) => {
    console.log('enter - likeMusic ');

    console.log(music);
    
    
    if (user.ID) {
      console.log('secure user - likeMusic ');
      console.log(user);
      
      const data = { 
        userData : {
          ID: user.ID,
          UID_Col: user.UID_Col,
          avatar: user.avatar,
          userName: user.userName,
          email: user.email,
          gender: user.gender,
          marketingEmails: user.marketingEmails,
          shareData: user.shareData,
          collections: [...user.collections],
          lovedCollections: [...user.lovedCollections],
          followers: [...user.followers] || [],
          following: [...user.following] || [],
          lovedSongs: [...user.lovedSongs, music] 
        }
      };
      try {
        console.log('try data - likeMusic ');
        var UID = ''
        // to make sure user.UID_Col is not null
        if (user.UID_Col) {
          UID = user.UID_Col
        }

        const docRef = doc(firestore, "users", UID);
        updateDoc(docRef, data)
        .then(docRef => {
            console.log("Entire Document has been updated successfully");
        })
        .catch(error => {
            console.log(error);
        })
      } catch (error) {
        console.error('Error updating loved songs: ', error);
      }
    }
    console.log('out - likeMusic ');

  }

  const dislikeMusic = async (music: Music_small) => {
    console.log('enter - dislikeMusic ');

    if (user.ID) {
      console.log('secure user - dislikeMusic ');

      const result = user.lovedSongs.filter(item => item.ID !== music.ID);

      const data = { 
        userData : {
          ID: user.ID,
          UID_Col: user.UID_Col,
          avatar: user.avatar,
          userName: user.userName,
          email: user.email,
          gender: user.gender,
          marketingEmails: user.marketingEmails,
          shareData: user.shareData,
          collections: [...user.collections],
          lovedCollections: [...user.lovedCollections],
          followers: [...user.followers] || [],
          following: [...user.following] || [],
          lovedSongs: result,
        }
      };

      try {
        var UID = ''
        // to make sure user.UID_Col is not null
        if (user.UID_Col) {
          UID = user.UID_Col
        }

        const docRef = doc(firestore, "users", UID);
        updateDoc(docRef, data)
        .then(docRef => {
            console.log("Entire Document has been updated successfully");
        })
        .catch(error => {
            console.log(error);
        })
      } catch (error) {
        console.error('Error updating loved songs: ', error);
      }
    }
    console.log('out - dislikeMusic ');

  }

  return (
    <AuthContext.Provider value={{ user, signin, signup, logout, getUser, likeMusic, dislikeMusic }}>
      {children}
    </AuthContext.Provider>
  )
}