import { useEffect, useState } from "react"

const Nav = () => {
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

    return (
        <section id='navbar' className="flex-row center">
                {isMobile? <button className="show-hide-btn" onClick={(event)=>{handleClick(event)}}>☰</button>  : null}
            <ul>
                {navIsHidden ? null : (
                    <>
                    <li><a className="navlink" href="#about">About</a></li>
                    <li><a className="navlink" href="#emotional-awareness">Emotional Management</a></li>
                    <li><a className="navlink" href="#consulting">Consulting</a></li>
                    <li><a className="navlink" href="#contact">Contact</a></li>
                    </>
                )}
            </ul>
        </section>
    )

}

export default Nav