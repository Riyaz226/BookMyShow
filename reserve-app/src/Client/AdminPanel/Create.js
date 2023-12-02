import { useState } from "react";
import axios from 'axios';

const Add = () => {
    const[id,idchange]=useState('')
    const [name, Namechange] = useState('');
    const [Genre, Genrechange] = useState('');
    const [Genre2, Genre2change] = useState('');
    const [Certificate, Certificatechange] = useState('');
    const [Language, Languagechange] = useState('');
    const [Video, Videochange] = useState('');
    const [Response, Responsechange] = useState('');
    const [Images, Imageschange] = useState('');
    const [Images2, Images2change] = useState('');
    const [Images3, Images3change] = useState('');
    
    async function addMovie(e) {
        e.preventDefault();
        const newMovie = {id,name,Genre,Genre2,Certificate,Language,Response,Video,Images:[Images2,Images3]};
    
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
                <input 
                value={id} 
                disabled="disabled" 
                className="form-control"/>
                              
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
                    value={Images2}
                    onChange={(e) => {Images2change(e.target.value)}}
                    className="form-control"
                />

                <input
                    value={Images3}
                    onChange={(e) => {Images3change(e.target.value)}}
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

export default Add;
