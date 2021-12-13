import React , { useState, useEffect }  from 'react'
import axios from './axios';
import './Row.css';

import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const baseURL = "https://image.tmdb.org/t/p/original/"; 

function Row({ title, fetchUrl, isLargerRow }) {

    const [movies, setMovies] = useState( []);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        //if [], run once when teh row loads, then dont run again
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            // console.log(request.data.results);
            setMovies(request.data.results)
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },

    };

    const handleClick = (movie) => {

        const movietrailer = movie?.name || movie?.title; 
        
        if (trailerUrl) {
            setTrailerUrl("")
        }
        else {
            movieTrailer(movietrailer)
            //movieTrailer(movie?.name || movie?.title || "")
               // .then(res => console.log(res))
                .then((res) => {
                     
                    const urlParams = new URLSearchParams(new URL(res).search);
                    setTrailerUrl(urlParams.get('v'));

                })
                .catch((err) => console.log(err));
        }
    };


    // console.log(movies)
    return (
        <div className="row">
              <h2> {title} </h2> 
            <div className="row__posters">
               
                {movies.map(movie => (
                   
                    <img
                        key={movie.id} 
                        onClick={() => handleClick(movie) }
                        className={`row__poster ${isLargerRow && "row__posterLarge"}`} 
                        src={`${baseURL}${isLargerRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name} /> 
                 ))}

            </div>
           
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
