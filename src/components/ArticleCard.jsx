import { useEffect, useState } from "react";

const ArticleCard = ({title, img_url, id}) => {
    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    const [isMobile, setIsMobile] = useState(width<700)
    addEventListener("resize", (event) => {
        width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    });
    useEffect(()=>{setIsMobile(width<700)}, [])
    return (
        <>
            <a href={`/blog/${id}`} id="article-card" className="rw">
                <div className="article-card-img-container cl">
                    <img className='article-img' src={img_url} alt="" />
                </div>
                <div className="art-crd-text cl">
                    <h2>{title}</h2>
                    <p className="read-more-link">Read more...</p>
                </div>
            </a>
            {isMobile? (<hr></hr>):(null)}
        </>
    )
}

export default ArticleCard