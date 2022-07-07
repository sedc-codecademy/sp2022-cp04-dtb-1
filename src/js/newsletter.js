
export const newsletterPage = () => {
   
    //display spinner
    $('#newsletter-section').hide()
    $('.spinner').show()
    // call all fetch and build functions

    //hide spinner
    setTimeout(()=> {
    $('.spinner').hide()
    $('#newsletter-section').show()
    },2000)
}