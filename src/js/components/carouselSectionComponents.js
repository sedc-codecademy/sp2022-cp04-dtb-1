export const carouselSectionComponent = async () => {
    const fetchData = async () => {
      try {
        const data = await fetch("http://localhost:3000/posts/");
        const post = await data.json();
        return post;
      } catch (error) {
        console.log(error);
      }
    };
  
    console.log(await fetchData());
    fetchData();
  
    const carouselContainer = document.querySelector(".swiper-wrapper");
  
  };