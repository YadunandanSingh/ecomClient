import axios from "axios"
const API_URL = "http://localhost:8000/api/category"

// get category api 
const getcategory = async(FormData) =>{
    try {
        const response =  await  axios.get(API_URL)
        
        return response.data.category
    } catch (error) {
        return error.response.data.msg
    }
}

const Createcategory = async(FormData) =>{
        const token = JSON.parse(localStorage.getItem("token"))

    try {
        const response =  await  axios.post(API_URL,FormData,{
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

const deleteCategory = async(id) =>{
        const token = JSON.parse(localStorage.getItem("token"))

    try {
        const response =  await  axios.delete(API_URL+'/'+id,{
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

const UpadteCategory = async(formdata) =>{
        const token = JSON.parse(localStorage.getItem("token"))
        
        try {
            console.log('token ',token)

            const response =  await  axios.put(API_URL+'/'+formdata.id, formdata.data,{
                headers: {
                    
                    Authorization: `${token} `
                }
            })
            
            console.log('service data ',formdata)
        
       return response.data
    } catch (error) {
        console.log(error.response.data)
        return error.response.data
    }
}

const categoryService = {
    getcategory,
    Createcategory,
    deleteCategory,
    UpadteCategory,
}

export default categoryService