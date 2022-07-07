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

const stars = document.querySelectorAll(".stars-span");
const fillStars = (value) => {
    stars.forEach (star => {
      if ($(star).attr("id") <= value) {
        $(star).addClass("stars-span-full");
      };
    })
}

const carouselSection = () => {
    for (let star of stars) {
      star.addEventListener("click", (e) => {
        fillStars(e.target.id);
      } )
    }
    
}
carouselSection()

    const fetchData = async () => {
      try {
        const data = await fetch("http://localhost:3000/posts/");
        const post = await data.json();
        return post;
      } catch (error) {
        console.log(error);
      }
    };
  
    // console.log(await fetchData());
    fetchData();
  
    const carouselContainer = document.querySelector(".swiper-wrapper");
  
  };