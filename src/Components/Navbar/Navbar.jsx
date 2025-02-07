import './Navbar.css'
import { Link } from 'react-router'
import supabase from '../../supabase/client'
import { useContext } from 'react'
import SessionContext from '../../context/SessionContext'

export default function Navbar() {
    const session = useContext(SessionContext);
    const firstName = session?.user?.user_metadata?.first_name;
    const id  = session?.user?.user_metadata?.id;
    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            alert(error.message);
        }
    }



    return (
        <nav className='d-flex align-items-center justify-content-between p-3'>
            <div className='w-25'>

                <Link to={`/`} className='link'>
                    <div className='under-green fst-italic'>
                        Songggs
                    </div>
                </Link>
            </div>
            <ul className='d-flex align-items-center justify-content-around w-50 nav-center'>
                <Link to={`/write`} className='link'>
                    <li>
                        <i className="bi bi-pen-fill"></i>
                        write
                    </li>
                </Link>
                <li>
                    <i className="bi bi-search"></i>
                    search
                </li>
                <li>
                    <i className="bi bi-file-music-fill"></i>
                    catalog
                </li>
            </ul>
            <div className='w-25 text-end'>
                {session ? (

                    <div className="dropdown">
                        <a className="dropdown-toggle under-green txtGrey" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {firstName}
                        </a>

                        <ul className="dropdown-menu">
                            <Link to={`/profile/${id}`}>
                                <div className="dropdown-item" href="#">Update profile</div>
                            </Link>
                            <a onClick={signOut} className="dropdown-item" href="#">Log out</a>
                        </ul>
                    </div>
                ) : (

                    <div className="dropdown">
                        <a className="dropdown-toggle text-decoration-none txtGrey" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            account
                        </a>

                        <ul className="dropdown-menu">
                            <Link to={'/signin'}>
                                <div className="dropdown-item" href="#">Sign in</div>
                            </Link>
                            <Link to={'/signup'}>
                                <div className="dropdown-item" href="#">Sign up</div>
                            </Link>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    )
}