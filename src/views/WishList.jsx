import React , { useEffect, useState} from 'react'
import Navbar from "../components/Navbar";
import { Form, InputGroup, FormControl, Container, Row, Col } from "react-bootstrap";
import MovieCard from "../components/MovieCard";
import { useParams } from 'react-router-dom';
import { app, db } from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";

const WishList = () => {
  const {id} = useParams();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const favorites = async () => {
    setLoading(true);
    try {
    const response = await db.collection("users").doc(id).collection("favorites").get();
    setMovies(response.docs.map((doc) => doc.data()));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    favorites();
  }, [])
  const canEdit = user && user.uid === id;
  return (
    <div>
      <Navbar />
      <Container className="my-5">
        <h1 className="text-center">Wish List of {user.providerData[0].displayName}</h1>
        {error && <p className="text-center text-danger">{error}</p>}
        {!loading ? (
          <Row>
            {movies.length > 0 ? movies.map((movie) => {
              return (
                <Col xs={12} sm={6} md={4} lg={3}>
                  <MovieCard movie={movie} key={movie.imdbID} isFavorite={true} canEdit={canEdit} />
                </Col>
              );
            }) : (
              <p className="text-center">No favorites yet</p>
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
  );
}

export default WishList