import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from "../Features/products/ProductSlice";
import { getCategory } from "../Features/category/categorySlice";

function UpdateProductModal({ products, closeModal }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        Discont_Price: '',
        brand: '',
        quantity: '',
        discription: '',
        Category: '',
        file: null, // For new image
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [error, setError] = useState(null);
    const { isLoading,isMessage } = useSelector((state) => state.Product)
    const { category } = useSelector((state) => state.category);

    useEffect(() => {
        if (products) {
            setFormData({
                name: products.name || '',
                price: products.price || '',
                Discont_Price: products.Discont_Price || '',
                brand: products.brand || '',
                quantity: products.quantity || '',
                discription: products.discription || '',
                Category: products.Category || '',
                file: null,
            });
            setPreviewImage(`http://localhost:8000${products.imagePath}`);
        }
        dispatch(getCategory());
    }, [products, dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({
            ...prev,
            file: file,
        }));
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        } else {
            setPreviewImage(`http://localhost:8000${products.imagePath}`);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            if (!formData.name || !formData.price || !formData.Category || (!formData.file && !products.imagePath)) {
                setError("Please fill in all required fields.");
                return;
            }

            const productData = new FormData();
            productData.append('name', formData.name);
            productData.append('price', formData.price);
            productData.append('Discont_Price', formData.Discont_Price);
            productData.append('brand', formData.brand);
            productData.append('quantity', formData.quantity);
            productData.append('discription', formData.discription);
            productData.append('Category', formData.Category);

            // Append new file only if one is selected
            if (formData.file) {
                productData.append('ProductImg', formData.file);
            }
            
            await dispatch(updateProduct({ id: products._id, productData }));
            alert('Update successfuly');
            closeModal();
        } catch (error) {
            console.error(error);
            setError(isMessage || "An error occurred during update.");
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
            <div className="relative p-8 bg-white w-full max-w-2xl m-auto flex-col flex rounded-lg shadow-lg">
                <div className="text-xl font-semibold mb-4 text-center">Update Product</div>
                {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

                <form onSubmit={handleUpdate} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor='name' className="block text-sm font-medium text-gray-700">Product Name</label>
                            <input
                                type="text"
                                id='name'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                        </div>
                        <div>
                            <label htmlFor='price' className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                type="text"
                                id='price'
                                name='price'
                                value={formData.price}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                        </div>
                        <div>
                            <label htmlFor='Discont_Price' className="block text-sm font-medium text-gray-700">Discount Price</label>
                            <input
                                type="text"
                                id='Discont_Price'
                                name='Discont_Price'
                                value={formData.Discont_Price}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                        </div>
                        <div>
                            <label htmlFor='brand' className="block text-sm font-medium text-gray-700">Brand</label>
                            <input
                                type="text"
                                id='brand'
                                name='brand'
                                value={formData.brand}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                        </div>
                        <div>
                            <label htmlFor='quantity' className="block text-sm font-medium text-gray-700">Quantity</label>
                            <input
                                type="number"
                                id='quantity'
                                name='quantity'
                                value={formData.quantity}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                        </div>
                        <div>
                            <label htmlFor="Category" className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                id="Category"
                                name='Category'
                                value={formData.Category}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            >
                                <option value=''>Select Category</option>
                                {category && category.map((cat) => (
                                    <option key={cat._id} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor='discription' className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id='discription'
                            name='discription'
                            value={formData.discription}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        />
                    </div>
                    <div>
                        <label htmlFor='file' className="block text-sm font-medium text-gray-700">Product Image</label>
                        <input
                            type="file"
                            id='file'
                            name='ProductImg'
                            onChange={handleFileChange}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                        />
                        {previewImage && (
                            <div className="mt-4">
                                <img src={previewImage} alt="Product Preview" className="w-48 h-auto rounded-lg" />
                            </div>
                        )}
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                           
                        >
                           update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateProductModal;