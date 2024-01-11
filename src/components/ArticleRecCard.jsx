import { useEffect, useState } from "react";

const ArticleRecCard = ({title, img_url, id}) => {
    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    const [isMobile, setIsMobile] = useState(width<700)
    addEventListener("resize", (event) => {
        width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    });
    useEffect(()=>{setIsMobile(width<700)}, [])
    return (
        <>
            <a href={`/blog/${id}`} id="article-rec-card" className="col-card">
                <div className="rec-img-container row-card">
                    <img className='rec-img' src={img_url} alt="" />
                </div>
                <div className="row-card">
                    <h2>{title}</h2>
                </div>
            </a>
        </>
    )
}

export default ArticleRecCard