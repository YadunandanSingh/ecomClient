import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct,createProduct,DeleteProduct } from "../../Features/products/ProductSlice"
import { getCategory } from "../../Features/category/categorySlice"

import UpdateProductModal from '../../componets/UpdateProductModal';

// New state for modal management


function ManageProducts() {
    const [showModal, setShowModal] = useState(false);
    const [currentProduct, setcurrentProduct] = useState(null);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        file: null,
        name: '',
        Category: '',
        Discont_Price: '',
        brand: '',
        discription: '',
        price: '',
        quantity: '',
    });
    const [error, setError] = useState(null); // Add state for error messages
    const { products } = useSelector((state) => state.Product)
    const { category } = useSelector((state) => state.category)



    useEffect(() => {
        dispatch(getProduct());
        dispatch(getCategory());
    }, [dispatch,products]);

    

    // console.log(category)

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
            const ProductData = new FormData();
            ProductData.append('name', formData.name);
            ProductData.append('ProductImg', formData.file); // 'image' should match the field name in your Multer setup

             ProductData.append('Category', formData.Category);
            ProductData.append('Discont_Price', formData.Discont_Price);
            ProductData.append('brand', formData.brand);
            ProductData.append('discription', formData.discription);
            ProductData.append('price', formData.price);
            ProductData.append('quantity', formData.quantity);
            await dispatch(createProduct(ProductData));
           
            alert('upload successfuly')

            // Reset form after successful upload
            
            setFormData({
                file: null,
                name: '',
                Category: '',
                Discont_Price: '',
                brand: '',
                discription: '',
                price: '',
                quantity: '',
            });
            setError(null);
            setError(null);

        } catch (error) {
            console.error(error);
            setError(isMessage);
        }
    };

    
    const handleDelete = async (id) => {
        try {
            await dispatch(DeleteProduct(id))
            alert('delete successfuly')
        } catch (error) {
            console.log(error)
        }
        // Implement your delete logic here
    };

    const handleUpdate = (category) => {
        setcurrentProduct(category);
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
        // setcurrentProduct(null);
    };

    return (
        <div className='h-screen overflow-xh'>
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Manage Products</h3>

            {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error message */}

             <div className="bg-card bg-amber-50 p-6 rounded-lg border border-border w-4/4">
            <div className="space-y-4 grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xsm:grid-cols-1">
                <div className='m-1'>
                    <label htmlFor='ProductImg' className="block text-sm font-medium text-card-foreground mb-2">Select Products Image</label>
                    <input
                        type="file"
                        id='ProductImg'
                        name='file' // Corrected name to match state key
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>

                <div className='m-1'>
                    <label htmlFor='name' className="block text-sm font-medium text-card-foreground mb-2">Products Name</label>
                    <input
                        type="text"
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>

                <div className='m-1'>
                    <label htmlFor="Category" className="block text-sm font-medium text-card-foreground mb-2">Products Category</label>
                    <select
                        id="Category"
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        name='Category'
                        value={formData.Category}
                        onChange={handleChange}
                    >
                        <option value=''>Select Category</option>
                        {category && category.map((cat) => (
                            <option key={cat._id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='m-1'>
                    <label htmlFor='price' className="block text-sm font-medium text-card-foreground mb-2">Products Price</label>
                    <input
                        type="text"
                        id='price'
                        name='price' // Corrected name to match state key
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>

                <div className='m-1'>
                    <label htmlFor='Discont_Price' className="block text-sm font-medium text-card-foreground mb-2">Products Discount Price</label>
                    <input
                        type="text"
                        id='Discont_Price'
                        name='Discont_Price' // Corrected name to match state key
                        value={formData.Discont_Price}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>

                <div className='m-1'>
                    <label htmlFor='brand' className="block text-sm font-medium text-card-foreground mb-2">Products Brand</label>
                    <input
                        type="text"
                        id='brand'
                        name='brand' // Corrected name to match state key
                        value={formData.brand}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>
                
                <div className='m-1'>
                    <label htmlFor='quantity' className="block text-sm font-medium text-card-foreground mb-2">Products Quantity</label>
                    <input
                        type="number"
                        id='quantity'
                        name='quantity' // Corrected name to match state key
                        value={formData.quantity}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>
            </div>

            <div className='m-1'>
                <label htmlFor='discription' className="block text-sm font-medium text-card-foreground mb-2">Products Description</label>
                <textarea
                    id='discription'
                    name='discription' // Corrected name to match state key
                    value={formData.discription}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
            </div>

            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

            <button onClick={handleUpload} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Save
            </button>
        </div>

            <div className="xl:col-span-2 bg-card bg-amber-50 mt-5 p-4 lg:p-6 rounded-lg border border-border overflow-x-scroll">

                <div className="card my-5 p-4">
                    <h3 className="card-header bg-amber-50 text-dark-emphasis mb-4">All Products </h3>
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">image</th>
                                        <th scope="col">name</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Discont_Price</th>
                                        <th scope="col">brand</th>
                                        <th scope="col">discription</th>
                                        <th scope="col">price</th>
                                        <th scope="col">quantity</th>


                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Make sure heroSlides is not empty before mapping */}
                                    {products && products.length > 0 ? (
                                        products.map((item) => (
                                            <tr >
                                                <td>
                                                    <img
                                                        src={import.meta.env.VITE_API_URL +  item.imagePath}
                                                        alt="category images"
                                                        className="img-thumbnail max-w-[200px] min-w-[200px] max-h-[100px]"

                                                    />
                                                </td>
                                                <td>
                                                    <p className="fw-semibold my-auto">{item.name} </p>
                                                </td>
                                                <td>
                                                    <p className="fw-semibold my-auto">{item.Category} </p>
                                                </td>
                                                <td>
                                                    <p className="fw-semibold my-auto">{item.Discont_Price} </p>
                                                </td>
                                                <td>
                                                    <p className="fw-semibold my-auto">{item.brand} </p>
                                                </td>
                                                <td>
                                                    <textarea name="" value={item.discription} id="" disabled cols="30" rows='3'></textarea>

                                                </td>
                                                <td>
                                                    <p className="fw-semibold my-auto">{item.price} </p>
                                                </td>
                                                <td>
                                                    <p className="fw-semibold my-auto">{item.quantity} </p>
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
                                                No Products to display.
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
                <UpdateProductModal
                    products={currentProduct}
                    closeModal={closeModal}
                />
            )}
        </div>
    )
}

export default ManageProducts
