export const mainBlogSectionComponent = () => {
    let PAGE_NUMBER = 1
    let LIMIT = 4
    $('.load-more-btn').off()

    $(() => {
        $(".monthPicker").datepicker({
          dateFormat: 'MM yy',
          changeMonth: true,
          changeYear: true,
          showButtonPanel: true,
    
          onClose: function(dateText, inst) {
              var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
              var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
              $(this).val($.datepicker.formatDate('MM yy', new Date(year, month, 1)));
          }
      });
    
        $(".monthPicker").focus(function () {
            $(".ui-datepicker-calendar").hide();
            $("#ui-datepicker-div").show();
            // $("#ui-datepicker-div").position({
            //     my: "center top",
            //     at: "center bottom",
            //     of: $(this)
            // });
        });
      });

    $(".filter-li").each(function () {
        $(this).on('click', (e)=> {
            addActiveLink(e.target)
        })
    })

    const addActiveLink = (filterItem) => {
        $('.active-filter').removeClass('active-filter')
        $(filterItem).addClass('active-filter')
    }

    const postBuilder = (posts, pageNumber) => {
        const postsContainer = $('.main-blog-posts-container')
        console.log(`Page number: ${pageNumber}`);
        if(pageNumber == 1) {
            postsContainer.empty()
        }
        console.log(posts)

        posts.map(post => {
            const mainDiv = $('<div class="main-blog-posts-card"></div>')
            const imageDiv = $('<div class="main-blog-image-container"></div>')
            const imageCover = $(`<img src=${post.image} alt="background">`)
            imageDiv.append(imageCover)

            const bodyDiv = $('<div class="main-blog-posts-body"></div>')
            const bodyTitle = $(`<h3>${post.title}</h3>`)
            const bodyText = $(`<p>${post.description}</p>`)
            bodyDiv.append(bodyTitle)
            bodyDiv.append(bodyText)

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

            bodyDiv.append(divRating)
            bodyDiv.append(divTags)

            mainDiv.append(imageDiv)
            mainDiv.append(bodyDiv)

            postsContainer.append(mainDiv)
        })

        
    }



    const getFilterParams = () => {
        const activeTag = $(".active-filter").attr("value")
        let isMonthFilterOn = false
        if ($(".checkbox").is(':checked')) {
            isMonthFilterOn = true
        }
        let monthPickerValue = $('.monthPicker').val()

        const sortOrder = $('#sort-by-time').val()

        return {
            activeTag,
            isMonthFilterOn,
            isMonthFilterOn,
            monthPickerValue,
            sortOrder
        }
    }
    
    $('.filter-btn').on('click', () => {
        PAGE_NUMBER = 1
        mainFilterFunction(PAGE_NUMBER)
    })

    const monthFilterHelper = (datePicked) => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const [month, year] = datePicked.split(' ')
        const newDte = new Date(year, monthNames.indexOf(month))
        
        let formattedNumber = ( monthNames.indexOf(month) + 1).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          })

          return year+ '-' + formattedNumber
    }

    const mainFilterFunction = async (pageNumber) => {
        $('.load-more-btn').show()
        const filterParams = getFilterParams()
        let m_filter = ""
        if(filterParams.isMonthFilterOn) {
            m_filter = monthFilterHelper(filterParams.monthPickerValue)
        }

        try {
            const data = await fetch(`http://localhost:3000/posts?createdAt_like=${m_filter}&tags_like=${filterParams.activeTag}&_sort=createdAt&_order=${filterParams.sortOrder}&_page=${pageNumber}&_limit=${LIMIT}`)
            const totalPosts = data.headers.get('X-Total-Count')
            const posts = await data.json()

            

            if(totalPosts <= LIMIT * pageNumber) {
               $('.load-more-btn').hide()
            }

            postBuilder(posts, pageNumber)
        } catch (error) {
            console.log(error);
        }
       
    }

    $('.load-more-btn').on('click', ()=> {
        PAGE_NUMBER++
        mainFilterFunction(PAGE_NUMBER)
    })

    mainFilterFunction(PAGE_NUMBER)
}