import axios from "axios"
const API_URL = "http://localhost:8000/api/Products"

// get category api 
const getProduct = async (FormData) => {
    try {
        const response = await axios.get(API_URL)

        return response.data.product
    } catch (error) {
        console.log('error', error)
        return error.response.data.msg
    }
}

const CreateProduct = async (FormData) => {
    const token = JSON.parse(localStorage.getItem("token"))

    try {
        const response = await axios.post(API_URL, FormData, {
            headers: {

                Authorization: `${token} `
            }
        })


        return response.data
    } catch (error) {
        console.log(error.response.data)
        return error.response.data
    }
}

const deleteProduct = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"))

    try {
        const response = await axios.delete(API_URL + '/' + id, {
            headers: {

                Authorization: `${token} `
            }
        })


        return response.data
    } catch (error) {
        console.log(error.response.data)
        return error.response.data
    }
}

const UpadteProduct = async (formdata) => {
    const token = JSON.parse(localStorage.getItem("token"))

    try {
        console.log('token ', token)

        console.log('id and data', formdata)

        const response = await axios.put(API_URL + '/' + formdata.id, formdata.productData, {
            headers: {

                Authorization: `${token} `
            }
        })

        console.log('service data ', formdata)

        return response.data
    } catch (error) {
        console.log(error.response.data)
        return error.response.data
    }
}

const ProductService = {
    getProduct,
    CreateProduct,
    deleteProduct,
    UpadteProduct,
}

export default ProductService