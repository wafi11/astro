import { useEffect, useState } from 'react';
import type { UserProfile } from '../components/types';

const useUserProfile =<T extends UserProfile> () => {
    const [userProfile, setUserProfile] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('/api/profile', {
                    method: 'GET'
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user profile');
                }
                const userData = await response.json();
                setUserProfile(userData);
                setError(null);
            } catch (error) {
                setUserProfile(null);
                setError(error.message);
            }
        };

        fetchUserProfile();
    }, []);

    return { userProfile, error };
};

export default useUserProfile;
