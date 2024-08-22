import { useState, useEffect } from 'react';
import { auth, codeloomAuth } from './firebaseConfig'; // Adjust the import path as needed
import { onAuthStateChanged } from 'firebase/auth';

const useAuth = () => {
    const [currentAuth, setCurrentAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Array to store unsubscribe functions
        const unsubscribes = [];

        // Monitor auth state for both instances
        unsubscribes.push(
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setCurrentAuth(auth);
                    setLoading(false);
                }
            })
        );

        unsubscribes.push(
            onAuthStateChanged(codeloomAuth, (user) => {
                if (user) {
                    setCurrentAuth(codeloomAuth);
                    setLoading(false);
                }
            })
        );

        // Cleanup function to unsubscribe on component unmount
        return () => {
            unsubscribes.forEach((unsubscribe) => unsubscribe());
        };
    }, []);

    return { currentAuth, loading };
};

export default useAuth;
