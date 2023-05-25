import {Form, Button, Card } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";


const Login = () => {
  return (
    <>
    <div className='w-full flex justify-center'>
        <div className='py-10 w-1/3'>

            <Card>
                <Card.Body>
                    <h2>Sign Up</h2>
                    <Form>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='password' required />
                        </Form.Group>
                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='email' required />
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        
            
        </div>
    </div>
    
        
    </>
  )
}

export default Login