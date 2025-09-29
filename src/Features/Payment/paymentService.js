import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL + "/api/payment/"


// get
const getAllPaymentData = async (formData) => {
    try {
        const token = JSON.parse(localStorage.getItem("token"))
        console.log(formData)
        const response = await axios.get(API_URL + "getAll-payment", {
            headers: {
               
                Authorization: `${token} `
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        return error.response.data.msg
    }

}
const UpdateSippmentStatus = async (formData) => {
    try {
        const token = JSON.parse(localStorage.getItem("token"))
        console.log(formData)
        const response = await axios.put(API_URL + "order/"+formData.OrderId, formData, {
            headers: {
               
                Authorization: `${token} `
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        return error.response.data.msg
    }

}



const paymentService = {
    getAllPaymentData,
    UpdateSippmentStatus
}

export default paymentService