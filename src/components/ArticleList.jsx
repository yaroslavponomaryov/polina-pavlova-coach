import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { fetchAllArticles } from '../db/queries';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";



const ArticleList = () => {
    const [articles, setArticles] = useState([])

    useEffect(()=>{
        fetchAllArticles()
        .then((articles)=>{
            setArticles(articles)
        })
    }, [])



    return articles.length ? (
        <CardGroup>
            {articles.map((article, idx) => (
                          <Card key={idx} >
                          <Card.Img className='article-card-img' variant="top" src={article.img_url} />
                          <Card.Body>
                            <Card.Title>{article.title}</Card.Title>
                            <Card.Text>
                                {article.body.substring(0,150) + '...'}
                            </Card.Text>
                            <Link to={`/blog/${article._id}`} className="btn btn-primary">Read more...</Link>
                          </Card.Body>
                          <Card.Footer>
                            <small className="text-muted">{article.date}</small>
                          </Card.Footer>
                        </Card>
                )
            )}
        </CardGroup>


    // <CardGroup>
    //   {articles.map((article) => (
    //     <Col key={article._id} >
    //         <Card className="bg-dark text-white min-height no-border article-card">
    //         <Card.Img src={article.img_url} alt="Card image" className='darken-img min-height' />
    //         <Card.ImgOverlay className='auto-margin'>
    //             <a href='#'>
    //             <Card.Title>{article.title}</Card.Title>
    //             <Card.Text>
    //             {
    //                 article.body.substring(0,150) + '...'
    //             }
    //             </Card.Text>
    //             <Card.Text>Last updated: {article.date}</Card.Text>


    //             </a>
    //         </Card.ImgOverlay>
    //         </Card>

    //     </Col>
    //   ))}
    // </CardGroup>  
    ) : null
}

export default ArticleList