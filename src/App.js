import React, { useState, useEffect } from 'react';
import searchIcon from './search.svg';
import './App.css';
import MovieCard from './MovieCard';

const API_URL = "http://www.omdbapi.com?apikey=61f5599a";

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

  
    
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        
        setMovies(data.Search);
    };
    
    useEffect(() =>{
        searchMovies("");
    }, []);
    //[] empty because we this will call only at start and not contiously
    
    return(
        <div className='app'>
            <h1>Movie Arena</h1>

            <div className='search'>
                <input 
                    value = {searchTerm}
                    onChange = {(e) => setSearchTerm(e.target.value)}
                    placeholder='Search for movies'
                />

                <img 
                    src= {searchIcon}
                    alt= "search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0 ? (
                <div className='container'>
                    {movies.map((movie) =>{
                        return <MovieCard movie = {movie} />
                    })}
                </div>
                ) : 
                (
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>
                )
            }

        </div>
    );
};

export default App;
