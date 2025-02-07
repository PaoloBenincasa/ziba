import { Link } from "react-router"
import SignUp from "./SignUp"
import { useEffect, useState } from "react"
import supabase from "../supabase/client";
import ArtistCard from "../Components/ArtistCard/ArtistCard";

export default function Home() {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        async function fetchArtists() {
            const { data, error } = await supabase
                .from('profiles')
                .select('username, first_name, last_name, avatar_url, bio, id');

            if (data) {
                setArtists(data);
            }
        }

        fetchArtists();
    }, []);

    useEffect(() => {
        async function getSession(params) {
            const { data, error } = await supabase.auth.getSession();
            console.log(data);

        }
        getSession();
    }, []);

    return (
        <div className="vh-100">
            <section className="hero row w-100 text-end gap-5 pt-5">
                <div className="col-5">
                    <h2>
                        <span>
                            <h1 className="mb-0 under-green">
                                <i>
                                    Songggs
                                </i>
                            </h1>
                        </span>
                        your personal musical diary
                    </h2>
                    <h5 className="txtGrey">
                        Ever struggled to keep track of the music you're working on?
                        This is the place for you! Work on your lyrics, store your demos, collaborate with other artists.
                    </h5>
                    <Link to={`/write`}>

                        <button className="btn-green mt-3">Start writing!</button>
                    </Link>
                    <div>

                        <small className="txtGrey">don't have an account yet?
                            <Link to={'/signup'} className="home-link">
                                <span className=" ms-1 ">join us!</span>
                            </Link>
                        </small>
                    </div>
                </div>
                <div className="col-3 hero-right">

                </div>
            </section>
            <section className="vh-100 w-75 mx-auto">
                <div className="text-center mb-5 txtGrey">
                    <h5>
                        our artists
                    </h5>
                </div>
                <div className="d-flex align-items-center justify-content-around">
                    {artists.map((artist) => (
                        <ArtistCard key={artist.username} artist={artist} />
                    ))}
                </div>
            </section>
        </div>
    )
}