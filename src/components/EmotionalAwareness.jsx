const EmotionalAwareness = ({sectionTwo}) => {

    return (
        <section id='emotional-awareness' className="container none-display">
            <hr />
            <h1 className="text-center emotional-awareness-header">{sectionTwo.title}</h1>
            <hr />
            <article className="main-body-text">
                {sectionTwo.body}
            </article>
        </section>
    )
    

}

export default EmotionalAwareness