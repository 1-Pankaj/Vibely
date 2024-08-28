import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../Config/firebase.config';
import { codeloomAuth } from '../../../Config/codeloom.firebase.config';

const useAuth = () => {
    const [currentAuth, setCurrentAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let foundUser = false;

        const unsubscribeAuth1 = onAuthStateChanged(auth, (user) => {
            if (user && !foundUser) {
                setCurrentAuth(auth);
                foundUser = true;
                setLoading(false); // Set loading to false once user is found
            }
        });

        const unsubscribeAuth2 = onAuthStateChanged(codeloomAuth, (user) => {
            if (user && !foundUser) {
                setCurrentAuth(codeloomAuth);
                foundUser = true;
                setLoading(false); // Set loading to false once user is found
            }
        });

        // If no user is found, ensure loading is set to false eventually
        const timeoutId = setTimeout(() => {
            if (!foundUser) {
                setLoading(false);
            }
        }, 2000); // Adjust timeout as needed

        // Cleanup function to unsubscribe on component unmount
        return () => {
            unsubscribeAuth1();
            unsubscribeAuth2();
            clearTimeout(timeoutId);
        };
    }, []);

    return { currentAuth, loading };
};

export default useAuth;
