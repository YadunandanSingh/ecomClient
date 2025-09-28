import axios from "axios";
const API_URL = "http://localhost:8000/slide/"


// Create new hero slides
const createHeroSlide = async (formData) => {
    try {
        const token = JSON.parse(localStorage.getItem("token"))
        console.log(formData)
        const response = await axios.post(API_URL + "upload", formData, {
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

// Get all hero slides
const getHeroSlides = async () => {
    try {
        const token = JSON.parse(localStorage.getItem("token"))
        
        const response = await axios.get(API_URL + "allSlide",{
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
const deleteHeroSlides =async (id) =>{
  try {
        const token = JSON.parse(localStorage.getItem("token"))
          const response = await axios.delete(API_URL + "delete/"+ id, {
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

const heroSlideService = {
    createHeroSlide,
    getHeroSlides,
    deleteHeroSlides
}

export default heroSlideService