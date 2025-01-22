import { Link, useNavigate } from "react-router";
import supabase from "../supabase/client";
import { ToastContainer, toast } from 'react-toastify';




export default function SignUp() {
    const navigate = useNavigate();
    const handleSubmission = async (event) => {
        event.preventDefault();
        // catturo i dati del form
        const formRegister = event.currentTarget;
        const { email, password, username, first_name, last_name } = Object.fromEntries(new FormData(formRegister));
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        username,
                        first_name,
                        last_name,
                    },
                },
            })
            if (error) {
                toast.error('Error registering user')

            } else {
                toast.success('Check your email for confirmation link')
                await new Promise((resolve) => setTimeout(resolve, 2000));

                formRegister.reset();
                navigate('/');
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className="vh-100 container d-flex align-items-center justify-content-center">
            <form onSubmit={handleSubmission} className="row w-100  justify-content-center">
                <h5 className="txtGrey text-center mb-4 mt-3">
                    Create your account
                </h5>
                <div className="col-md-4">
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" aria-describedby="emailHelp" name="username" placeholder="use your stage name" />
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
                    <div className="mb-3 mt-5 d-flex align-items-end">
                        <button type="submit" className="btn-green">Sign up</button>
                        <small
                            className="txtGrey ms-1">already have an account?
                            <Link to={`/SignIn`}>
                                <span className="txtBlack ms-1 under-green">sign in!</span>
                            </Link>
                        </small>
                    </div>
                </div>
            </form>
            <ToastContainer position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}
