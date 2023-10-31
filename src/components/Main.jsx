import HeaderPic from "./HeaderPic"
import MainSection from "./MainSection"
import Consulting from "./Consulting"
import Contact from "./Contact"
import EmotionalAwareness from "./EmotionalAwareness"
import { fetchAllMainSections } from "../db/queries"
import { useEffect, useState } from "react"
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { filterContent } from "../db/utils"

const Main = ({content}) => {
    return (
        <>
            <Image id='header-pic' src="https://fwmcijjwwdarkuksjhmf.supabase.co/storage/v1/object/public/content/PilinaPavlova_photo_site.png" alt="Inspiring picture of Polina Pavlova in the woods" fluid/>
        {/* <HeaderPic /> */}
        {content.length ? 
        (
            <>
            {content.sort((a,b)=>{return a._id-b._id}).map((sectionContent)=>{
                return (
                    <Row key={sectionContent._id}>
                        <Col>
                            <MainSection sectionContent={sectionContent}/>
                        </Col>
                    </Row>
                )

            })}
     <Row>
                     <Col>
                         <Contact/>
                     </Col>
                 </Row>
            </>
        )


            // <Container fluid>
            //     <Row>
            //         <Col>
            //             <About sectionOne={filterContent(content, 1)}/>
            //         </Col>
            //     </Row>
            //     <Row>
            //         <Col>
            //             <EmotionalAwareness sectionTwo = {filterContent(content, 2)}/>
            //         </Col>
            //     </Row>
            //     <Row>
            //         <Col>
            //             <Consulting sectionThree = {filterContent(content, 3)}/>
            //         </Col>
            //     </Row>
            //     <Row>
            //         <Col>
            //             <Contact/>
            //         </Col>
            //     </Row>
            // </Container>
        : <Spinner animation="border" />}
        </>

    )

}

export default Main
