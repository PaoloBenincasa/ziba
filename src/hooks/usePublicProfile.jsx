// import { useState, useEffect } from 'react';
// import supabase from '../supabase/client';

// export default function usePublicProfile(username) {
//     const [loading, setLoading] = useState(true);
//     const [profile, setProfile] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         let ignore = false;

//         async function fetchPublicProfile() {
//             setLoading(true);

//             const { data, error } = await supabase
//                 .from('profiles')
//                 .select('username, first_name, last_name, avatar_url, bio') 
//                 .eq('username', username) 
//                 .single();

//             if (!ignore) {
//                 if (error) {
//                     setError(error);
//                 } else {
//                     setProfile(data);
//                 }
//                 setLoading(false);
//             }
//         }

//         if (username) {
//             fetchPublicProfile();
//         }

//         return () => {
//             ignore = true;
//         };
//     }, [username]);

//     return { loading, profile, error };
// }

import { useState, useEffect } from 'react';
import supabase from '../supabase/client';

export default function usePublicProfile(id) {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProfile() {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('avatar_url, username, bio')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                setProfile(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        if (id) fetchProfile();
    }, [id]);

    return { loading, profile, error };
}
