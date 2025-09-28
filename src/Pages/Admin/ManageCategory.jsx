import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory, createCategory, DeleteCategory } from "../../Features/category/categorySlice"
import UpdateCategoryModal from '../../componets/UpdateCategoryModal';

// New state for modal management


function ManageCategory() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        file: null // Set initial value to null
    });
    const [error, setError] = useState(null); // Add state for error messages
    const { category, isMessage, isLoading } = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(getCategory());
    }, [category]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            file: e.target.files[0], // Correctly update only the file
        }));
    };

    const handleUpload = async () => {
        try {
            if (!formData.name || !formData.file) {
                setError("Please fill in all required fields.");
                return;
            }

            // Create a FormData object to send both text and file data
            const categoryData = new FormData();
            categoryData.append('name', formData.name);
            categoryData.append('categoreImg', formData.file); // 'image' should match the field name in your Multer setup

            await dispatch(createCategory(categoryData));
            alert('upload successfuly')

            // Reset form after successful upload
            setFormData({ name: '', file: null });
            setError(null);

        } catch (error) {
            console.error(error);
            setError(isMessage);
        }
    };

    const handleDelete = async (id) => {
        try {
            await dispatch(DeleteCategory(id))
            alert('delete successfuly')
        } catch (error) {
            console.log(error)
        }
        // Implement your delete logic here
    };

    const handleUpdate = (category) => {
        setCurrentCategory(category);
        setShowModal(true);
    };
     const closeModal = () => {
        setShowModal(false);
        // setCurrentCategory(null);
    };

    return (
        <div className='h-screen overflow-xh'>
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Manage Category</h3>
            {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error message */}

            <div className="bg-card bg-amber-50 p-6 rounded-lg border border-border w-2/4">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">Select Category Image</label>
                        <input
                            type="file"
                            id='categoreImg'
                            name='categoreImg'
                            onChange={handleFileChange} // Use the new handler for files
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">Category Name</label>
                        <input
                            type="text"
                            id='name'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    <button onClick={handleUpload} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                        {isLoading ? 'Uploading...' : 'Save'}
                    </button>
                </div>
            </div>

            <div className="xl:col-span-2 bg-card bg-amber-50 mt-5 p-4 lg:p-6 rounded-lg border border-border">

                <div className="card my-5 p-4">
                    <h3 className="card-header bg-amber-50 text-dark-emphasis mb-4">Category </h3>
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">subCategory</th>

                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Make sure heroSlides is not empty before mapping */}
                                    {category && category.length > 0 ? (
                                        category.map((item) => (
                                            <tr >
                                                <td>
                                                    <img
                                                        src={'http://localhost:8000' + item.imagePath}
                                                        alt="category images"
                                                        className="img-thumbnail max-w-[200px] min-w-[200px] max-h-[100px]"

                                                    />
                                                </td>
                                                <td>
                                                    <p className="fw-semibold my-auto">{item.name} </p>
                                                </td>
                                                <td>
                                                    <p className="fw-semibold my-auto">
                                                        <select name="" id="" className='p-2 btn btn disabled' >
                                                            <option value="">------</option>
                                                            <option value="">shows </option>
                                                            <option value="">shirt</option>
                                                        </select></p>
                                                </td>
                                                <td className=''>
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger btn-xs "
                                                        onClick={() => handleDelete(item._id)}
                                                    >
                                                        <i className="bi bi-trash-fill "></i>
                                                        Delete image
                                                    </button>

                                                       <button
                                                        type="button"
                                                        className="btn btn-info btn-xs"
                                                        onClick={() => handleUpdate(item)}
                                                    >
                                                        <i className="bi bi-pencil-fill"></i>
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn btn-warning btn-xs"
                                                        // onClick={() => handleDelete(item._id)}
                                                    >
                                                        <i className="bi bi-trash-fill "></i>
                                                        update Sub-category
                                                    </button>

                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center text-muted">
                                                No Category to display.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
              {showModal && (
                <UpdateCategoryModal
                    category={currentCategory}
                    closeModal={closeModal}
                />
            )}
        </div>
    )
}

export default ManageCategory
