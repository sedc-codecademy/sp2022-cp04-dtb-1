export const getLoggedHelper =  () => { 
    return JSON.parse(localStorage.getItem('User'))
}

