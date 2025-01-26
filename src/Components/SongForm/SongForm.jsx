import { useState } from "react";
import './SongForm.css';
import supabase from '../../supabase/client';
import { ToastContainer, toast } from 'react-toastify';

const SongForm = ({ onSave }) => {
    const [song, setSong] = useState({
        title: '',
        lyrics_with_chords: '',
        mp3_url: '',
        published_link: '',
        has_copyright: false,
        is_private: true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSong({ ...song, [name]: value })
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase
            .from('songs')
            .insert([song]);

        if (error) {
            toast.error('Error saving song:', error.message);
        } else {
            toast.success('Song saved successfully:', data);
            onSave(song);
        }
    };


    const handleRadioChange = (e) => {
        const { name, value } = e.target;
        setSong({
            ...song,
            [name]: value === 'true',
        });
    };



    return (
        <form onSubmit={handleSubmit} className="song-form">
            <div className="d-flex flex-column">
                <label htmlFor="title" className="under-green">Title</label>
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
                <div className="d-flex">

                    <label htmlFor="lyrics_with_chords" className="under-green">
                        Lyrics
                    </label>
                    <p className="txtGrey ms-1 mb-0"> To add a chord, right-click on a word and click "Insert Chord".</p>
                </div>

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
                <label htmlFor="mp3_url" className="under-green">Mp3 file</label>
                <input
                    type="file"
                    id="mp3_url"
                    name="mp3_url"
                    accept="audio/mp3"
                    onChange={handleChange}
                />
            </div>
            <div className="d-flex flex-column">
                <label htmlFor="cover_url" className="under-green">Cover</label>
                <input
                    type="file"
                    accept="image/*"
                    id="cover_url"
                    name="cover_url"
                    onChange={handleChange}
                />
            </div>
            <div className="d-flex flex-column">
                <label htmlFor="published_link" className="under-green">Link</label>
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
        </form>
    )
};

export default SongForm;