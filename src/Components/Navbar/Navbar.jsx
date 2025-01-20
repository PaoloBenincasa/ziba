import './Navbar.css'
import { Link } from 'react-router'

export default function Navbar() {
    return (
        <nav>
            <ul className='d-flex align-items-center justify-content-around w-50 '>
                <Link to={`/`} className='link'>
                    <li>
                        <i className="bi bi-house-fill"></i>
                        home
                    </li>
                </Link>
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
                <Link to={`/signin`} className='link'>
                <li>
                    <i class="bi bi-person-square"></i>
                    account
                </li>
                </Link>

            </ul>
        </nav>
    )
}