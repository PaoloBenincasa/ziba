import useProfile from '../../hooks/useProfile';
import './ArtistCard.css'

export default function ArtistCard() {
    const { loading, username, first_name, last_name, avatar_url, bio } = useProfile()

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="artist-card">
            <img src={avatar_url} alt={`${first_name} ${last_name}`} className="artist-card-avatar" />
            <h4>{username}</h4>
            <p className='artist-card-bio'>{bio}</p>
        </div>
    )
}


