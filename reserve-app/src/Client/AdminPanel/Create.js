import { useState } from "react";
import axios from 'axios';
import './Style.css'


const Add = () => {
    const [id, idchange] = useState('')
    const [name, Namechange] = useState('');
    const [Released, Releasedchange] = useState('');
    const [Runtime, Runtimechange] = useState('');
    const [Genre1, Genre1change] = useState('');
    const [Genre2, Genre2change] = useState('');
    const [Genre3, Genre3change] = useState('');
    const [Screen1, Screen1change] = useState('');
    const [Screen2, Screen2change] = useState('');
    const [Screen3, Screen3change] = useState('');
    const [Screen4, Screen4change] = useState('');
    const [Certificate, Certificatechange] = useState('');
    const [Cast1, Cast1change] = useState('');
    const [Cast2, Cast2change] = useState('');
    const [Cast3, Cast3change] = useState('');
    const [Image1, Image1change] = useState('');
    const [Image2, Image2change] = useState('');
    const [Image3, Image3change] = useState('');
    const [Crew1, Crew1change] = useState('');
    const [Crew2, Crew2change] = useState('');
    const [Crew3, Crew3change] = useState('');
    const [Image4, Image4change] = useState('');
    const [Image5, Image5change] = useState('');
    const [Image6, Image6change] = useState('');
    const [Description, Descriptionchange] = useState('');
    const [Language1, Language1change] = useState('');
    const [Language2, Language2change] = useState('');
    const [Language3, Language3change] = useState('');
    const [Language4, Language4change] = useState('');
    const [Language5, Language5change] = useState('');
    const [Video, Videochange] = useState('');
    const [Response, Responsechange] = useState('');
    const [MovieIcon, MovieIconchange] = useState('');
    const [bgImg, bgImgchange] = useState('');


    async function addMovie(e) {
        e.preventDefault();
        const newMovie = {
            id, MovieIcon:[MovieIcon,bgImg] , name, Released, Runtime, Genre: [Genre1, Genre2, Genre3], Screen: [Screen1, Screen2, Screen3, Screen4], Certificate, Language: [Language1, Language2, Language3, Language4], Video, Cast: [Cast1, Cast2, Cast3],
            CastImages: [Image1, Image2, Image3], Crew: [Crew1, Crew2, Crew3], CrewImages: [Image4, Image5, Image6], Description, Response
        };

        try {
            const result = await (await axios.post("http://localhost:5000/api/movies/addMovies", newMovie)).data;
            console.log(result)
            alert(result)
        } catch (error) {
            console.log(error)
        }

    }

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
                    placeholder="Movie Icon"
                />
                <input
                    required
                    value={bgImg}
                    onChange={(e) => { bgImgchange(e.target.value) }}
                    className="form-control" id="input"
                    placeholder="Bg Icon"
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
                        value={Genre1}
                        onChange={(e) => { Genre1change(e.target.value) }}
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
                        value={Screen1}
                        onChange={(e) => { Screen1change(e.target.value) }}
                        className="form-control" id="input2"
                        placeholder="Screens:"
                    />
                    <input
                        value={Screen2}
                        onChange={(e) => { Screen2change(e.target.value) }}
                        className="form-control" id="input2"
                        placeholder="Screen2:"
                        style={{ width: "111px" }}
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

                {/* Cast Name                */}
                <div className="flex">
                    <input
                        required
                        value={Cast1}
                        onChange={(e) => { Cast1change(e.target.value) }}
                        className="form-control" id="input4"
                        placeholder="Cast1:"
                    />
                    <input
                        required
                        value={Cast2}
                        onChange={(e) => { Cast2change(e.target.value) }}
                        className="form-control" id="input4"
                        placeholder="Cast2:"
                    />
                    <input
                        required
                        value={Cast3}
                        onChange={(e) => { Cast3change(e.target.value) }}
                        className="form-control" id="input4"
                        placeholder="Cast3:"
                    />
                </div>
                <div className="flex">
                    <input
                        value={Image1}
                        onChange={(e) => { Image1change(e.target.value) }}
                        className="form-control" id="input4"
                        placeholder="Cast Url1:"
                    />

                    <input
                        value={Image2}
                        onChange={(e) => { Image2change(e.target.value) }}
                        className="form-control" id="input4"
                        placeholder="Cast Url2:"
                    />

                    <input
                        value={Image3}
                        onChange={(e) => { Image3change(e.target.value) }}
                        className="form-control" id="input4"
                        placeholder="Cast Url3:"
                    />
                </div>
                {/* Crew Name                */}
                <div className="flex">
                    <input
                        required
                        value={Crew1}
                        onChange={(e) => { Crew1change(e.target.value) }}
                        className="form-control" id="input4"
                        placeholder="Crew1:"
                    />
                    <input
                        required
                        value={Crew2}
                        onChange={(e) => { Crew2change(e.target.value) }}
                        className="form-control" id="input4"
                        placeholder="Crew2:"
                    />
                    <input
                        required
                        value={Crew3}
                        onChange={(e) => { Crew3change(e.target.value) }}
                        className="form-control" id="input4"
                        placeholder="Crew3:"
                    />
                </div>

                <div className="flex">
                    <input
                        value={Image4}
                        onChange={(e) => { Image4change(e.target.value) }}
                        className="form-control" id="input4"
                        placeholder="Crew Url1:"
                    />

                    <input
                        value={Image5}
                        onChange={(e) => { Image5change(e.target.value) }}
                        className="form-control" id="input4"
                        placeholder="Crew Url2:"
                    />

                    <input
                        value={Image6}
                        onChange={(e) => { Image6change(e.target.value) }}
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
                        value={Language1}
                        onChange={(e) => { Language1change(e.target.value) }}
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
