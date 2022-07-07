import { buildSinglePost } from './singlePostComponent.js'

export const carouselSectionComponent = async () => {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    slidesPerGroup: 1,
      loop: true,
      loopFillGroupWithBlank: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        // when window width is >= 600px
        600: {
          slidesPerView: 2,
          spaceBetween: 20,
          slidesPerGroup: 2,
        },
        // when window width is >= 860px
        860: {
          slidesPerView: 3,
          spaceBetween: 20,
          slidesPerGroup: 3,
        },
        // when window width is >= 1200px
        1200: {
          slidesPerView: 4,
          spaceBetween: 20,
          slidesPerGroup: 4,
        }
      }
  });
     
  const fetchData = async () => {
    try {
      const data = await fetch("http://localhost:3000/posts?_sort=createdAt&_order=desc&_page=1&_limit=12");
      const posts = await data.json();
      console.log(posts);
      return posts;
    } catch (error) {
      console.log(error);
    }
  };

  const carouselContainer = document.querySelector(".swiper-wrapper");
  carouselContainer.innerHTML = "";

  fetchData().then(posts => {
    posts.forEach(post => {
      let tagString = "";
      post.tags.forEach(tag => {
        tagString += `<span class=${tag}-tag>${tag.replace('-', ' & ')}</span>`
      })

      let mainContainer = document.createElement('div');
      mainContainer.classList.add('swiper-slide');
      mainContainer.classList.add('blog-post-card');
      mainContainer.style.backgroundImage = `url(${post.image})`
      mainContainer.innerHTML += `<div class="blog-post-body">
      <h3 class="blog-post-title">${post.title}</h2>
      <div class="rating-container">
          <span>Rating: ${post.rating}</span>
          <span class="stars-span-full "></span>
      </div>
      <div class="blog-post-tags">
          ${tagString}
      </div>
  </div>`

    mainContainer.addEventListener('click', () => {
      buildSinglePost(post)
    })

      carouselContainer.appendChild(mainContainer);
    });
  })
  .catch(error => {
    carouselContainer.innerHTML += `<h1>An error has occurred!</h1>`;
  })
};


  
