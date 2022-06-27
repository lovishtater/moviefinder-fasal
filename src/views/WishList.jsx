import React , { useEffect, useState} from 'react'
import Navbar from "../components/Navbar";
import {
  Container,
  Row,
  Col,
  ListGroup,
} from "react-bootstrap";
import MovieCard from "../components/MovieCard";
import { useParams } from 'react-router-dom';
import { app, db } from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";

const WishList = () => {
  const { id } = useParams();
  const [wishList, setWishList] = useState([]);
  const [allWishList, setAllWishList] = useState([]);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  const getWishList = async () => {
    setLoading(true);
    try {
      const res = await db.collection("users").doc(id).collection("lists").get();
      setWishList(res.docs.map((doc) => doc.data()));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getWishListData = async () => {
    setLoading(true);
    try {
      const res = await db.collection("users").doc(id).collection("favorites").get();
      setAllWishList(res.docs.map((doc) => doc.data()));
      return res.docs.map((doc) => doc.data());
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getMovies = async (id) => {
    setLoading(true);
    const movie = allWishList.filter((movie) => movie.wishListId == id);
    setMovies(movie);
    setLoading(false);
  };

  // remove
  const handleDelete = async (id, wLId) => {
    try {
      await db
        .collection("users")
        .doc(user.uid)
        .collection("favorites")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        });
        await getWishListData().then((allWishList) => {
          setMovies(allWishList.filter((movie) => movie.wishListId == wLId));
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWishList();
    getWishListData();
  }, []);
  const canEdit = user != null && user?.uid === id;
  return (
    <div>
      <Navbar />
      <Container className="my-5">
        <Row>{error && <p>{error}</p>}</Row>
        <Row>
          <Col md={12} lg={3}>
            <h1>Wishlist</h1>
            <ListGroup as="ol" numbered>
               {wishList.map((wish, index) => (
                  canEdit ? (
                  <ListGroup.Item
                    className="d-flex justify-content-between align-items-start"
                    onClick={() => {
                      getMovies(wish.id);
                    }}>
                    <div className="ms-2 me-auto">{wish.title}</div>

                    {wish?.isPrivate && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-lock-fill" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                      </svg>
                    )}
                  </ListGroup.Item>
                ) : (
                  !wish?.isPrivate && (
                  <ListGroup.Item
                    className="d-flex justify-content-between align-items-start"
                    onClick={() => {
                      getMovies(wish.id);
                    }}>
                    <div className="ms-2 me-auto">{wish.title}</div>
                  </ListGroup.Item> 
                )
                )))}
            </ListGroup>
          </Col>
          <Col md={12} lg={9}>
            <h1 className="text-center my-2">Wish List</h1>
            {error && <p className="text-center text-danger">{error}</p>}
            {!loading ? (
              <Row>
                {movies.length > 0 ? (
                  movies.map((movie, index) => {
                    
                    return (
                      <Col key={index} xs={12} sm={6} md={4} lg={4} className="my-2 align-items-center d-flex justify-content-center">
                          <MovieCard
                            movie={movie}
                            isFavorite={true}
                            canEdit={canEdit}
                            path="wishList"
                            handleDelete={handleDelete}
                          />
                        
                      </Col>
                    );
                  })
                ) : (
                  <p className="text-center">No favorites yet, Please select different wishlist</p>
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
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default WishList