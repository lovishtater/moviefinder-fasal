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
  const user = JSON.parse(localStorage.getItem("user"));
  const favorites = async () => {
    try {
    const response = await db.collection("users").doc(id).collection("favorites").get();
    setMovies(response.docs.map((doc) => doc.data()));
    } catch (error) {
      setError(error.message);
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
        <h1 className="text-center">Wish List</h1>
        <Row>
            {movies.map((movie) => {
              return (
                <Col xs={12} sm={6} md={4} lg={3}>
                  <MovieCard movie={movie} key={movie.imdbID} isFavorite={true} canEdit={canEdit} />
                </Col>
              )}
            )}
        </Row>
      </Container>
    </div>
  )
}

export default WishList