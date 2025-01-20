import { Link } from "react-router"
export default function SignUp() {
    return (
        <div className="vh-100 container d-flex align-items-center justify-content-center">
            <form className="row w-100 align-items-center justify-content-center">
                    <h5 className="txtGrey text-center mb-3 mt-3">
                        Create your account
                    </h5>
                <div className="col-md-4">
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" aria-describedby="emailHelp" name="username" />
                    </div>
                    <div className="mb-3 ">
                        <label htmlFor="first_name" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="first_name" aria-describedby="emailHelp" name="first_name" />
                    </div>
                    <div className="mb-3 ">
                        <label htmlFor="last_name" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="last_name" aria-describedby="emailHelp" name="last_name" />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="mb-3 ">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" />
                    </div>
                    <div className="d-flex flex-column align-items-start">
                        <button type="submit" className="btn-green mb-3 mt-2">Sign up</button>
                        <small
                            className="txtGrey">already have an account?
                            <Link to={`/SignIn`}>
                                <span className="txtBlack ms-1">sign in!</span>
                            </Link>
                        </small>
                    </div>
                </div>
            </form>
        </div>
    )
}