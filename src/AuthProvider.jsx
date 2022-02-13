import { createContext, useEffect, useState } from "react";
import { auth, firestore } from "./Firebase/firebase";
export const AuthContext = createContext();
const AuthProvider = (props) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let unsub = auth.onAuthStateChanged(async (response) => {
            console.log(response);
            if (response) {
                let { displayName, email, uid, photoURL, phoneNumber } = response;
                let docRef = firestore.collection("users").doc(uid);
                let docSnapshot = await docRef.get();
                if (!docSnapshot.exists) {
                    docRef.set({displayName, email, uid, photoURL, phoneNumber});
                }
                setUser({ displayName, email, uid, photoURL, phoneNumber });
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => {
            unsub();
        }
    }, []);
    return (
        <AuthContext.Provider value={user}>
            {!loading && props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;