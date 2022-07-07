import { mainBlogSectionComponent } from './components/mainBlogSectionComponent.js'
import {carouselSectionComponent} from "./components/carouselSectionComponents.js"
import {heroSectionComponent} from "./components/heroSectionComponent.js"

export const blogPage = () =>{



//display spinner
$('#blog-section').hide()
$('.spinner').show()
// call all fetch and build functions
heroSectionComponent();
carouselSectionComponent();
mainBlogSectionComponent();

//hide spinner
setTimeout(()=> {
  $('.spinner').hide()
  $('#blog-section').show()
},1200)


 
}