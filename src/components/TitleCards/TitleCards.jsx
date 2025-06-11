import React, { useEffect,useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'


const TitleCards = ({title,category}) => {
  const cardsRef = useRef();
  const [apiData, setApiData] = useState([])
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTFmNzkyOTU3ODMyYjljNDhkZTg1MTRhZjE1MzRiYiIsIm5iZiI6MTc0OTU1NTE0NC4wMjMsInN1YiI6IjY4NDgxN2M4MjFjY2VjM2FhNTM0MmQyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.50kV5MfCYT7seyZ6tSf9VGpp7Y81yM48nKc7tlhOPyc'
  }
};



  const handelWheel = (event) =>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }
  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category||"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));
    cardsRef.current.addEventListener('wheel',handelWheel);
  },[])
  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}><img src={`https://image.tmdb.org/t/p/w500/`+card.backdrop_path} alt="" />
          <p>{card.original_title}</p></Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards