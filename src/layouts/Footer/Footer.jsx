import React from "react"
import "./Footer.css"
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs"




const Footer = () => {
    return (
        <>
            <footer>
                <div className='container'>
                    <div className='box'>
                        <ul className='flex'>
                            <li>Terms of Use</li>
                            <li>Privacy-Policy</li>
                            <li>Blog</li>
                            <li>FAQ</li>
                            <li>Watch List</li>
                        </ul>
                        <p>© 2022 STREAMIT. All Rights Reserved. All videos and shows on this platform are trademarks of, and all related images and content are the property of, Streamit Inc. Duplication and copy of this is strictly prohibited. All rights reserved.</p>
                    </div>
                    <div className='box'>
                        <h3>Follow Us</h3>
                        <span><BsFacebook /></span>
                        <span><BsTwitter /></span>
                        <span><BsGithub /></span>
                        <span><BsInstagram /></span>
                    </div>
                    <div className='box'>
                        <h3>Streamit App</h3>
                        <div className='img flexSB'>
                            <img src='https://img.icons8.com/color/48/000000/apple-app-store--v3.png' />
                            <span>App Store</span>
                            <br />
                            <img src='https://img.icons8.com/fluency/48/000000/google-play.png' />
                            <span>Google Play</span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
