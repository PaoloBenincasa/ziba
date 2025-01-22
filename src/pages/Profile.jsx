import { useEffect, useState } from "react";
import useProfile from "../hooks/useProfile";
import supabase from "../supabase/client";
import { getSession } from "../hooks/useSession";
import { getAvatarUrl } from "../utils/getAvatarUrl";



export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [session, setSession] = useState(null);
    const [error, setError] = useState(null);
    const { username } = useProfile();
    const [loading, setLoading] = useState(false);
    const [bio, setBio] = useState("");
    const [avatar_url, setAvatarUrl] = useState(null);



    useEffect(() => {
        getSession().then((session) => setSession(session));
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();

            if (error) setError(error);
            else setProfile(data);
        };

        if (session?.user?.id) fetchProfile();
    }, [session]);

    useEffect(() => {
        const fetchBio = async () => {
            const user = supabase.auth.user();
    
            if (user) {
                const { data, error } = await supabase
                    .from("profiles")
                    .select("bio")
                    .eq("id", user.id)
                    .single();
    
                if (error) {
                    console.error("Error fetching bio:", error.message);
                } else {
                    console.log("Fetched bio:", data.bio); 
                    setBio(data.bio || "");
                }
            }
        };
    
        fetchBio();
    }, []);
    

    const handleSave = async () => {
        setLoading(true);

        try {
            const {
                data: { user },
                error: authError,
            } = await supabase.auth.getUser();

            if (authError || !user) {
                console.error("Error fetching authenticated user:", authError);
                setLoading(false);
                return;
            }

            const { error } = await supabase
                .from("profiles")
                .update({ bio })
                .eq("id", user.id);

            if (error) {
                console.error("Error updating bio:", error.message);
            } else {
                console.log("Biography updated successfully!");
                alert("Biography updated successfully!");
            }
        } catch (err) {
            console.error("Unexpected error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchAvatar = async () => {
            if (!session || !session.user) {
                console.error("Session or user is not defined");
                return;
            }

            const { data, error } = await supabase
                .from('profiles')
                .select('avatar_url')
                .eq('id', session.user.id);

            if (error) {
                console.error(error);
            } else {
                console.log("Fetched avatar_url:", data);
                console.log(getAvatarUrl(avatar_url));

                setAvatarUrl(data[0]?.avatar_url || null);
            }
        };

        if (session) {
            fetchAvatar();
        }
    }, [session]);


    return (
        <div className="d-flex vh-100 mt-5 pt-5 p-2 d-flex justify-content-center">
            <section className="d-flex flex-column align-items-center ">
                <img
                    src={getAvatarUrl(avatar_url) || "https://picsum.photos/id/1/200/300"}
                    onError={(e) => {
                        e.target.src = "https://picsum.photos/id/1/200/300";
                    }}
                    alt="Profile"
                    className="rounded-circle w-25 "
                />
                <h1>{username}</h1>
                <div className="bio-container ">
                    <p className="under-green">inserisci la tua bio</p>
                </div>
            </section>
            {/* <div className="profile-container">
                <h2>Update Your Biography</h2>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Write about yourself..."
                    className="form-control"
                    rows={5}
                />
                <button
                    onClick={handleSave}
                    className="btn btn-primary mt-3"
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save"}
                </button>
            </div> */}
        </div>
    );
}