import { createContext, useEffect, useState } from "react";
import { app } from "../../Firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();



const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateName = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }

    const updatePhoto = (photo) => {
        return updateProfile(auth.currentUser, {
            photoURL: photo
        })
    }

    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }


    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const googleLogIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }




    useEffect(() => {
        const unSUbscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unSUbscribe();
        }
    }, []);

    const contextItems = {
        user,
        loading,
        createUser,
        updateName,
        updatePhoto,
        logIn,
        logOut,
        googleLogIn
    }

    return (
        <AuthContext.Provider value={contextItems}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;