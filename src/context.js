
import React, { Fragment, useContext, useEffect, useState } from "react";
const AppContext = React.createContext();

const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=1f00ab9f4b99e99563eba10b481e03a3&query=spiderman&include_adult=false&language=en-US&page=1`
//`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`; //`http://www.omdbapi.com/?i=tt3896198&apikey=5b34cfa0`;

const AppProvider = ({ children }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({ show: "false", msg: "" });
  const [query, setQuery] = useState("titanic")

  const getMovies = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data)

      if (data.Response === "True") {
        setIsLoading(false)
        setMovie(data.Search);
      }
      else {
        setIsError({
          show: "true",
          msg: data.error
        })
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
  let timerOut =   setTimeout(() => {
      getMovies(`${API_URL}&s=${query}`);
    }, 800)
    return () => clearTimeout(timerOut)
  }, [query])

  return <AppContext.Provider value={{ isLoading, isError, movie, query, setQuery }}>
    {children}
  </AppContext.Provider>
};

const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext };