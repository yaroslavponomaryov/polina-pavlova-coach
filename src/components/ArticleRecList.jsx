import { useEffect, useState } from "react"
import { fetchAllArticles } from "../db/queries"
import ArticleRecCard from "./ArticleRecCard"

const ArticleRecList = () => {

    const [articles, setArticles] = useState([])

    useEffect(()=>{
        fetchAllArticles()
        .then((articles)=>{
            setArticles(articles)
        })
    }, [])


    return (
        <>
            {
                articles.map((article, idx) => {
                    if (articles.indexOf(article)<8) {
                        return <ArticleRecCard key={idx} title={article.title} img_url={article.img_url} id={article._id}></ArticleRecCard>
                    }
                })
            }
        </>
)
}


export default ArticleRecList