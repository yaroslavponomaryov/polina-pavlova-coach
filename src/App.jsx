import './App.css'
import Header from './components/Header'
import Navigation from './components/Nav'
import HeaderPic from './components/HeaderPic'
import isInViewport from './utils'
import Main from './components/Main'
import Blog from './components/Blog'
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Login from './components/Login'
import React, { useEffect, useState } from "react";
import { useContext } from 'react'
import { UserContext } from './contexts/UserContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchAllMainSections } from './db/queries'
import Article from './components/Article'

function App() {

  const [content, setContent] = useState([])

  useEffect(()=>{
      fetchAllMainSections()
      .then((data)=>{
          setContent(data)
      })
  }, [])

  const {user} = useContext(UserContext)


//   document.addEventListener("scroll", ()=>{
//     const about = document.querySelector('#about')
//     const aboutHeader = document.querySelector('#about-header')
//     const emotionalAwareness = document.querySelector('#emotional-awareness')
//     const emotionalAwarenessHeader = document.querySelector('#emotional-awareness-header')
//     const consulting = document.querySelector('#consulting')
//     const contact = document.querySelector('#contact')
//     if (isInViewport(aboutHeader)) {
//       about.classList.remove('none-display')
//       about.classList.add('fade-in')
//     }
//     if (isInViewport(emotionalAwareness)) {
//       emotionalAwareness.classList.remove('none-display')
//       emotionalAwareness.classList.add('fade-in')
//     }
//     if (isInViewport(consulting)) {
//       consulting.classList.remove('none-display')
//       consulting.classList.add('fade-in')
//     }
//     if (isInViewport(contact)) {
//         contact.classList.remove('none-display')
//         contact.classList.add('fade-in')
//     }
// })

  return (
    <BrowserRouter>
      {/* <Header /> */}

      <Navigation />
        <Routes>
          <Route exact path="/" element={<Main content={content}/>} />

          <Route path="/blog">
            <Route path='' element={<Blog />} />
            <Route path=':article_id' element={<Article />}/>
          </Route>

          <Route path="/signin" element={<Login />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
