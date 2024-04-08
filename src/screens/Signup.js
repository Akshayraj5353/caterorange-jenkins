import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Card, FormLabel, FormControl, Container, Alert } from 'react-bootstrap';
import axios from 'axios'
import "../css/Signup.css"

export default function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        PhoneNumber: '',
        companyName: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/Register', formData);
            console.log(response.data); // handle successful response
            // Redirect or show a success message to the user
        } catch (error) {
            console.error('Error:', error.message); // handle error
            if (error.response && error.response.data && error.response.data.error) {
                const errorMessage = error.response.data.error;
                alert(errorMessage); // Show the error message in an alert
            } else {
                alert('An error occurred. Please try again.'); // Show a generic error message
            }
        }
    };
    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign Up</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="name">
                                <FormLabel>UserName</FormLabel>
                                <FormControl type="text" name="name" value={formData.name} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group id="email">
                                <FormLabel>Email address</FormLabel>
                                <FormControl type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group id="password">
                                <FormLabel>Password</FormLabel>
                                <FormControl type="password" name="password" value={formData.password} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group id="PhoneNumber">
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl type="Number" name="PhoneNumber" value={formData.PhoneNumber} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group id="companyName">
                                <FormLabel>Company Name</FormLabel>
                                <FormControl type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />
                            </Form.Group>
                            <Button type="submit" className="w-100 mt-3">Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Already have an account? <Link to="/Login">Log In</Link>
                </div>
            </div>

        </Container>
    )
}
