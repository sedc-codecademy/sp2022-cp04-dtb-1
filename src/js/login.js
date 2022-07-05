const printName = () => {
    console.log("Login")
}

document.querySelector(".form").addEventListener("submit", (e) => {
    e.preventDefault()
    console.log('log ')
    loginUser()
})

const loginUser = async () => {
    const errorMsg = document.querySelector('.error-msg')
    const username = document.querySelector("#username")
    const password = document.querySelector("#password")


    try {
        const data = await fetch(" http://localhost:3000/users")
        const users = await data.json()
        
        let found = false;
        for (let user of users) {
            if(username.value == user.username && password.value == user.password) {
                localStorage.setItem('User', JSON.stringify(user))
                history.pushState({}, '', 'index.html')
                location.reload()
                found = true;
                break;
            }
        }
        if (!found) {
            errorMsg.style.display = "block";
            username.value  = ""
            password.value  = ""

            setTimeout(async ()=> {
                errorMsg.style.display = "none";
            },2000)
        }
    } catch (error) {
        console.log(error)
    }
}

export const loginHelper = {
    printName,
}