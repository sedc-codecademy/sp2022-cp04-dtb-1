//main js file
//if not sure where to put something place it here
//after creating a new js file import it from the utils.js file

//CODE HERE
import { blogHelper, newsletterHelper, loginHelper, getLoggedHelper, adminTabHelper } from "./utils.js"

$( document).ready(function() {
  
  const navbarLinks = document.querySelectorAll(".route")
  const user = getLoggedHelper();
  
  $('#li-login').hide()
  $('#li-user').hide()

  if(!user) {
    $('#li-login').show()
  }
  else {
    $('#li-user').show()
    $('#user-link').append(user.username)
  }
  


  window.addEventListener('popstate', function() { 
    console.log(window.location.href)
    addActiveLink(window.location.href)
  });

  const routingHelper = () => {
    navbarLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        addActiveLink(e.target.href)
        console.log(e.target.href)
      })
    })
  }

  const hidePages = (page) => {
    document.querySelectorAll(".pages").forEach(page => {
      page.style.display = "none"; 
    })
  
    page.style.display = "block";
  }
  
  const addActiveLink = (link) => {

    navbarLinks.forEach(link => {
      link.classList.remove("active-link")
    })
    
    if(link.includes("home")){
      hidePages(document.querySelector('#blog-section'))
      $('#home-link').addClass("active-link")
    }
    else if (link.includes("newsletter")) {
      hidePages(document.querySelector('#newsletter-section'))
      $('#newsletter-link').addClass("active-link")
    }
    else if (link.includes("about")) {
      hidePages(document.querySelector('#about-section'))
      $('#about-link').addClass("active-link")
    }
    else if (link.includes("login")) {
      hidePages(document.querySelector('#login-section'))
      $('#login-link').addClass("active-link")
    }
    else if (link.includes("user")) {
      hidePages(document.querySelector('#user-section'))
      $('#user-link').addClass("active-link")
      adminTabHelper(user)
    }
  }
  
  routingHelper()
});
