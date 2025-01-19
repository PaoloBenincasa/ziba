import SongForm from "../Components/SongForm/SongForm";
export default function Write() {
    return (
        <div className="mt-5 pt-5">
            <h1 className="text-center mt-5 mb-5">unleash your inner Dylan!</h1>

            <div className="vh-100 d-flex align-items-center justify-content-center">
                <SongForm />
            </div>
        </div>
    )
}