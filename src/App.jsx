import './App.css'
import Header from './components/Header'
import Nav from './components/Nav'
import About from './components/About'
import EmotionalAwareness from './components/EmotionalAwareness'
import Consulting from './components/Consulting'
import Contact from './components/Contact'
import HeaderPic from './components/HeaderPic'
import isInViewport from './utils'

function App() {

  onload = (event) => {
    // console.log('HEREEEEEE')
  };


  document.addEventListener("scroll", ()=>{
    const about = document.querySelector('#about')
    const aboutHeader = document.querySelector('#about-header')
    const emotionalAwareness = document.querySelector('#emotional-awareness')
    const emotionalAwarenessHeader = document.querySelector('#emotional-awareness-header')
    const consulting = document.querySelector('#consulting')
    const contact = document.querySelector('#contact')
    if (isInViewport(aboutHeader)) {
      about.classList.remove('none-display')
      about.classList.add('fade-in')
    }
    if (isInViewport(emotionalAwareness)) {
      emotionalAwareness.classList.remove('none-display')
      emotionalAwareness.classList.add('fade-in')
    }
    if (isInViewport(consulting)) {
      consulting.classList.remove('none-display')
      consulting.classList.add('fade-in')
    }
    if (isInViewport(contact)) {
        contact.classList.remove('none-display')
        contact.classList.add('fade-in')
    }
})

  return (
    <>
    <Header />
    <Nav />
    <HeaderPic />
    <main className='main-page-block'>
      <About />
      <EmotionalAwareness />
      <Consulting />
      <Contact />
    </main>
    </>
  )
}

export default App
