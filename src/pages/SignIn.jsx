import { Link, useNavigate } from "react-router"
import { ToastContainer, toast } from 'react-toastify';
import supabase from "../supabase/client";

export default function SignIn() {
    const navigate = useNavigate();
    const handleSignIn = async (event) => {
        event.preventDefault();
        const formLogin = event.currentTarget;
        const { email, password } = Object.fromEntries(new FormData(formLogin));
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            if (error) {
                toast.error('Log-in error')
            } else {
                toast.success('Successfully logged-in')
                // await new Promise((resolve) => setTimeout(resolve, 2000));

                formLogin.reset();
                navigate('/');
            }
        } catch (error) {
            alert(error)
        }

    }
    return (
        <div className="vh-100 d-flex align-items-center justify-content-center">
            <form onSubmit={handleSignIn} className="w-50 d-flex flex-column align-items-center">
                <h5 className="w-50 txtGrey text-center mb-3">
                    Please enter your details
                </h5>
                <div className="mb-3 w-50">
                    <label HTMLfor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" />
                </div>
                <div className="mb-3 w-50">
                    <label HTMLfor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" />
                </div>
                <div className="d-flex flex-column align-items-center">
                    <button type="submit" className="btn-green mb-3 mt-2">Sign in</button>
                    <small
                        className="txtGrey">don't have an account yet?
                        <Link to={`/signup`}>
                            <span className="txtBlack ms-1">join us!</span>
                        </Link>
                    </small>
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