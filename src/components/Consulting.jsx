import isInViewport from "../utils"

const Consulting = ({sectionThree}) => {

    return (
        <section id='consulting' className="container none-display">
            <hr />
            <h1 className="text-center">{sectionThree.title}</h1>
            <hr />
            <article className="main-body-text">
            {sectionThree.body}
            </article>
        </section>
    )

}

export default Consulting