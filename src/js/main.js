//main js file
//if not sure where to put something place it here
//after creating a new js file import it from the utils.js file

//CODE HERE
import { blogHelper, newsletterHelper, loginHelper } from "./utils.js"

const navbarLinks = document.querySelectorAll(".route")

const activePage = window.location.href
// console.log(activePage)

const routingHelper = () => {
  navbarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      addActiveLink(e.target)
      console.log(e.target.href)

    })
  })
}

const addActiveLink = (link) => {
  navbarLinks.forEach(link => {
    link.classList.remove("active-link")
  })
  link.classList.add("active-link");

  if(link.href.includes("home")){
    hidePages(document.querySelector('#blog-section'))
  }
  else if (link.href.includes("newsletter")) {
    hidePages(document.querySelector('#newsletter-section'))
  }
  else if (link.href.includes("about")) {
    hidePages(document.querySelector('#about-section'))
  }
  else if (link.href.includes("login")) {
    hidePages(document.querySelector('#login-section'))
  }
}

const hidePages = (page) => {
  document.querySelectorAll(".pages").forEach(page => {
    page.style.display = "none"; 
  })

  page.style.display = "block";
}


routingHelper()