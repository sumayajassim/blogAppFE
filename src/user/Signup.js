import React, {useState} from 'react'
import { Container, Form, Button} from "react-bootstrap";

export default function Signup(props) {

    const [newUser, setNewUser] = useState({});

    const changeHandler = (e) => {
        const user = {...newUser};
        user[e.target.name] = e.target.value;
        console.log(user);
        setNewUser(user);
    }

    const registerHandler = () => {
        props.register(newUser)
    }

  return (
    <div>
        <h1>Sign Up</h1>

        <Container>
            <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control name="firstName" onChange={changeHandler}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control name="lastName" onChange={changeHandler} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control name="emailAddress" type="email" onChange={changeHandler} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" onChange={changeHandler} />
            </Form.Group>

            <Button varient = "primary" onClick={registerHandler}>Register</Button>

        </Container>
        
        </div>
  )
}
