import './App.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import NotFound from './Pages/NotFound/NotFound';
import { Routes, Route } from 'react-router-dom';
import MovieDetail from './Pages/MovieDetail/MovieDetail'
import Movies from './Pages/Movies/Movies';
import TVSeries from './Pages/TVSeries/TVSeries';
import { useEffect, useState } from 'react';
import AppContext from '../src/contexts/AppContext';
import MyList from './Pages/MyList/MyList';
import TVDetail from './Pages/TVDetail/TVDetail';


function App() {
  const [myMovieList, setMyMovieList] = useState([]);
  const [myTVList, setMyTVList] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const onAuthenticated = (status) => {
    setIsAuthenticated(status);
  };
  useEffect(() => {

    onAuthenticated();
  }, []);

  // Function to check if a movie is added to the list
  const isMovieAdded = (movieId) => {
    return myMovieList.some((id) => id === movieId);
  };

  // Add a movie to the list
  const onAddMovieToList = (movieId) => {
    const isAdded = isMovieAdded(movieId);
    if (!isAdded) {
      setMyMovieList([...myMovieList, movieId]);
    }
  };

  const onRemoveMovieFromList = (movieId) => {
    const isAdded = isMovieAdded(movieId);
    if (isAdded) {
      const updatedList = myMovieList.filter((id) => id !== movieId);
      setMyMovieList(updatedList);
    }
  };

  const isTVAdded = (tvId) => {
    return myTVList.some((id) => id === tvId);
  };
  const onAddTVToList = (tvId) => {
    const isAdded = isTVAdded(tvId);
    if (!isAdded) {
      setMyTVList([...myTVList, tvId]);
    }
  };
  const onRemoveTVFromList = (tvId) => {
    const isAdded = isTVAdded(tvId);
    if (isAdded) {
      const updatedList = myTVList.filter((id) => id !== tvId);
      setMyTVList(updatedList);
    }
  };


  return (
    <AppContext.Provider
      value={{
        onAuthenticated: onAuthenticated,
        isAuthenticated,
        myMovieList,
        onRemoveMovieFromList: onRemoveMovieFromList,
        onAddMovieToList: onAddMovieToList,
        myTVList,
        onAddTVToList: onAddTVToList,
        onRemoveTVFromList: onRemoveTVFromList,

      }}
    >
      < div className="App container">
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Login />}
          />
          <Route path="/Mylist" element={<MyList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Movies" element={<Movies />} />
          <Route path="/TVSeries" element={<TVSeries />} />
          <Route path="/movie/:movieId" element={<MovieDetail />} />
          <Route path="/tv/:tvId" element={<TVDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </div>
    </AppContext.Provider >
  );
}

export default App;
