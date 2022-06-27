import React, { useEffect, useState } from "react";
import { Form, InputGroup, FormControl , Container, Row, Col} from "react-bootstrap";
import Navbar from '../components/Navbar'
import MovieCard from '../components/MovieCard'
import { app, db } from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishList, setWishList] = useState([]);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const url = new URL("https://www.omdbapi.com/?i=tt3896198&apikey=abf6a51e");
  const fetchMovies = async (query) => {
    setLoading(true);
    if (query) {
      url.searchParams.set("s", query);
    }
    const response = await fetch(url).then((res) => res.json());
    setMovies(response.Search);
    setLoading(false);
  };

    const getWishList = async () => {
      setLoading(true);
      try {
        const res = await db.collection("users").doc(user.uid).collection("lists").get();
        setWishList(res.docs.map((doc) => doc.data()));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      getWishList();
    }, []);

    const debounce = (func, wait = 1000) => {
      let timeout;
      return (...value) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          func(value);
        }, wait);
      };
    };
  
  const handleSearch = debounce((value) => {
    fetchMovies(value);
  }, 1000);
    
  return (
    <div>
      <Navbar />
      <h1 className="text-center">Welcome to Movie Mania</h1>
      {error && <p className="text-center">{error}</p>}
      <Container className="my-5">
        <InputGroup>
          <FormControl
            id="inlineFormInputGroupUsername"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search for a movie"
          />
        </InputGroup>
      </Container>
      <div className="movies">
        <Container>
          {!loading ? (
            <Row>
              {movies ? (
                movies.map((movie, index) => {
                  return (
                    <Col xs={12} sm={6} md={4} lg={3} key={index} className="my-2 align-items-center d-flex justify-content-center">
                      <MovieCard
                        movie={movie}
                        wishList={wishList}
                        canEdit={`${true}`}
                        path="home"
                      />
                    </Col>
                  );
                })
              ) : (
                <h1>No movies found</h1>
              )}
            </Row>
          ) : (
            <div className="text-center">
              <img
                src={require("../assets/img/noresult.png")}
                alt="search"
                className="img-fluid"
                height="200"
                width="200"
              />
              <h1>Searching...</h1>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

export default Home