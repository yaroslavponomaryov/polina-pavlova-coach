import { useEffect, useState } from 'react';
import { fetchAllArticles } from '../db/queries';
import ArticleCard from './ArticleCard';
import AddPost from './AddPost';
import { Spinner } from 'react-bootstrap';



const ArticleList = () => {
    const [articles, setArticles] = useState([])
    const [modalActive, setModalActive] = useState(false)
    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    useEffect(()=>{
        fetchAllArticles()
        .then((data)=>{
            if (data.length === 0) {
                setArticles(null)
            } else {
                setArticles(data.reverse())


            }
        })
    }, [])


    return (
        <>
        <main className='flex-col'>
            <section className='content'>
                <div className='blog-options'>
                    <a href='#' className='option-btn reset-lnk-style disabled-option'>Filter ▼</a>
                    {localStorage.rights==="ADMIN"?(<a href="#" className='option-btn reset-lnk-style' onClick={()=>{setModalActive(true)}}>Add Post</a>):null}
                </div>
        {articles !== null ? (articles.length? (<ul className='reset-list-style' id='article-list'>
            {
                articles.map((article, idx) => {
                    return <ArticleCard key={idx} title={article.title} img_url={article.img_url} id={article._id}></ArticleCard>
                })
            }
        </ul>) : (
            <section className='no-posts-warning'>
                <Spinner animation="border" />
            </section>
            )) : (
            <section className='no-posts-warning'>
                <h1>Posts are coming soon...</h1>
            </section>
        
        )}
            </section>
        </main>
        {
        localStorage.rights==="ADMIN"?(<AddPost active={modalActive} setActive={setModalActive}></AddPost>):(null)
        }
        </>
    )
}

export default ArticleList