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
    const [isTextareaVisible, setTextareaVisible] = useState(false);



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
                setTextareaVisible(false);
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
            <section className="d-flex flex-column align-items-center mt-5 p-2 ">
                <img
                    src={getAvatarUrl(avatar_url) || "https://picsum.photos/id/1/200/300"}
                    onError={(e) => {
                        e.target.src = "https://picsum.photos/id/1/200/300";
                    }}
                    alt="Profile"
                    className="rounded-circle proPic "
                />
                <h1 className="mt-3">{username}</h1>
                <p className="under-green" id="bio-button" onClick={() => setTextareaVisible((prev) => !prev)}>insert your bio</p>
                {isTextareaVisible ? (
                    <div
                        id="textarea-container"
                        className={`textarea-container ${isTextareaVisible ? "animate__animated animate__fadeInUp" : ""}`}
                    >
                        <div className="d-flex flex-column align-items-center">
                            <textarea
                                rows="5"
                                cols="60"
                                placeholder="tell us about yourself..."
                                className="p-1 form-control"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            ></textarea>
                            <button
                                onClick={handleSave}
                                className="btn-green mt-3 w-25"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="w-75 text-center">{bio}</p>
                )}

            </section>

        </div>
    );
}