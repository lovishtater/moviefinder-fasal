import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Spinner } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { app } from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter all fields");
    }
    setLoading(true);
    await app.auth().signInWithEmailAndPassword(email, password).then((user) => {
      localStorage.setItem("user", JSON.stringify(user.user));
      navigate("/");
    }).catch((error) => {
      setError(error.message);
    }).finally(() => {
      setLoading(false);
    }
    );
  };


  return (
    <div className="auth">
      <div className="p-4 box">
        <h2 className="mb-3">Movie Mania</h2>
        {isError && <Alert variant="danger">{isError}</Alert>}
        <Form onSubmit={(e) => handleSubmit(e)}>
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
                "Login"
              )}
            </Button>
          </div>
        </Form>
        <hr />
        <div>
          Don't have an account? <Link to="/signup">Sign up</Link>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Login;
