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

const printName = () => {
    console.log("Blog")
}

const carouselSection = () => {
    console.log('carousel')
}


export const blogHelper = {
    printName,
}