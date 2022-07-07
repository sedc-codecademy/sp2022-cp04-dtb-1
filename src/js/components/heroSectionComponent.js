export const heroSectionComponent = async() => {

    const getPostsData = async() => {
        const data = await fetch('http://localhost:3000/posts?_sort=rating&_order=desc&_start=0&_end=4')
        const posts = await data.json()
        return posts;
    }

    const postBuilder = async() => {
        const postsContainer = $('.container-hero')
        postsContainer.empty()

        const posts = await getPostsData();

        posts.map((post, index) => {

            const mainDiv = $('<div class="box"></div>')
            mainDiv.css("background-image", `url(${post.image})`);

            const boxContent = $(`<div class="box-content inner-content-${index + 1}"></div>`)
            const bodyTitle = $(`<h3>${post.title}</h3>`)
            const bodyText = $(`<p>${post.description}</p>`)

            const divRating = $('<div class="rating-container"></div>')
            const rating = $(`<span>Rating: ${post.rating}</span>`)
            const star = $(`<span class="stars-span-full "></span>`)
            divRating.append(rating)
            divRating.append(star)

            const divTags = $('<div class="blog-post-tags"></div>')
            post.tags.forEach(tag => {
                const tagElement = $(`<span class=${tag}-tag></span>`)
                tagElement.text(tag.replace('-', ' & '))
                divTags.append(tagElement)
            })

            boxContent.append(bodyTitle)
            boxContent.append(bodyText)
            boxContent.append(divRating)
            boxContent.append(divTags)

            mainDiv.append(boxContent)

            postsContainer.append(mainDiv)
        })
    }
    
    postBuilder()
}