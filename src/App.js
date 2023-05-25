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


function App() {
  const [myList, setMyList] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const onAuthenticated = (status) => {
    setIsAuthenticated(status);
  };
  useEffect(() => {

    onAuthenticated();
  }, []);

  // Function to check if a movie is added to the list
  const isMovieAdded = (movieId) => {
    return myList.some((id) => id === movieId);
  };

  // Add a movie to the list
  const addMovieToList = (movieId) => {
    const isAdded = isMovieAdded(movieId);
    if (!isAdded) {
      setMyList([...myList, movieId]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        onAddToList: addMovieToList,
        onAuthenticated: onAuthenticated,
        isAuthenticated,
        myList,
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
