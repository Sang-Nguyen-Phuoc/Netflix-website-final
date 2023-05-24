import './App.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import NotFound from './Pages/NotFound/NotFound';
import { Routes, Route } from 'react-router-dom';
import MovieDetail from './Pages/MovieDetail/MovieDetail'
import Movies from './Pages/Movies/Movies';
import TVSeries from './Pages/TVSeries/TVSeries';
import { useState } from 'react';
import AppContext from '../src/contexts/AppContext';
import MyList from './Pages/MyList/MyList';



function App() {
  const [movieList, setMovieList] = useState([]);
  const [added, setAdded] = useState(false);
  const onAddToList = (id, movie) => {
    const existingMovie = movieList.find((m) => m.id === id);

    if (existingMovie) {
      // Movie already exists, so remove it from the list
      const updatedList = movieList.filter((m) => m.id !== id);
      setMovieList(updatedList);
      setAdded(false);
    } else {
      // Movie doesn't exist, so add it to the list
      const updatedList = [...movieList, movie];
      setMovieList(updatedList);
      setAdded(true);
    }
    console.log(movieList);
  };
  return (
    <AppContext.Provider
      value={{
        movieList,
        onAddToList,
        added,
      }}
    >
      < div className="App container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Mylist" element={<MyList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/TVSeries" element={<TVSeries />} />
          <Route path="/movies/:movieId" element={<MovieDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AppContext.Provider >
  );
}

export default App;
