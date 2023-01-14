import React from 'react'
import {SiTwitter, SiInstagram, SiFacebook, SiLinkedin} from 'react-icons/si'

const Footer = () => {
  return (
    <div className='w-full h-72 bg-gray-900 text-white space-y-6 flex flex-col justify-center items-center'>

         <div className='font-bold flex space-x-2 justify-center cursor-pointer' >
            <p className=' text-violet-500'>DevBlog</p>
             <p>Top Stories</p>
            <p>Tech Topics</p>
             <p>All Posts</p>
         </div>
        <div className='w-full flex justify-center space-x-4 p-2 cursor-pointer'>
            <a href={"https://www.twitter.com"} target="_blank">
                <SiTwitter size={30}/>
            </a>
            <a href={"https://www.facebook.com"} target="_blank">
                <SiFacebook size={30}/>
            </a>
            <a href={"https://www.instagram.com/"} target="_blank">
                <SiInstagram size={30} />
            </a>
            <a href={"https://www.linkedin.com/"} target="_blank">
                <SiLinkedin size={30}/>
            </a>
                              
        </div>
        <p className="copyright">
             copyright &copy; TBD 2022 <span id="date"></span>. all rights reserved
        </p>

    </div>

  )
}

export default Footer

//     <section id="footer-section">
//     <footer class="footer">
//         <!-- footer links asdasdsad -->
//         <div class="footer-links">
//             <a href="#backToTop" class="footer-link scroll-link">BackToTop</a>
//             <a href="#topStories" class="footer-link scroll-link">Top Stories</a>
//             <a href="#techTopics" class="footer-link scroll-link">Tech Topics</a>
//             <a href="#allPosts" class="footer-link scroll-link">All Posts</a>
//         </div>
//         <!-- footer icons -->
//         <div class="footer-icons">
//             <a href="https://www.facebook.com" target="_blank" class="footer-icon"><i class="fab fa-facebook"></i></a>
//             <a href="https://www.twitter.com" target="_blank" class="footer-icon"><i class="fab fa-twitter"></i></a>
//             <a href="https://www.instagram.com/" target="_blank" class="footer-icon"><i class="fab fa-instagram"></i></a>
//         </div>
//         <!-- copyright -->
//         <p class="copyright">
//             copyright &copy; TBD 2022 <span id="date"></span>. all rights reserved
//         </p>
//     </footer>
// </section>