import { Link } from "react-router"

export default function Home() {
    return (
        <div className=" vh-100">
            <section className="hero row vw-100">
                <div className="col-4">
                    <h2>
                        <span>
                            <h1 className="mb-0">
                                Sonnngs
                            </h1>
                        </span>
                        your personal musical diary
                    </h2>
                    <h5>
                        Ever struggled to keep track of the music you're working on?
                        This is the place for you! Work on your lyrics, store your demos, collaborate with other artists.
                    </h5>
                    <Link to={`/write`}>

                        <button className="btn btn-primary mt-3">Start writing!</button>
                    </Link>
                    <p>don't have an account yet? join us!</p>
                </div>
                <div className="col-6 hero-right">

                </div>
            </section>
            <section className="vh-100 p-3">
                <h4>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum illo molestias saepe esse qui quaerat recusandae praesentium error minus, modi, architecto, tenetur et suscipit sint facilis itaque minima officiis sunt ex. Ipsa accusantium provident aliquam facere saepe perferendis sequi repellat at, quidem voluptates dolor porro, illum molestiae labore! Rerum laborum non, optio numquam distinctio commodi reiciendis consequuntur in eos dolorum suscipit. Minima delectus modi laborum error culpa quos quasi alias molestias quam tempora dolorum debitis, fuga inventore explicabo facere eveniet.</h4>
            </section>
        </div>
    )
}