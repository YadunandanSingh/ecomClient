import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateCategory } from '../Features/category/categorySlice';

function UpdateCategoryModal({ category, closeModal }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        file: null
    });
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name,
                file: null
            });
            setPreviewImage('http://localhost:8000' + category.imagePath);
        }
    }, [category]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        setFormData((prev) => ({
            ...prev,
            file: newFile,
        }));
        if (newFile) {
            setPreviewImage(URL.createObjectURL(newFile));
        } else {
            setPreviewImage('http://localhost:8000' + category.imagePath);
        }
    };

    const handleUpdate = async () => {
        try {
            if (!formData.name) {
                alert("Please fill in the category name.");
                return;
            }
            const categoryData = new FormData();
            categoryData.append('name', formData.name);
            if (formData.file) {
                categoryData.append('categoreImg', formData.file);
            }
            console.log('componets data', categoryData)
            // Pass the category ID to the Redux thunk
            await dispatch(updateCategory({ id: category._id, data: categoryData }));
            alert('Update successfuly');
            closeModal();
        } catch (error) {
            console.error('Update failed', error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-amber-50/[.70]">
            <div className="bg-white p-6 rounded-lg border-2 border-black bg-opacity-0 shadow shadow-8xl shadow-black  w-1/3">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-bold">Update Category</h4>
                    <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">&times;</button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category Image</label>
                        <input
                            type="file"
                            name="categoreImg"
                            onChange={handleFileChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        {previewImage && (
                            <img src={previewImage} alt="Preview" className="mt-2 max-w-[150px]" />
                        )}
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={closeModal}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleUpdate}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateCategoryModal;
