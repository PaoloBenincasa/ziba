import SongForm from "../Components/SongForm/SongForm";
export default function Write() {
    return (
        <div className="mt-5 pt-5">
            <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                <div className="txtGrey text-center">

                    <h4>this is your writing desk. <br /> add your lyrics, chords and mp3 of your song or demo </h4>
                </div>
                <SongForm onSave={(savedSong) => console.log('Song saved:', savedSong)} />
            </div>
        </div>
    )
}