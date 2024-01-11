import { useEffect, useState } from "react"
import { getArticleCoverUrl, insertArticle, uploadArticleCover } from "../db/queries"
import {checkBodyLenght, checkTitleLenght, formatDate, geneateArticleCoverName } from "../utils";

const AddPost = ({active, setActive}) => {
    const author = localStorage.loggedAs;
    const [title, setTitle] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [fileIsSelected, setFileIsSelected] = useState(false)
    const [body, setBody] = useState('')
    const fileExtentionWhiteList = /^.*\.(jpg|JPG|jpeg|JPEG|png|PNG|)$/

    useEffect(()=>{
        if (!checkTitleLenght(title) && checkBodyLenght(body) && fileIsSelected) {
            document.getElementById("post-submit-btn").disabled = false;
        } else {
            document.getElementById("post-submit-btn").disabled = true;
        }

    },[fileIsSelected])

    const handleSubmit = (e) => {
        e.preventDefault()

        const article = { author: author, title: title, img_url: imageUrl, body: body}
        insertArticle(article)
        .then(()=>{
            location.reload()
        })
    }

    return (
        <main className={active ? "add-post-modal active" : "add-post-modal"} onClick={()=>{setActive(false)}}>
            <form className={active ? "add-post-content active" : "add-post-content"} onClick={e => e.stopPropagation()} onSubmit={(e)=> {
                handleSubmit(e)
            }}>

                <section className="input-section">
                    <label htmlFor="post-img-upload" >Image</label>
                    <input className="input-box grey-bg" type="file" accept=".jpg, .jpeg" id="post-img-upload" onChange={(e)=> {

                        const file = e.target.files[0]
                            const fileName = geneateArticleCoverName()
                            uploadArticleCover(file, fileName)
                            .then ((data)=>{
                                getArticleCoverUrl(data.path)
                                .then((data)=>{
                                    setImageUrl(data.publicUrl)
                                })
                            })
                            .then(()=>{
                                setFileIsSelected(true)
                            })
                    }}/>
                </section>

                <section className="input-section">
                    <label htmlFor="post-title">Title (55 Char)</label>
                    <input className="input-box grey-bg" type="text" id="post-title" onChange={(e)=>{
                        setTitle(e.target.value)
                        if (!checkTitleLenght(title) && checkBodyLenght(body) && fileIsSelected) {
                            document.getElementById("post-submit-btn").disabled = false;
                        } else {
                            document.getElementById("post-submit-btn").disabled = true;
                        }
                    }} />
                </section>

                <section className="input-section">
                    <label htmlFor="post-body">Main Text</label>
                    <textarea className="input-box post-body grey-bg" id="post-body" onChange={(e)=>{
                        setBody(e.target.value)
                        if (!checkTitleLenght(title) && checkBodyLenght(body) && fileIsSelected) {
                            document.getElementById("post-submit-btn").disabled = false;
                        } else {
                            document.getElementById("post-submit-btn").disabled = true;
                        }
                    }}/>    
                </section>

                <section className="input-section submit-section">
                    <input id="post-submit-btn" className="post-submit" type="submit" value='SAVE' disabled={true}/>
                </section>

            </form>
        </main>
    )
}


export default AddPost