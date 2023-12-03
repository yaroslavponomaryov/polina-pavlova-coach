import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../db/queries";

const Article = () => {
    const {article_id} = useParams();
    const [article, setArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(undefined)

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

    return isLoading || !article? null : (
        <main>
            <section>
                <h1>{article.title}</h1>
            </section>
            <section>
                <img src={article.img_url} alt='Blog article cover' />
            </section>
            <section>
                {article.body}
            </section>
        </main>
    )

}


export default Article