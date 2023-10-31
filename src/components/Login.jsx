import { useContext, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { accessCheck } from "../db/utils"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { redirect } from "react-router-dom";

const Login = () => {


    
    const {setUser} = useContext(UserContext)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit=(e)=>{
        e.preventDefault()
        accessCheck(username, password)
        .then((data)=>{
            if (data) {
                alert('Successfully logged in!')
                setUser(data)
                localStorage.setItem('loggedAs', data.username)
                localStorage.setItem('rights', data.permissions)
                document.location.href="/"
            } else {
                alert('Wrong username or password')
            }
        }
        )
    }

    return (
        
        // <main>
        //     <form action=""onSubmit={(e)=>{
        //         handleSubmit(e)
        //     }}>
        //         <section>
        //             <label htmlFor="username">Username</label>
        //             <input type="text" id='username' value={username} onChange={(e)=>{
        //                 setUsername(e.target.value)
        //             }}/>
        //         </section>
        //         <section>
        //             <label htmlFor="password">Password</label>
        //             <input type="password" id='password' value={password} onChange={(e)=>{
        //                 setPassword(e.target.value)}}/>
        //         </section>
        //         <section>
        //             <button type='submit'>Submit</button>
        //         </section>

        //         {/* {user? <p>USER</p>: null} */}
        //     </form>
        // </main>
        
        <Container className="login-component">
            <Row></Row>
            <Row className="hundredvh align-items-center">
                <Form className="login-form" onSubmit={(e)=>{
                    handleSubmit(e)}}>
                    <Form.Group className="mb-3" controlId="formBasicSignIn">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Enter username" value={username} onChange={(e)=>{
                                setUsername(e.target.value)
                            }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>{
                                setPassword(e.target.value)}}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Row>
            <Row></Row>
        </Container>
    )
}

export default Login