import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { app, db } from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";


const MovieCard = ({ movie, isFavorite, canEdit }) => {
  console.log(canEdit);
  const { Title, Poster, Year, imdbID } = movie;
  const user = JSON.parse(localStorage.getItem("user"));
  const [isFav, setIsFavorite] = useState(isFavorite);

  const handleFavorite = async () => {
    try {
      if (isFavorite) {
        setIsFavorite(false);
        await db.collection("users").doc(user.uid).collection("favorites").doc(imdbID).delete();
      } else {
        setIsFavorite(true);
        await db.collection("users").doc(user.uid).collection("favorites").doc(imdbID).set(movie);
      }
      const favorites = await db.collection("users").doc(user.uid).collection("favorites").get();
      localStorage.setItem("favorites", JSON.stringify(favorites.docs.map((doc) => doc.data())));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" style={{ maxHeight: "250px" }} src={Poster} />
      <Card.Body>
        <Card.Title>{Title}</Card.Title>
        <Card.Text>{Year}</Card.Text>
        {canEdit && (
          <Button
            variant={isFav ? "danger" : "primary"}
            onClick={() => {
              handleFavorite(imdbID);
            }}>
            {isFav ? "Remove from Watchlist" : "Add to Watchlist"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default MovieCard;