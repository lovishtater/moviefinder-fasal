import React, { useEffect, useState } from "react";
import { Form, InputGroup, FormControl , Container, Row, Col } from "react-bootstrap";
import Navbar from '../components/Navbar'
import MovieCard from '../components/MovieCard'

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const user = JSON.parse(localStorage.getItem("user"));
  const url = new URL("https://www.omdbapi.com/?i=tt3896198&apikey=abf6a51e");
  const fetchMovies = async (query) => {
    if (query) {
      url.searchParams.set("s", query);
    }
    const response = await fetch(url).then((res) => res.json());
    setMovies(response.Search);
  };

  
  
    
  return (
    <div>
      <Navbar />
      <h1 className="text-center">Welcome to Movie Mania</h1>
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
          {query ? (
            <Row>
              {movies ? (
                movies.map((movie) => {
                  const isFavorite = favorites.find((fav) => fav.imdbID === movie.imdbID);
                  console.log(isFavorite);
                  return (
                    <Col xs={12} sm={6} md={4} lg={3} key={movie.imdbID} className="my-3">
                      <MovieCard movie={movie} isFavorite={isFavorite} canEdit={`${true}`} />
                    </Col>
                  );})
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
              <h1>Search for a movie</h1>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

export default Home