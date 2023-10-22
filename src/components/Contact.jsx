import { useState } from "react";
import isInViewport from "../utils";

const Contact = () => {

    return (
        <section id='contact' className="container none-display">
            <hr />
            <h1 className="text-center">Contact me</h1>
            <hr />
            <article className="main-body-text">
                <ul id='contact-list'>
                    <li><a href="mailto:108pavlova@gmail.com" target="_blank">108pavlova@gmail.com</a></li>
                    <li><a href="https://api.whatsapp.com/send?phone=447737401687" target="_blank"><img className='whatsapp' src="https://fwmcijjwwdarkuksjhmf.supabase.co/storage/v1/object/public/content/social-media-icons/i8mXXhUX.ico" alt="" /></a></li>
                    <li><a href="https://t.me/padmadd" target="_blank"><img className="telegram" src="https://telegram.org/favicon.ico" alt="" /></a></li>
                    <li><a href="tel:+447737401687" target="_blank">+447737401687</a></li>
                </ul>
            <hr />
            </article>
        </section>
    )
}

export default Contact