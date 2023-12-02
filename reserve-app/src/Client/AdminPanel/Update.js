/* eslint-disable react-hooks/exhaustive-deps */
import { useState,useEffect } from "react";
import axios from 'axios';
import {useParams} from 'react-router-dom'

const Update = () => {
  const { _id } = useParams();

  useEffect(() => {
      fetch("http://localhost:5000/api/movies/updateMovie" + _id).then((res) => {
          return res.json();
      }).then((resp) => {
          idchange(resp.id);
          Namechange(resp.name);
          Genrechange(resp.Genre)
          Genre2change(resp.Genre2)
          Certificatechange(resp.Certificate)
          Languagechange(resp.Language)
          Videochange(resp.Video)
          Responsechange(resp.Response)
          Imageschange(resp.Images)
      }).catch((err) => {
          console.log(err.message);
      })
  }, []); 
  const [id, idchange] = useState('');
  const [name, Namechange] = useState('');
    const [Genre, Genrechange] = useState('');
    const [Genre2, Genre2change] = useState('');
    const [Certificate, Certificatechange] = useState('');
    const [Language, Languagechange] = useState('');
    const [Video, Videochange] = useState('');
    const [Response, Responsechange] = useState('');
    const [Images, Imageschange] = useState('');

    async function addMovie(e) {
        e.preventDefault();
        const newMovie = {id,name,Genre,Genre2,Certificate,Language,Response,Video,Images};
    
        try{
            const result=await(await axios.post("http://localhost:5000/api/movies/addMovies",newMovie)).data;
            console.log(result)
          }catch(error){
             console.log(error)
          }
        
    }

    return (
        <div className="">
            <form onSubmit={addMovie}>
            <label>ID</label>
            <input value={id}  className="form-control"></input>
                <input
                    required
                    value={name}
                    onChange={(e) => {Namechange(e.target.value)}}
                    className="form-control"
                />

                <input
                    value={Genre}
                    onChange={(e) => {Genrechange(e.target.value)}}
                    className="form-control"
                />

                <input
                    value={Genre2}
                    onChange={(e) => {Genre2change(e.target.value)}}
                    className="form-control"
                />

                <input
                    required
                    value={Certificate}
                    onChange={(e) => {Certificatechange(e.target.value)}}
                    className="form-control"
                />

                <input
                    value={Language}
                    onChange={(e) => {Languagechange(e.target.value)}}
                    className="form-control"
                />

                <input
                    value={Video}
                    onChange={(e) => {Videochange(e.target.value)}}
                    className="form-control"
                />

                <input
                    value={Images}
                    onChange={(e) => {Imageschange(e.target.value)}}
                    className="form-control"
                />

              <input 
                 checked={Response} 
                 onChange={e=>Responsechange(e.target.checked)} 
                 type="checkbox" 
                 className="form-check-input"/>
              <label  className="form-check-label">Is Active</label>           
              
                <button className="btn btn-success" type="submit">
                    Save
                </button>
            </form>
        </div>
    );
};

export default Update;
