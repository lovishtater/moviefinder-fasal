import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Spinner } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "../assets/css/auth.css";
import {app } from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const[name, setName] = useState("");
  const [isError, setError] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password || !name) {
      setError("Please enter all fields");
    }
    setLoading(true);
    await app.auth().createUserWithEmailAndPassword(email, password).then((user) => {
      user.user.updateProfile({
        displayName: name,
      });
      navigate("/login");
    }).catch((error) => {
      setError(error.message);
    }).finally(() => {
      setLoading(false);
    })
  };


  return (
    <div className="auth">
      <div className="p-4 box">
        <h2 className="mb-3">Movie Mania Signup</h2>
        {isError && <Alert variant="danger">{isError}</Alert>}
        <Form
          onSubmit={(e) => {
            handleSubmit(e);
          }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              {isLoading ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                "Signup"
              )}
            </Button>
          </div>
        </Form>
        <hr />
      <div>
        Already have an account? <Link to="/">Log In</Link>
          
      </div>
      </div>
    </div>
  );
};

export default Signup;
