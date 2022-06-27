import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { app, db } from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/firestore";
import { Modal, Form, Spinner } from 'react-bootstrap';


const MovieCard = ({ movie, canEdit, wishList, path, handleDelete }) => {
  const [show, setShow] = useState(false);
  const { Title, Poster, Year, imdbID, id, wishListId } = movie;
  const [wLId, setWishListId] = useState(wishListId);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  // add movie in wishlist
  const handleFavorite = async () => {
    try {
      const wishListRef = wishList.find((item) => item.id === wLId);
      movie.id = wishListRef.id + "-" + imdbID;
      movie.wishListId = wLId;
      movie.isPrivate = wishListRef?.isPrivate;
      movie.wishListTitle = wishListRef.title;
      await db.collection("users").doc(user.uid).collection("favorites").doc(movie.id).set(movie);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setShow(false);
    }
  };


  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" style={{ maxHeight: "250px" }} src={Poster} />
      <Card.Body>
        <Card.Title>{Title}</Card.Title>
        <Card.Text>{Year}</Card.Text>
        {canEdit && (
          <>
            <Button
              variant={path == "home" ? "primary" : "danger"}
              onClick={() => (path == "home" ? setShow(true) : handleDelete(id, wLId))}>
              {path == "home" ? "Add to Wishlist" : "Delete"}
            </Button>

            <Modal show={show} onHide={() => setShow(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Add to Wishlist</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Please select a wishlist to add this movie to.</p>
                <Form.Select onChange={(e) => setWishListId(e.target.value)}>
                  {wishList?.map((wish, index) => (
                    <option key={index} value={wish.id}>
                      {wish?.title}
                    </option>
                  ))}
                </Form.Select>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    handleFavorite();
                  }}>
                  {loading ? <Spinner animation="border" variant="primary" /> : "Add"}
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default MovieCard;