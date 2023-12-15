import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './Style.css'


const Add = () => {
    const [id, idchange] = useState('')
    const [name, Namechange] = useState('');
    const [Released, Releasedchange] = useState('');
    const [Runtime, Runtimechange] = useState('');
    const [Genre, Genrechange] = useState('');
    const [Genre2, Genre2change] = useState('');
    const [Genre3, Genre3change] = useState('');
    const [Screen, Screenchange] = useState('');
    const [Screen2, Screen2change] = useState('');
    const [Screen3, Screen3change] = useState('');
    const [Screen4, Screen4change] = useState('');
    const [Certificate, Certificatechange] = useState('');
    const [Cast, Castchange] = useState('');
    const [Images, Imageschange] = useState('');
    const [Image2, Image2change] = useState('');
    const [Image3, Image3change] = useState('');
    const [Crew, Crewchange] = useState('');
    const [Images2, Images2change] = useState('');
    const [Image4, Image4change] = useState('');
    const [Image5, Image5change] = useState('');
    const [Description, Descriptionchange] = useState('');
    const [Language, Languagechange] = useState('');
    const [Language2, Language2change] = useState('');
    const [Language3, Language3change] = useState('');
    const [Language4, Language4change] = useState('');
    const [Language5, Language5change] = useState('');
    const [Video, Videochange] = useState('');
    const [Rating, Ratingchange] = useState('');
    const [Votes, Voteschange] = useState('');
    const [Response, Responsechange] = useState('');
    const [MovieIcon, MovieIconchange] = useState('');


    async function addMovie(e) {
        e.preventDefault();
        const newMovie = {
            id, MovieIcon, name, Released, Runtime, Genre: [Genre2, Genre3], Screen: [Screen2, Screen3, Screen4], Cast, Certificate, Language: [Language2, Language3, Language4, Language5], Video,
            Images: [Image2, Image3], Crew, Images2: [Image4, Image5], Description, Rating, Votes, Response
        };

        try {
            const result = await (await axios.post("http://localhost:5000/api/movies/addMovies", newMovie)).data;
            console.log(result)
            notify();
        } catch (error) {
            console.log(error)
        }

    }
    const notify = () => {
        toast("SuceesFully Inserted", {
          autoClose: 2000 
        });
      };
    return (
        <div className="">
            <form onSubmit={addMovie}>
                <input
                    value={id}
                    disabled="disabled"
                    className="form-control" id="input"
                    placeholder="Id" />


                <input
                    required
                    value={MovieIcon}
                    onChange={(e) => { MovieIconchange(e.target.value) }}
                    className="form-control" id="input"
                    placeholder="Icon"
                />
                <input
                    required
                    value={name}
                    onChange={(e) => { Namechange(e.target.value) }}
                    className="form-control" id="input"
                    placeholder="Enter Name:"
                />

                <input
                    required
                    value={Released}
                    onChange={(e) => Releasedchange(e.target.value)}
                    className="form-control" id="input"
                    placeholder="Date:"
                />


                <input
                    required
                    value={Runtime}
                    onChange={(e) => Runtimechange(e.target.value)}
                    className="form-control" id="input"
                    placeholder="RunTime"
                />
                <div className="flex">
                    <input
                        value={Genre}
                        onChange={(e) => { Genrechange(e.target.value) }}
                        className="form-control" id="input1"
                        placeholder="Genre:"
                    />
                    <input
                        value={Genre2}
                        onChange={(e) => { Genre2change(e.target.value) }}
                        className="form-control" id="input1"
                        placeholder="Genre:"
                    /><input
                        value={Genre3}
                        onChange={(e) => { Genre3change(e.target.value) }}
                        className="form-control" id="input1"
                        placeholder="Genre:"
                    />
                </div>

                {/* Screen                */}
                <div className="flex">
                    <input
                        value={Screen}
                        onChange={(e) => { Screenchange(e.target.value) }}
                        className="form-control" id="input2"
                        placeholder="Screens:"
                    />
                    <input
                        value={Screen2}
                        onChange={(e) => { Screen2change(e.target.value) }}
                        className="form-control" id="input2"
                        placeholder="Screen2:"
                        style={{ width: "113px" }}
                    />
                    <input
                        value={Screen3}
                        onChange={(e) => { Screen3change(e.target.value) }}
                        className="form-control" id="input2"
                        placeholder="Screen3:"
                    />
                    <input
                        value={Screen4}
                        onChange={(e) => { Screen4change(e.target.value) }}
                        className="form-control" id="input2"
                        placeholder="Screen4:"
                    />

                </div>
                <input
                    required
                    value={Certificate}
                    onChange={(e) => { Certificatechange(e.target.value) }}
                    className="form-control" id="input"
                    placeholder="Certificate:"
                />

                <input
                    required
                    value={Cast}
                    onChange={(e) => { Castchange(e.target.value) }}
                    className="form-control" id="input"
                    placeholder="Cast"
                />

                <div className="flex">
                    <input
                        value={Images}
                        onChange={(e) => { Imageschange(e.target.value) }}
                        className="form-control" id="input3"
                        placeholder="Cast Url1:"
                    />

                    <input
                        value={Image2}
                        onChange={(e) => { Image2change(e.target.value) }}
                        className="form-control" id="input3"
                        placeholder="Cast Url2:"
                    />

                    <input
                        value={Image3}
                        onChange={(e) => { Image3change(e.target.value) }}
                        className="form-control" id="input3"
                        placeholder="Cast Url3:"
                    />
                </div>
                <input
                    value={Crew}
                    onChange={(e) => { Crewchange(e.target.value) }}
                    className="form-control" id="input"
                    placeholder="Crew Name:"
                />
                <div className="flex">
                    <input
                        value={Images2}
                        onChange={(e) => { Images2change(e.target.value) }}
                        className="form-control" id="input4"
                        placeholder="Crew Url1:"
                    />

                    <input
                        value={Image4}
                        onChange={(e) => { Image4change(e.target.value) }}
                        className="form-control" id="input4"
                        placeholder="Crew Url2:"
                    />

                    <input
                        value={Image5}
                        onChange={(e) => { Image5change(e.target.value) }}
                        className="form-control" id="input4"
                        placeholder="Crew Url3:"
                    />
                </div>
                <input
                    value={Description}
                    onChange={(e) => { Descriptionchange(e.target.value) }}
                    className="form-control" id="input"
                    placeholder="Description:"
                />

                {/* Language */}
                <div className="flex">
                    <input
                        value={Language}
                        onChange={(e) => { Languagechange(e.target.value) }}
                        className="form-control" id="input5"
                        placeholder="Lang:"
                    />
                    <input
                        value={Language2}
                        onChange={(e) => { Language2change(e.target.value) }}
                        className="form-control" id="input5"
                        placeholder="Lang2:"
                    />
                    <input
                        value={Language3}
                        onChange={(e) => { Language3change(e.target.value) }}
                        className="form-control" id="input5"
                        placeholder="Lang4:"
                    />
                    <input
                        value={Language4}
                        onChange={(e) => { Language4change(e.target.value) }}
                        className="form-control" id="input5"
                        placeholder="Lang4:"
                    />
                    <input
                        value={Language5}
                        onChange={(e) => { Language5change(e.target.value) }}
                        className="form-control" id="input5"
                        placeholder="Lang5:"
                    />
                </div>
                <input
                    value={Video}
                    onChange={(e) => { Videochange(e.target.value) }}
                    className="form-control" id="input"
                    placeholder="Trailer Url:"
                />


                <input
                    value={Rating}
                    onChange={(e) => { Ratingchange(e.target.value) }}
                    className="form-control" id="input"
                    placeholder="Rating:"
                />

                <input
                    value={Votes}
                    onChange={(e) => { Voteschange(e.target.value) }}
                    className="form-control" id="input"
                    placeholder="Add Votes:"
                />

                <input
                    checked={Response}
                    onChange={e => Responsechange(e.target.checked)}
                    type="checkbox"
                    className="form-check-input" id="input" />
                <label className="form-check-label">Is Active</label>
                <br />
                <button className="btn btn-success" type="submit" style={{ width: "180px" }}>
                    Save
                </button>
            </form>
        </div>
    );
};

export default Add;
