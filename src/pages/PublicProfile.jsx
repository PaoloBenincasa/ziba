// import { useEffect, useState } from "react";
// import useProfile from "../hooks/useProfile";
// import supabase from "../supabase/client";
// import { getSession } from "../hooks/useSession";


// export default function PublicProfile() {
//     const [profile, setProfile] = useState(null);
//     const [session, setSession] = useState(null);
//     const [error, setError] = useState(null);
//     const { username } = useProfile();
//     const [loading, setLoading] = useState(false);
//     const [bio, setBio] = useState("");
//     const [avatar_url, setAvatarUrl] = useState(null);

//     useEffect(() => {
//         const fetchProfile = async () => {
//             const { data, error } = await supabase
//                 .from("profiles")
//                 .select("*")
//                 .eq("id", session.user.id)
//                 .single();

//             if (error) setError(error);
//             else setProfile(data);
//         };

//         if (session?.user?.id) fetchProfile();
//     }, [session]);

//     return (
//         <div className="d-flex vh-100 mt-5 pt-5 p-2 d-flex justify-content-center">
//             <section className="d-flex flex-column align-items-center mt-5 p-2 ">
//                 <img
//                     src={profile?.avatar_url || "https://picsum.photos/id/1/200/300"}
//                     onError={(e) => {
//                         e.target.src = "https://picsum.photos/id/1/200/300";
//                     }}
//                     alt="Profile"
//                     className="rounded-circle proPic "
//                 />
//                 <h1 className="mt-3">{username}</h1>
//                 <p className="w-75 text-center">{bio}</p>
//             </section>
//         </div>
//     );
// }

// import usePublicProfile from '../hooks/usePublicProfile';

// export default function PublicProfile() {
//     const { loading, avatar_url, username, bio } = usePublicProfile(); // Hook per recuperare i dati del profilo

//     if (loading) {
//         return <div>Loading...</div>; // Mostra un caricamento finché i dati non sono disponibili
//     }

//     return (
//         <div className="d-flex vh-100 mt-5 pt-5 p-2 d-flex justify-content-center">
//             <section className="d-flex flex-column align-items-center mt-5 p-2">
//                 <img
//                     src={avatar_url || "https://picsum.photos/id/1/200/300"} // Fallback per avatar
//                     onError={(e) => {
//                         e.target.src = "https://picsum.photos/id/1/200/300"; // Se l'immagine non viene caricata
//                     }}
//                     alt="Profile"
//                     className="rounded-circle proPic"
//                 />
//                 <h1 className="mt-3">{username}</h1>
//                 <p className="w-75 text-center">{bio}</p>
//             </section>
//         </div>
//     );
// }

import { useParams } from 'react-router';
import usePublicProfile from '../hooks/usePublicProfile';

export default function PublicProfile() {
    const { id } = useParams();
    const { loading, profile, error } = usePublicProfile(id);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="d-flex vh-100 mt-5 pt-5 p-2 d-flex justify-content-center">
            <section className="d-flex flex-column align-items-center mt-5 p-2">
                <img
                    src={profile?.avatar_url || "https://picsum.photos/id/1/200/300"}
                    onError={(e) => {
                        e.target.src = "https://picsum.photos/id/1/200/300";
                    }}
                    alt="Profile"
                    className="rounded-circle proPic"
                />
                <h1 className="mt-3 under-green">{profile?.username || 'Unknown'}</h1>
                <p className="w-75 text-center">{profile?.bio || 'No bio available.'}</p>
            </section>
        </div>
    );
}

