import { useEffect, useState } from "react";
import useProfile from "../hooks/useProfile";
import supabase from "../supabase/client";
import { getSession } from "../hooks/useSession";
import { getAvatarUrl } from "../utils/getAvatarUrl";
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

    useEffect(() => {
        getSession().then((session) => setSession(session));
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", session.user.id)
                .single();

            if (error) setError(error);
            else setProfile(data);
        };

        if (session?.user?.id) fetchProfile();
    }, [session]);

    useEffect(() => {
        const fetchBio = async () => {
            try {
                const {
                    data: { user },
                    error: authError,
                } = await supabase.auth.getUser();

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
                    console.log("Fetched bio:", data.bio);
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
                setTextareaVisible(false);
                setBioEditVisible(true);
            }
        } catch (err) {
            console.error("Unexpected error:", err);
        } finally {
            setLoading(false);
        }
    };

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
        const fetchAvatar = async () => {
            if (!session || !session.user) {
                console.error("Session or user is not defined");
                return;
            }

            try {
                const { data, error } = await supabase
                    .from("profiles")
                    .select("avatar_url")
                    .eq("id", session.user.id)
                    .single();

                if (error) {
                    console.error("Error fetching avatar_url:", error.message);
                } else if (data?.avatar_url) {
                    console.log("Fetched avatar_url:", data.avatar_url);
                    setAvatarUrl(data.avatar_url);
                } else {
                    console.warn("Avatar URL is empty or undefined");
                }
            } catch (err) {
                console.error("Unexpected error fetching avatar_url:", err);
            }
        };

        if (session) fetchAvatar();
    }, [session]);

    const handleAvatarUpdate = async (e) => {
        const file = e.target.files[0];

        if (!file) {
            alert("Please select a file!");
            return;
        }

        setLoading(true);

        try {
            const fileName = `${session.user.id}-${Date.now()}`;

            if (avatar_url) {
                const fileToDelete = avatar_url.split("/").pop();
                await supabase.storage
                    .from("avatars")
                    .remove([fileToDelete]);
            }

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
                    alert("Avatar updated successfully!");
                }
            }
        } catch (err) {
            console.error("Unexpected error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarDelete = async () => {
        if (!avatar_url) {
            alert("No avatar to delete!");
            return;
        }

        setLoading(true);

        try {
            const fileToDelete = avatar_url.split("/").pop();
            const { error: deleteError } = await supabase.storage
                .from("avatars")
                .remove([fileToDelete]);

            if (deleteError) {
                console.error("Error deleting avatar:", deleteError.message);
                alert("Error deleting avatar!");
                setLoading(false);
                return;
            }

            const { error } = await supabase
                .from("profiles")
                .update({ avatar_url: null })
                .eq("id", session.user.id);

            if (error) {
                console.error("Error updating profile:", error.message);
            } else {
                setAvatarUrl(null);
                alert("Avatar deleted successfully!");
            }
        } catch (err) {
            console.error("Unexpected error:", err);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="d-flex vh-100 mt-5 pt-5 p-2 d-flex justify-content-center">
            <section className="d-flex flex-column align-items-center mt-5 p-2 ">
                <img
                    // src={getAvatarUrl(avatar_url) || "https://picsum.photos/id/1/200/300"}
                    src={profile?.avatar_url || "https://picsum.photos/id/1/200/300"}
                    onError={(e) => {
                        e.target.src = "https://picsum.photos/id/1/200/300";
                    }}
                    alt="Profile"
                    className="rounded-circle proPic "
                />
                <input
                    type="file"
                    accept="image/*"
                    className="form-control mt-3"
                    onChange={handleAvatarUpload}
                    disabled={loading}
                />
                {/* <div className="d-flex gap-3 mt-3">
                    <button
                        className="btn btn-primary"
                        onClick={() => document.getElementById("avatarInput").click()} // Attiva l'input nascosto
                        disabled={loading}
                    >
                        {loading ? "Uploading..." : "Upload/Update Avatar"}
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={handleAvatarDelete}
                        disabled={loading || !avatar_url}
                    >
                        {loading ? "Deleting..." : "Delete Avatar"}
                    </button>
                </div> */}
                <h1 className="mt-3">{username}</h1>
                <Link to={`publicprofile`}>
                    <p>view your public profile</p>
                </Link>
                {!isBioEditVisible && (
                    <p className="under-green" id="bio-button" onClick={() => setTextareaVisible(true)}>
                        insert your bio
                    </p>
                )}
                {isBioEditVisible && (
                    <p className="under-green" id="bio-button-edit" onClick={() => setTextareaVisible(true)}>
                        edit your bio
                    </p>
                )}

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
