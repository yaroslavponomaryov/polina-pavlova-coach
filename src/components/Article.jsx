import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getArticleCoverUrl, removeArticleCover, updateArticle, uploadArticleCover } from "../db/queries";
import ArticleCard from "./ArticleCard";
import ArticleList from "./ArticleList";
import ArticleRecList from "./ArticleRecList";
import EditPost from "./EditPost";
import { geneateArticleCoverName } from "../utils";
import { Spinner } from "react-bootstrap";

const Article = () => {
    const {article_id} = useParams();
    const [article, setArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(undefined)
    const [modalActive, setModalActive] = useState(false)
    const [imageIsLoading, setImageIsLoading] = useState(false)

    useEffect(()=>{
        getArticleById(article_id)
        .then ((blogArticle)=>{
            setArticle(blogArticle[0])
        })
        .then(()=>{
            setIsLoading(false)
        })
        .catch((err)=>{
            setIsError(err)
        })
    }, [])
    
    
    const handleImageReplacing = (e) => {
        setImageIsLoading(true)
        removeArticleCover(article.img_url.match(/[^/]*$/)[0])
        .then(()=>{
            uploadArticleCover(e.target.files[0], geneateArticleCoverName())
            .then((data)=>{
                getArticleCoverUrl(data.path)
                .then((data)=>{
                    updateArticle(article_id, {img_url: `${data.publicUrl}`})
                    .then(()=>{
                        setImageIsLoading(false)
                        location.reload()
                    })
                })
            })
        })
    }



    return isLoading || !article? null : (
        <>
        <input type="file" id="myFileInput" accept=".jpg, .jpeg" onChange={(e)=>{
            handleImageReplacing(e)
        }}/>
        <main className="article-layout">
            <div className="blog-post">
            <article className="article" >
                <section className="post-cover-container">
                    {!imageIsLoading?(
                    <div className="img-btn-overlay">
                        <img className="post-cover-img" src={article.img_url} alt='Blog article cover' />
                        <input type="button" className="img-replacing-btn" onClick={
                            ()=>{
                                document.getElementById('myFileInput').click()
                            }
                            
                            
                            } value="Replace the Image" />
                    </div>
                    ):(
                        <section className='spinner-img-container'>
                            <p>Don't reload the page untill uploading is completed!</p>
                        <Spinner animation="border" />
                    </section>
                    )}
                </section>
                {localStorage.rights==="ADMIN"?(
                    <section className="edit-btn-section">
                        <button className="edit-btn" onClick={()=>{setModalActive(true)}}>Edit</button>
                    </section>
                ):(null)}
                <section className="post-title-container">
                    <h1 className="post-title">{article.title}</h1>
                </section>
                <section className="post-body-container">
                    {
                        article.body.split(/\n/).map((paragraph, iter) => {
                            return <p key={iter}>{paragraph}</p>
                        })
                    }


                </section>
            </article>
            <ul className="article-rec-list reset-list-style">
                <ArticleRecList ></ArticleRecList>
            </ul>
            </div>
        </main>
        {
            localStorage.rights==="ADMIN"?(<EditPost active={modalActive} setActive={setModalActive} id={article_id} article={article}></EditPost>):(null)
        }
        </>
    )

}


export default Article