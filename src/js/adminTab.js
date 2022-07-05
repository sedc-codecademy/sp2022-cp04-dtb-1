export const adminTabHelper = (user) => {
    console.log(user)




    $('#log-out-user-btn').on('click', () => {
        console.log('click')
        localStorage.removeItem('User')
        history.pushState({}, '', 'index.html')
        location.reload()
    })

}