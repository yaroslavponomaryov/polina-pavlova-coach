import { useEffect, useState } from "react"
// import { Link } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Navigation = () => {
    const {user, setUser} = useContext(UserContext)

    const [isMobile, setIsMobile] = useState(window.innerWidth<=768)
    const [navIsHidden, setNavIsHidden] = useState(isMobile ? true : false);

    const screenChanger = () => {
        if(window.innerWidth<=768) {
            setIsMobile(true)
            setNavIsHidden(true)
        } else {
            setIsMobile(false)
            setNavIsHidden(false)
        }
    }
    window.addEventListener('resize', screenChanger)

    const handleClick = (event) => {
        event.preventDefault()
        if (navIsHidden) {
            setNavIsHidden(false)
        } else {
            setNavIsHidden(true)
        }
    }


    const handleLogout=(e)=>{
        // e.preventDefault()
            setUser(null)
            localStorage.setItem('loggedAs', 'Anonymous')
            localStorage.setItem('rights', 'USER')
            window.location.reload(false);
            // localStorage.removeItem('user')
    }

    return (
        // <section id='navbar' className="flex-row center">
        //         {isMobile? <button className="show-hide-btn" onClick={(event)=>{handleClick(event)}}>☰</button>  : null}
        //     <ul>
        //         {navIsHidden ? null : (
        //             <>
        //             <li><Link to={'/blog'} className="navlink">Blog</Link></li>
        //             <li><Link to={'/#about'} className="navlink">About</Link></li>
        //             <li><Link to={'/#emotional-awareness'} className="navlink">Emotional Management</Link></li>
        //             <li><Link to={'/#consulting'} className="navlink">Consulting</Link></li>
        //             <li><Link className="navlink" to={"/#contact"}>Contact</Link></li>
        //             {localStorage.loggedAs!=='Anonymous'? <p>{localStorage.loggedAs}</p>: null}
        //             </>
        //         )}
        //     </ul>
        // </section>
<Navbar sticky="top" expand="lg" className="bg-body-tertiary">
      <Container>
        {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="justify-content-center"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-center">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/blog" disabled>Blog</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
        {localStorage.loggedAs!=='Anonymous'? (
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {/* Signed in as: */}
            <NavDropdown title={localStorage.loggedAs} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" disabled>
                Profile
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Text>
        </Navbar.Collapse>
        ) : null}
      </Container>
    </Navbar>
    )

}
{/* <a><b>{localStorage.loggedAs}</b> */}
export default Navigation