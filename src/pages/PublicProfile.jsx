import { useEffect, useState } from "react";
import useProfile from "../hooks/useProfile";
import supabase from "../supabase/client";
import { getSession } from "../hooks/useSession";


export default function PublicProfile() {
    const [profile, setProfile] = useState(null);
    const [session, setSession] = useState(null);
    const [error, setError] = useState(null);
    const { username } = useProfile();
    const [loading, setLoading] = useState(false);
    const [bio, setBio] = useState("");
    const [avatar_url, setAvatarUrl] = useState(null);

    // useEffect(() => {
    //     const fetchProfile = async () => {
    //         const { data, error } = await supabase
    //             .from("profiles")
    //             .select("*")
    //             .eq("id", session.user.id)
    //             .single();

    //         if (error) setError(error);
    //         else setProfile(data);
    //     };

    //     if (session?.user?.id) fetchProfile();
    // }, [session]);

    return (
        <div className="d-flex vh-100 mt-5 pt-5 p-2 d-flex justify-content-center">
            <section className="d-flex flex-column align-items-center mt-5 p-2 ">
                <img
                    src={profile?.avatar_url || "https://picsum.photos/id/1/200/300"}
                    onError={(e) => {
                        e.target.src = "https://picsum.photos/id/1/200/300";
                    }}
                    alt="Profile"
                    className="rounded-circle proPic "
                />
                <h1 className="mt-3">{username}</h1>
                <p className="w-75 text-center">{bio}</p>
            </section>
        </div>
    );
}
