import React, {useState} from 'react'
import { app, db } from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import Appbar from '../components/Navbar';
import { v4 as uuid } from "uuid";


const CreateWishList = () => {

    const [title, setTitle] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title) {
          setError("Title is required");
          return;
        }
        setLoading(true);
        try {
            await db.collection("users").doc(user.uid).collection("lists").add({
                id: uuid(),  
                title,
                isPrivate,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            setTitle("");
            setIsPrivate(false);
            setSuccess("Wishlist created successfully");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

  return (
    <>
      <Appbar />
      <Container className="my-5">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title of your wishlist</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Private List"
              checked={isPrivate}
              onChange={() => setIsPrivate(!isPrivate)}
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={(e) => {
              handleSubmit(e);
            }}>
            {loading ? (
              <Spinner as="span" animation="border" size="sm" variant="light" />
            ) : (
              "Create Wishlist"
            )}
          </Button>
          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}
        </Form>
      </Container>
    </>
  );
}

export default CreateWishList