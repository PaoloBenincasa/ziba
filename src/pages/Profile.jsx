import { useEffect, useState } from "react";
import useProfile from "../hooks/useProfile";
import supabase from "../supabase/client";
import { getSession } from "../hooks/useSession";
import { Link } from "react-router";

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [session, setSession] = useState(null);
    const [error, setError] = useState(null);
    const { username } = useProfile();
    const [loading, setLoading] = useState(false);
    const [bio, setBio] = useState("");
    const [avatar_url, setAvatarUrl] = useState(null);
    const [isTextareaVisible, setTextareaVisible] = useState(false);
    const [isBioEditVisible, setBioEditVisible] = useState(false);
    const id  = session?.user?.user_metadata?.id;


    useEffect(() => {
        getSession().then((session) => setSession(session));
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!session?.user?.id) return;

            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", session.user.id)
                .single();

            if (error) {
                setError(error);
            } else {
                setProfile(data);
            }
        };

        fetchProfile();
    }, [session]);

    const handleAvatarUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) {
            alert("Please select a file!");
            return;
        }

        setLoading(true);

        try {
            const fileName = `${session.user.id}-${Date.now()}`;
            const { data, error: uploadError } = await supabase.storage
                .from("avatars")
                .upload(fileName, file);

            if (uploadError) {
                console.error("Error uploading avatar:", uploadError.message);
                alert("Error uploading avatar!");
                setLoading(false);
                return;
            }

            const { data: publicUrlData } = supabase.storage
                .from("avatars")
                .getPublicUrl(fileName);

            if (publicUrlData?.publicUrl) {
                const { error } = await supabase
                    .from("profiles")
                    .update({ avatar_url: publicUrlData.publicUrl })
                    .eq("id", session.user.id);

                if (error) {
                    console.error("Error updating profile:", error.message);
                } else {
                    setAvatarUrl(publicUrlData.publicUrl);
                    alert("Avatar uploaded successfully!");
                }
            } else {
                console.error("Public URL not retrieved correctly");
            }
        } catch (err) {
            console.error("Unexpected error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchBio = async () => {
            try {
                const { data: { user }, error: authError } = await supabase.auth.getUser();
                if (authError || !user) {
                    console.error("Error fetching authenticated user:", authError);
                    return;
                }

                const { data, error } = await supabase
                    .from("profiles")
                    .select("bio")
                    .eq("id", user.id)
                    .single();

                if (error) {
                    console.error("Error fetching bio:", error.message);
                } else {
                    setBio(data.bio || "");
                }
            } catch (err) {
                console.error("Unexpected error:", err);
            }
        };

        fetchBio();
    }, []);

    const handleSave = async () => {
        setLoading(true);
        try {
            const { data: { user }, error: authError } = await supabase.auth.getUser();
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
                setTextareaVisible(false);
                setBioEditVisible(true);
            }
        } catch (err) {
            console.error("Unexpected error:", err);
        } finally {
            setLoading(false);
        }
    };

    if (!session || !profile) {
        return <div>Loading...</div>;
    }

     
    
    async function deleteProfile(id) {
        // Get the current session using supabase.auth.getSession()
        const { data: { session }, error } = await supabase.auth.getSession();
    
        if (error || !session) {
            console.error('Session not found or error fetching session:', error);
            return;
        }
    
        const supabaseJwt = session.access_token;  // Retrieve the JWT token from the session
    
        if (!supabaseJwt) {
            console.error('JWT token is missing');
            return;
        }
    
        const response = await fetch(
            `https://fseeshmepnlxljczdjem.supabase.co/rest/v1/profiles?id=eq.${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${supabaseJwt}`, // Use the retrieved JWT token
                    apikey: import.meta.env.VITE_SUPABASE_KEY,                   // Make sure SUPABASE_KEY is correctly defined
                },
            }
        );
    
        if (!response.ok) {
            console.error('Error during deletion:', await response.json());
            return;
        }
    
        const data = await response.json();
        console.log('Row deleted successfully:', data);
    }
    
    
        
    
    
    

    return (
        <div className="d-flex vh-100 mt-5 pt-5 p-2 d-flex justify-content-center">
            <section className="d-flex flex-column align-items-center mt-5 p-2">
                <img
                    src={profile.avatar_url || "https://picsum.photos/id/1/200/300"}
                    onError={(e) => {
                        e.target.src = "https://picsum.photos/id/1/200/300";
                    }}
                    alt="Profile"
                    className="rounded-circle proPic"
                />
                <input
                    type="file"
                    accept="image/*"
                    className="form-control mt-3"
                    onChange={handleAvatarUpload}
                    disabled={loading}
                />
                <h1 className="mt-3">{username}</h1>
                <Link to={`/publicprofile/${profile.id}`} className="home-link">
                    <p>view your public profile</p>
                </Link>

                {!isBioEditVisible && (
                    <p className="under-green point" onClick={() => setTextareaVisible(true)}>
                        insert your bio
                    </p>
                )}
                {isBioEditVisible && (
                    <p className="under-green point" onClick={() => setTextareaVisible(true)}>
                        edit your bio
                    </p>
                )}

                {isTextareaVisible ? (
                    <div className="textarea-container animate__fadeInUp">
                        <textarea
                            rows="5"
                            placeholder="tell us about yourself..."
                            className="p-1 form-control"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                        <button
                            onClick={handleSave}
                            className="btn-green mt-3"
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                ) : (
                    <p className="w-75 text-center">{bio}</p>
                )}
                <button
                    className="btn btn-danger mt-3"
                    onClick={() => deleteProfile(session?.user?.id)}
                    disabled={loading}>
                    {loading ? "Deleting..." : "Delete Account"}
                </button>

            </section>
        </div>
    );
}

