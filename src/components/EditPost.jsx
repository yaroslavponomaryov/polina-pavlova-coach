import { useEffect, useState } from "react"
import { getArticleCoverUrl, removeArticleCover, updateArticle, uploadArticleCover } from "../db/queries"
import {articleValuesChanged, checkBodyLenght, checkTitleLenght, formatDate, geneateArticleCoverName } from "../utils";
import { Spinner } from "react-bootstrap";

const EditPost = ({active, setActive, id, article}) => {
    const defautTitle = article.title;
    const author = localStorage.loggedAs;
    
    const [title, setTitle] = useState(article.title)
    const [imageFile, setImageFile] = useState(null)
    const [imageUrl, setImageUrl] = useState(article.img_url)
    const [body, setBody] = useState(article.body)
    const [textIsUpdated, setTextIsUpdated] = useState(null);
    const fileExtentionWhiteList = /^.*\.(jpg|JPG|jpeg|JPEG|png|PNG|)$/
    const extractFileNameFromUrl = /([^/]+$)/

    useEffect(()=>{
        if (!checkTitleLenght(title) && checkBodyLenght(body)) {
            document.getElementById("post-submit-btn").disabled = false;
        } else {
            document.getElementById("post-submit-btn").disabled = true;
        }

    },[title, body])

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedData  = articleValuesChanged(title, body, article.title, article.body)
        if (Object.entries(updatedData).length) {
            updateArticle(article._id, updatedData)
            .then(()=>{
                setTextIsUpdated(true)
            })
            .then(()=>{
                location.reload()
            })
        }

    }

    return (
        <main className={active ? "add-post-modal active" : "add-post-modal"} onClick={()=>{setActive(false)}}>
            <form className={active ? "add-post-content active" : "add-post-content"} onClick={e => e.stopPropagation()} onSubmit={(e)=> {
                setTextIsUpdated(false)
                handleSubmit(e)
            }}>
                {textIsUpdated===null?(
                <>
                    <section className="input-section">
                        <label htmlFor="post-title">Title (55 Char)</label>
                        <input className="input-box grey-bg" type="text" id="post-title" defaultValue={article.title} onChange={(e)=>{
                            setTitle(e.target.value)
                            if (!checkTitleLenght(title) && checkBodyLenght(body)) {
                                document.getElementById("post-submit-btn").disabled = false;
                            } else {
                                document.getElementById("post-submit-btn").disabled = true;
                            }
                        }} />
                    </section>
    
                    <section className="input-section">
                        <label htmlFor="post-body">Main Text</label>
                        <textarea className="input-box post-body grey-bg" id="post-body"defaultValue={article.body} onChange={(e)=>{
                            setBody(e.target.value)
                            if (!checkTitleLenght(title) && checkBodyLenght(body)) {
                                document.getElementById("post-submit-btn").disabled = false;
                            } else {
                                document.getElementById("post-submit-btn").disabled = true;
                            }
                        }}/>    
                    </section>
    
                    <section className="input-section submit-section">
                        <input id="post-submit-btn" className="post-submit" type="submit" value='SAVE' disabled={true}/>
                    </section>
                </>):(textIsUpdated===false?(
                            <section className='spinner-container-modal'>
                                <Spinner animation="border" />
                            </section>
                ):(
                        <h1>Success!</h1>
                
                ))}

            </form>
        </main>
    )
}


export default EditPost