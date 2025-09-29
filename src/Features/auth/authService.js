import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL + "/user/"

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL + "Register", userData)

    if (response.data) {
        localStorage.setItem("token", JSON.stringify(response.data.token))
    }
    return response.data
}

// Login user
const login = async (userData) => {
    console.log("API_URL:", API_URL)
    const response = await axios.post(API_URL + "Login", userData)

    if (response.data) {
        localStorage.setItem("token", JSON.stringify(response.data.accessToken))
    }
    return response.data
}

// Logout user
const logout = async () => {
    // const response = await axios.post(API_URL + "logout", userData)
    // console.log("response logout:", response)
    localStorage.removeItem("token")
    //  return response.data
}

const getUser = async () => {

    const token = JSON.parse(localStorage.getItem("token"))
    if (token) {
        const response = await axios.get(API_URL + "userInfo", {
            headers: {
                Authorization: `${token} `
            }
        })

        return response.data
    }

}

const AddCart = async (formdata) => {

    const token = JSON.parse(localStorage.getItem("token"))

    try {
        console.log('token ', token)

        const response = await axios.put(API_URL + 'userCart'+'/'+ formdata.userId, formdata, {
            headers: {

                Authorization: `${token} `
            }
        })

        console.log('Cart ', formdata)

        return response.data
    } catch (error) {
        console.log(error.response.data)
        return error.response.data
    }

}

const AddQuantity = async (formdata) => {

    const token = JSON.parse(localStorage.getItem("token"))

    try {
        console.log('token ', token)

        const response = await axios.put(API_URL + 'removeItem'+'/'+ formdata.userId, formdata, {
            headers: {

                Authorization: `${token} `
            }
        })

        console.log('Cart ', formdata)

        return response.data
    } catch (error) {
        console.log(error.response.data)
        return error.response.data
    }

}

const RemoveCartItem = async (formdata) => {

    const token = JSON.parse(localStorage.getItem("token"))

    try {
        console.log('remove cart item token ', token)

        const response = await axios.put(API_URL + 'removeCartItem'+'/'+ formdata.userId, formdata, {
            headers: {

                Authorization: `${token} `
            }
        })

        console.log('Cart ', formdata)

        return response.data
    } catch (error) {
        console.log(error.response.data)
        return error.response.data
    }

}

const AddAddress = async (formdata) => {

    const token = JSON.parse(localStorage.getItem("token"))

    try {
        console.log('token ', token)

        const response = await axios.put(API_URL + 'AddAddress'+'/'+ formdata.userId, formdata.data, {
            headers: {

                Authorization: `${token} `
            }
        })

        console.log('address ', formdata)

        return response.data
    } catch (error) {
        console.log(error.response.data)
        return error.response.data
    }

}

const RemoveAddress = async (formdata) => {

    const token = JSON.parse(localStorage.getItem("token"))

    try {
        console.log('token ', token)

        const response = await axios.put(API_URL + 'RemoveAddress'+'/'+ formdata.userId, formdata, {
            headers: {

                Authorization: `${token} `
            }
        })

        console.log('address ', formdata)

        return response.data
    } catch (error) {
        console.log(error.response.data)
        return error.response.data
    }

}







const authService = {
    register,
    logout,
    login,
    getUser,
    AddCart,
    AddQuantity,
    RemoveCartItem,
    AddAddress,
    RemoveAddress
}

export default authService