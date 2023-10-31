import isInViewport from "../utils";
import { useContext, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { updateMainSection } from "../db/queries";
import Card from 'react-bootstrap/Card';


const About = ({sectionContent}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [newHeader, setNewHeader] = useState(sectionContent.title)
    const [newBody, setNewBody] = useState(sectionContent.body)
    const {user} = useContext(UserContext)

    const editModeOn = () =>{
        setIsEditing(true)
    }

    const handleSubmit = () => {
        updateMainSection(newHeader, newBody, sectionContent._id)
    }

    return (
            // <section id="about" className="container none-display">
            // </section>
            <>

                {isEditing? (
                    <Container>
                        <Card>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>

                                    <Form.Group className="mb-3" controlId="formBasicHeaderOne">
                                        <Form.Label>New Header</Form.Label>
                                        <Form.Control type="text" placeholder={"Your awesome header goes here"} value={newHeader} onChange={(e)=>{
                                            setNewHeader(e.target.value)
                                        }}/>
                                        <Form.Text id="headerHelpBlock" muted>
                                            Limit is 50 characters
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3 form-group" controlId="formBasicBodyOne">
                                        <Form.Label>New text</Form.Label>
                                        <textarea className="form-control" rows="10" type="text" placeholder={"Your text goes here"} value={newBody} onChange={(e)=>{
                                            setNewBody(e.target.value)
                                        }}/>
                                    </Form.Group>
                                            <Button variant="primary" type="submit">
                                                Save
                                            </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
                                ): 
                                (
                    <Container>
                        <Row>
                            <Container>
                                <hr/>
                                    <Row >
                                        <Col>
                                            {localStorage.rights==="ADMIN"? 
                                            (<Button onClick={()=>{
                                            editModeOn()
                                            }} className="no-marg-pad" variant="outline-danger" >Edit</Button>)
                                            :null}
                                        </Col>
    
                                        <Col xs={6} className="centered"><h1 id='about-header' className="text-center no-marg-pad">{sectionContent.title}</h1>
                                        </Col>
    
                                        <Col className="justify-content-center">
                                        </Col>
                                    </Row>
                                <hr/>
                            </Container>
                        </Row>

                        <Row>
                            <article className="main-body-text">
                            {sectionContent.body}
                            </article>
                        </Row>

                    </Container>
                )}
            </>
        )
}

export default About