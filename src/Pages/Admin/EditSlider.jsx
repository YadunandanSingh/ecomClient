import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from "react-redux"
import { getHeroSlides, createHeroSlide,deleteHeloSlide } from "../../Features/HeroSlide/HeroSlideSlice"
function EditSlider() {
    const [fileData, setfileData] = useState(null)
    const dispatch = useDispatch()
    const { heroSlides } = useSelector((state) => state.heroSlide)
    useEffect(() => {
        dispatch(getHeroSlides())
    }, [dispatch,heroSlides])

    const handleChange = (e) => {
        const file = e.target.files[0]
        setfileData(file)
    }

    const handleUpload = async () => {

        try {
            const formData = new FormData();
            // Append the file with the same field name Multer is expecting ('ImageSlide')
            formData.append('ImageSlide', fileData);
            console.log(formData)
            await dispatch(createHeroSlide(formData))
            console.log("File to upload:", fileData);
        } catch (error) {
            console.log('file upload failed :', error)
        }


    };
    const handleDelete = async(id) => {
        // Implement your delete logic here
        try {
            dispatch(deleteHeloSlide(id))
            alert(`Deleting image with ID: ${id}`);
        } catch (error) {
            console.log('file upload failed :', error)
        }
    };


   
  
    return (
        <div className=' h-screen overflow-y-scroll'>
            <div className="bg-card bg-amber-50 p-6 rounded-lg border border-border w-2/4">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Hero slider Settings</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">Select Slider or Poster</label>
                        <input
                            type="file"
                            // defaultValue="AdminPanel"
                            name='ImageSlide'

                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    <button onClick={handleUpload} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                        Save
                    </button>
                </div>
            </div>


            <div className="xl:col-span-2 bg-card bg-amber-50 mt-5 p-4 lg:p-6 rounded-lg border border-border">

                <div className="card my-5 p-4">
                    <h3 className="card-header bg-amber-50 text-dark-emphasis mb-4">Hero Slider Images</h3>
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Make sure heroSlides is not empty before mapping */}
                                    {heroSlides && heroSlides.length > 0 ? (
                                        heroSlides.map((item) => (
                                            <tr key={item._id}>
                                                <td>
                                                    <img
                                                        src={'http://localhost:8000' + item.imagePath}
                                                        alt="slider images"
                                                        className="img-thumbnail max-w-[200px] min-w-[200px] max-h-[100px]"

                                                    />
                                                </td>
                                                <td>
                                                    <p className="fw-semibold my-auto">{item.name}</p>
                                                </td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger btn-sm"
                                                    // Assuming you have a handler function for the delete action
                                                     onClick={() => handleDelete(item._id)}
                                                    >   
                                                        <i className="bi bi-trash-fill me-2"></i>
                                                        Delete image
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center text-muted">
                                                No slides to display.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditSlider
