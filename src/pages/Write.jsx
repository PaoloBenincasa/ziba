import SongForm from "../Components/SongForm/SongForm";
export default function Write() {
    return (
        <div className="mt-5 pt-5">
            <div className="vh-100 d-flex align-items-center justify-content-center mt-5">
                <SongForm onSave={(savedSong) => console.log('Song saved:', savedSong)} />
            </div>
        </div>
    )
}