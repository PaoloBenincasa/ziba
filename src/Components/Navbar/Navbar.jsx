import './Navbar.css'

export default function Navbar() {
    return (
        <nav>
            <ul className='d-flex align-items-center justify-content-around w-50 '>
                <li>
                    <i class="bi bi-house-fill"></i>
                    home
                </li>
                <li>
                    <i class="bi bi-search"></i>
                    search
                </li>
                <li>
                    <i class="bi bi-pen-fill"></i>
                    write
                </li>
                <li>
                    <i class="bi bi-person-square"></i>                    
                    profile
                </li>
            </ul>
        </nav>
    )
}