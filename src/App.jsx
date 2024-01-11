import './App.css'
import Header from './components/Header'
import Navigation from './components/Nav'
import HeaderPic from './components/HeaderPic'
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
