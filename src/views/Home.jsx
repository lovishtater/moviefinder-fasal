import React, { useEffect, useState } from "react";
import { Form, InputGroup, FormControl , Container, Row, Col, Modal} from "react-bootstrap";
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
  const [query, setQuery] = useState("");
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
        console.log(wishList, "wishList");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      getWishList();
    }, []);
  
  
    
  return (
    <div>
      <Navbar />
      <h1 className="text-center">Welcome to Movie Mania</h1>
      {error && <p className="text-center">{error}</p>}
      <Container className="my-5">
        <Form.Label htmlFor="inlineFormInputGroupUsername" visuallyHidden>
          Username
        </Form.Label>
        <InputGroup>
          <FormControl
            id="inlineFormInputGroupUsername"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            placeholder="Username"
          />
          <InputGroup.Text
            onClick={() => {
              fetchMovies(query);
            }}>
            Search
          </InputGroup.Text>
        </InputGroup>
      </Container>
      <div className="movies">
        <Container>
          {!loading ? (
            <Row>
              {movies ? (
                movies.map((movie, index) => {
                  return (
                    <Col xs={12} sm={6} md={4} lg={3} key={index} className="m-2">
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
                src="https://cdn0.iconfinder.com/data/icons/movie-and-video-2/512/search-video-files-movie-searching-512.png"
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