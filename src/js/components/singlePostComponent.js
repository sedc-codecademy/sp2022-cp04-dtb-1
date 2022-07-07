export const buildSinglePost = post => {
    console.log(post)
    $('#blog-section').hide()
    $('#post-section').show()
    // $('#post-section').empty()
    history.pushState({}, "",'index.html#id')

    // const title = $(`<h2>${post.title}</h2>`)
    // $('#post-section').append(title)

    const postContainer = $('.sigle-post-container')
    const afterContainer = $('.blog-post-after-container')
    postContainer.empty()
    afterContainer.empty()

    const headerDiv = $('<div class="single-post-header"></div>')
    const postTitle = $(`<h3>${post.title}</h3>`)
    const postAuthor = $(`<p>${post.userId}</p>`)

    headerDiv.append(postTitle)
    headerDiv.append(postAuthor)

    const imageDiv = $('<div class="single-post-image-container"></div>')
    imageDiv.css("background-image", `url(${post.image})`);

    const postBody = $('<div class="single-post-body"></div>')
    const postText = $(`<p>${post.body}</p>`)
    postBody.append(postText)

    const postRatingsDiv = $('<div class="blog-post-rating-tags-container"></div>')
    const starDiv = $('<div class="single-post-stars"></div>')
    const starSpan = $(`<span class="single-post-stars-span-full">Rating: ${post.rating}</span>`)

    const tagsDiv = $('<div class="single-post-tags"></div>')

    post.tags.map(tag => {
        const tagElement = $(`<span class=${tag}-tag></span>`)
        tagElement.text(tag.replace('-', ' & '))
        tagsDiv.append(tagElement)
    })


    starDiv.append(starSpan)
    postRatingsDiv.append(starDiv)
    postRatingsDiv.append(tagsDiv)
    

    postContainer.append(headerDiv)
    postContainer.append(imageDiv)
    postContainer.append(postBody)
    postContainer.append(postRatingsDiv)



    // after post area
    const rateStarDiv = $('<div class="single-post-stars"></div>')
    const pRate = $('<p>Rate:</p>')



    const fillStars = (value) => {
        $('.star-pick').each(function() {
          if ($(this).attr("value") <= value) {
            console.log($(this).attr("value"))
            $(this).addClass("single-post-stars-span-full");
          };
        })
    }

    rateStarDiv.append(pRate)
    for(let i = 0; i < 5; i++) {
        let span = $(`<span class="star-pick single-post-stars-span-empty" value=${i}></span>`)
        span.on("click", function () {
            console.log($(this).attr("value"))
            fillStars($(this).attr("value"));
          } )
        rateStarDiv.append(span)
    }
    
    const writeCommentDiv = $('<div class="single-post-comment-write"></div>')
    const inputName = $(`<input type="text" placeholder="Enter name">`)
    const textArea = $(`<textarea rows="5" placeholder="Leave a comment..."></textarea>`)

    writeCommentDiv.append(inputName)
    writeCommentDiv.append(textArea)

    const submitDiv = $('<div class="single-post-submit-comment"></div>')
    const submitBtn = $('<button class="single-post-submit-comment-btn">Comment</button>')
    submitDiv.append(submitBtn)

    const commentPostedDiv = $('<div class="single-post-comments-container"></div>')

    if(post.comments.length == 0) {
        const errorMsg = $('<h3>Be the first to comment!</h3>')
        commentPostedDiv.append(errorMsg)
    }

    post.comments.map(comment => {
        const singleComment = $('<div class="single-post-comment-show"></div>')
        const commentUser = $(`<h4>User with id:${comment.userId}</h4>`)
        const coomentBody = $(`<p>${comment.text}</p>`)

        singleComment.append(commentUser)
        singleComment.append(coomentBody)

        commentPostedDiv.append(singleComment)
    })
   
    

    afterContainer.append(rateStarDiv)
    afterContainer.append(writeCommentDiv)
    afterContainer.append(submitDiv)
    afterContainer.append(commentPostedDiv)

}