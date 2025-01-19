import { useState } from "react";
import './SongForm.css';

const SongForm = ({ onSave }) => {
    const [song, setSong] = useState({
        title: '',
        lyrics_with_chords: '',
        mp3_url: '',
        is_published: false,
        published_libk: '',
        has_copyright: false,
        is_private: true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSong({ ...song, [name]: value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(song);
    };

    const handleRadioChange = (e) => {
        setSong({
            ...song,
            has_copyright: e.target.value === 'true',
        });
    };


    return (
        <form onSubmit={handleSubmit} className="song-form">
            <div className="d-flex flex-column">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="title"
                    onChange={handleChange}
                    className="w-50 p-1"
                    value={song.title} />
            </div>
            <div className="d-flex flex-column">
                <label htmlFor="lyrics_with_chords">Lyrics</label>
                <textarea
                    name="lyrics_with_chords"
                    onChange={handleChange}
                    cols="30"
                    rows="20"
                    id="lyrics_with_chords"
                    placeholder="here's where the magic happens!"
                    className="p-1">
                </textarea>
            </div>
            <div className="d-flex flex-column">
                <label htmlFor="mp3_url">Mp3 file</label>
                <input
                    type="file"
                    id="mp3_url"
                    name="mp3_url"
                    accept="audio/mp3"
                    onChange={handleChange}
                />
            </div>
            <div className="d-flex flex-column">
                <label htmlFor="published_link">Link</label>
                <input
                    id="published_link"
                    name="published_link"
                    type="url"
                    placeholder="insert the link to your song"
                    value={song.published_link}
                    onChange={handleChange}
                    className="w-25 p-1"
                />
            </div>
            <div className="d-flex">
                <p>Is the song copyrighted?</p>
                <div className="d-flex gap-2 ms-2">
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="has_copyright"
                                value="true"
                                checked={song.has_copyright === true}
                                onChange={handleRadioChange}
                            />
                            Yes
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="has_copyright"
                                value="false"
                                checked={song.has_copyright === false}
                                onChange={handleRadioChange}
                            />
                            No
                        </label>
                    </div>
                </div>
            </div>
            <div className="d-flex">
                <p>Privacy</p>
                <div className="d-flex gap-2 ms-2">
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="is_private"
                                value="true"
                                checked={song.is_private === true}
                                onChange={handleRadioChange}
                            />
                            Private
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="is_private"
                                value="false"
                                checked={song.is_private === false}
                                onChange={handleRadioChange}
                            />
                            Public
                        </label>
                    </div>
                </div>
            </div>
            <button className="btn-green w-25" type="submit">Save</button>
        </form>
    )
};

export default SongForm;