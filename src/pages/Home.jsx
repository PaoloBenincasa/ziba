import { Link } from "react-router"

export default function Home() {
    return (
        <div className="vh-100">
            <section className="hero row vw-100">
                <div className="col-5">
                    <h2>
                        <span>
                            <h1 className="mb-0 under-green">
                                Sonnngs
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

                        <small className="txtGrey">don't have an account yet? <span className="txtBlack">join us!</span> </small>
                    </div>
                </div>
                <div className="col-3 hero-right">

                </div>
            </section>
        </div>
    )
}