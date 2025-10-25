import axios from 'axios'

export const signinCall = async({ email, password }) => {
    try {
        // console.log(payload)
        const response = await axios.post(`http://localhost:3001/api/v1/auth/signin`, {
            email,
            password
        })
        console.log(response.data)

        const userRecord = await axios.get(`http://localhost:3001/api/v1/auth/profile`, {
                headers: {
                    Authorization: `Bearer ${response.data.token}`
                }
            })
            // console.log(userRecord.data.userDetails)
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('token', response.data.token)
            // console.log(response)
            // return user
        return userRecord.data.userDetails
    } catch (error) {
        console.log('error which sign in user from backend', error)
    }
}

export const signupCall = async({ firstname, lastname, email, password }) => {
    try {
        const response = await axios.post(`http://localhost:3001/api/v1/auth/signup`, {
                firstname,
                lastname,
                email,
                password
            })
            // console.log(response)
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('token', response.data.token)
    } catch (error) {
        console.log('error while sign up user from backend', error)
    }
}