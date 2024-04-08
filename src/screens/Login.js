import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Card, FormLabel, FormControl, Container, Alert } from 'react-bootstrap';
import axios from 'axios'
// import "../css/Login.css"

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  let navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/Login', formData);
      console.log(response.data); // handle successful response
      localStorage.setItem('authToken', response.data.token);
      console.log(localStorage.getItem("authToken"));
      localStorage.setItem('Useremail', response.data.email);
      // Optionally, you can also store user data in localStorage
      // localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/');

    } catch (error) {
      console.error('Error:', error.message); // handle error
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        alert(errorMessage); // Show the error message in an alert
      } else {
        alert('server canot validate the credentials'); // Show a generic error message
      }
    }
  };
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
    <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FormLabel>Email address</FormLabel>
              <FormControl type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
  
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <FormLabel>Password</FormLabel>
              <FormControl type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
            </Form.Group>
  
            <Button type="submit" className="w-100 mt-3">Login</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        New User? <Link to="/Signup">Sign Up</Link>
      </div>
    </div>
  </Container>
  )
}








