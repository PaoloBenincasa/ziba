import { Link } from "react-router"
import SignUp from "./SignUp"
import { useEffect } from "react"
import supabase from "../supabase/client";

export default function Home() {
    useEffect(()=>{
        async function getSession(params){
            const {data, error} = await supabase.auth.getSession();
            console.log(data);
            
        }
        getSession();
    }, []);

    return (
        <div className="vh-100">
            <section className="hero row vw-100 text-end gap-3">
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
                            <Link to={'/signup'}>
                                <span className="txtBlack under-green ms-1">join us!</span>
                            </Link>
                        </small>
                    </div>
                </div>
                <div className="col-5 hero-right">

                </div>
            </section>
        </div>
    )
}