// import usePublicProfile from '../../hooks/usePublicProfile';
// import './ArtistCard.css'
// import { Link } from 'react-router';

// export default function ArtistCard() {
//     const { loading, username, first_name, last_name, avatar_url, bio } = usePublicProfile()

//     if (loading) {
//         return <div>Loading...</div>
//     }

//     return (

//         <Link to={`profile/publicprofile`} className='artist-link'>
//             <div className="artist-card rounded">

//                 <div>

//                     <img src={avatar_url} alt={`${first_name} ${last_name}`} className="artist-card-avatar" />
//                     <h4>{username}</h4>
//                 </div>
//                 {/* <p className='artist-card-bio'>{bio}</p> */}
//                 <button className='btn-green'>Genres</button>
//             </div>
//         </Link>
//     )
// }

import './ArtistCard.css';
import { Link } from 'react-router';

export default function ArtistCard({ artist }) {
    if (!artist) {
        return <div>Loading...</div>;
    }

    const { username, first_name, last_name, avatar_url, id } = artist;

    return (
        <Link to={`/publicprofile/${id}`} className="artist-link">
            <div className="artist-card rounded">
                <img src={avatar_url} alt={`${first_name} ${last_name}`} className="artist-card-avatar" />
                <h4 className='artist-card-username'>{username}</h4>
                <button className="btn-green">Genres</button>
            </div>
        </Link>
    );
}



