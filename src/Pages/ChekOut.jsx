import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getUser, addCart, updateCartQuntity, removeCartItem, addAddress, RemoveAddress } from "../Features/auth/authSlice"; // adjust path if needed
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function ChekOut() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const API_URL = "http://localhost:8000/api/payment"

    const [ShippingAddress, setShippingAddress] = useState()
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    const { address, cart, user } = useSelector((state) => state.auth)
    const initialFormState = {

        firstname: '',
        email: '',
        houseNo: '',
        country: '',
        landmark: '',
        lastname: '',
        phone: '',
        colony: '',
        city: '',
        pincode: '',
    };
    const [formData, setFormData] = useState(initialFormState);

    // A single change handler function for all input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const subtotal = cart.reduce((sum, it) => sum + (it.price || 0) * (it.quantity || 1), 0)


    const handleAddressChange = (event) => {
        // Get the ID from the selected radio button's value
        const selectedId = event.target.value;
        setSelectedAddressId(selectedId);

        // Find the full address object based on the ID
        const selectedAddress = address.find(addr => addr.addressId === selectedId);

        // 3. Call setShippingAddress with the selected object
        if (selectedAddress) {
            setShippingAddress({
                name: selectedAddress.firstname + ' ' + selectedAddress.lastname,
                address: `${selectedAddress.houseNo}, ${selectedAddress.colony}, ${selectedAddress.landmark} ${selectedAddress.city} ${selectedAddress.country} ${selectedAddress.pincode}`,
                Phone: ` ${selectedAddress.phone}`,
                mail: `${selectedAddress.email}`,
            });
        }
    };

    const hndlePaymeny = async () => {
        try {
            const orderResponse = await axios.post(`${API_URL}/checkout`, {
                amount: subtotal + 100 + 100,
                CartItem: cart,
                UserShipping: ShippingAddress,
                UserId: user._id,
            })
            console.log('order_reponce',orderResponse)
            const { OrderId,amount } = orderResponse.data

            const options = {
                key: 'rzp_test_RLiilKT4GIhfef', // Replace with your Razorpay key_id
                amount: amount * 100 , // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: 'INR',
                name: 'CHOCOLATE',
                description: 'CHOCOLATE',
                order_id: OrderId, // This is the order_id created in the backend
                callback_url: 'http://localhost:3000/payment-success', // Your success URL
                handler: async function  (Response) {
                    console.log('paymentresponse',Response)
                    const paymentData ={
                        orderId: Response.razorpay_order_id,
                        paymentId: Response.razorpay_payment_id,
                        signature:Response.razorpay_signature,
                        amount: amount,
                        orderItem:cart,
                        userId: user._id,
                        userShipping: ShippingAddress
                    }

                    console.log('order_id', paymentData)
                    const api = await axios.post(API_URL+'/verify-payment',paymentData)

                    if(api.data.success){

                        navigate('/account')
                    }
                },
                prefill: {
                    name: 'CHOCOLATE',
                    email: 'CHOCOLATE@gmail.com',
                    contact: '9549274194'
                },
                theme: {
                    color: '#7f574c'
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open()
        } catch (error) {
            console.log(error)
        }
    }

    // A submit handler function for the form
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default browser page refresh on form submission
        const data = { userId: user._id, data: formData }
        dispatch(addAddress(data))
        console.log('Form Submitted!', formData);
        setFormData(initialFormState); // Clear the form after submission
    };

    const addItem = (id) => {
        const formdata = { userId: user._id, productId: id, quantity: 1 }
        dispatch(addCart(formdata))
    }
    const UpdateQuntity = (id) => {
        const formdata = { userId: user._id, productId: id }
        dispatch(updateCartQuntity(formdata))
    }
    const handleDelete = (id) => {
        const formdata = { userId: user._id, productId: id }
        dispatch(removeCartItem(formdata))
    }


    useEffect(() => {
        dispatch(getUser())
    }, [RemoveAddress])


    return (
        <div class="container checking-area">
            <div class="row">
                <div class="col-md-9 checkout-accordion">
                    <div class="col-md-12 white-bg">
                        <div class="bs-example">
                            <div class="panel-group" id="accordion">

                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">!. Billing Address</a>
                                        </h4>
                                    </div>
                                    <div id="collapseTwo" class="panel-collapse  in panel-body ">
                                        <div class="panel-body pb2">
                                            <div class="accordion-list-content" style={{ overflow: 'hidden', display: 'block' }}>
                                                <h3>Add Address</h3>

                                                <form onSubmit={handleSubmit} className="row">
                                                    <div className="col-md-6 check-name">
                                                        <div className="form-horizontal" role="form">
                                                            <div className="form-group">
                                                                <div className="col-sm-12">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Your First Name"
                                                                        name="firstname"
                                                                        value={formData.firstname}
                                                                        onChange={handleChange}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="col-sm-12">
                                                                    <input
                                                                        type="email"
                                                                        className="form-control"
                                                                        placeholder="Your Email"
                                                                        name="email"
                                                                        value={formData.email}
                                                                        onChange={handleChange}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="col-sm-12">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="House/Flat No."
                                                                        name="houseNo"
                                                                        value={formData.houseNo}
                                                                        onChange={handleChange}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="col-sm-12">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Your Post Country"
                                                                        name="country"
                                                                        value={formData.country}
                                                                        onChange={handleChange}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="col-sm-12">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Your Landmark"
                                                                        name="landmark"
                                                                        value={formData.landmark}
                                                                        onChange={handleChange}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 check-name">
                                                        <div className="form-horizontal" role="form">
                                                            <div className="form-group">
                                                                <div className="col-sm-12">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Your Last Name"
                                                                        name="lastname"
                                                                        value={formData.lastname}
                                                                        onChange={handleChange}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="col-sm-12">
                                                                    <input
                                                                        type="tel"
                                                                        className="form-control"
                                                                        placeholder="Your Telephone"
                                                                        name="phone"
                                                                        value={formData.phone}
                                                                        onChange={handleChange}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="col-sm-12">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Your Colony/Area"
                                                                        name="colony"
                                                                        value={formData.colony}
                                                                        onChange={handleChange}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="col-sm-12">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Your City"
                                                                        name="city"
                                                                        value={formData.city}
                                                                        onChange={handleChange}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="col-sm-12">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Your Post Code"
                                                                        name="pincode"
                                                                        value={formData.pincode}
                                                                        onChange={handleChange}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button type="submit" className="btn btn-default">
                                                            Save
                                                        </button>
                                                    </div>
                                                </form>

                                                <h3>Select Address</h3>
                                                {address.map((address, index) => (
                                                    <div class="col-md-12 check-name" key={index}>
                                                        <div class="radio">
                                                            <label>
                                                                <input
                                                                    type="radio"
                                                                    name="optionsRadios"
                                                                    value={address.addressId}
                                                                    checked={selectedAddressId === address.addressId}
                                                                    onChange={handleAddressChange}
                                                                />
                                                                <h4>{address.firstname} {address.lastname} </h4>
                                                                <p>
                                                                    {address.houseNo}, {address.colony}, {address.landmark} {address.city} {address.country} {address.pincode}
                                                                    <br />
                                                                    E-mail : {address.email}, Phone number :{address.phone}
                                                                </p>
                                                            </label>

                                                            <button class="btn btn-default" onClick={() => dispatch(RemoveAddress({ userId: user._id, addressId: address.addressId }))}>Delete Address</button>
                                                        </div>
                                                    </div>
                                                ))}

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseFour">4. Delivery Method</a>
                                        </h4>
                                    </div>
                                    <div id="collapseFour" class="panel-collapse collapse">
                                        <div class="panel-body">
                                            <div class="accordion-list-content" style={{ overflow: 'hidden', display: 'block' }}>
                                                <p>
                                                    Please select the preferred payment method to use on this order.
                                                </p>
                                                <label class="checkbox payment-method inline">
                                                    <input type="checkbox" value="option1" /> RazerPay </label>
                                                <label class="checkbox payment-method inline">
                                                    <input type="checkbox" value="option2" />Cash On Dilivery (COD)</label>

                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseSix">6. Confirm Order</a>
                                        </h4>
                                    </div>
                                    <div id="collapseSix" class="panel-collapse collapse">
                                        <div class="col-md-12 checkout-cart">
                                            <div class="sixteen columns">

                                                <table class="table cart-table responsive-table">
                                                    <tbody>
                                                        <tr>
                                                            <th>
                                                                Item
                                                            </th>
                                                            <th>
                                                                Description
                                                            </th>
                                                            <th>
                                                                Price
                                                            </th>
                                                            <th>
                                                                Quantity
                                                            </th>
                                                            <th>
                                                                Total
                                                            </th>
                                                            <th>
                                                            </th>
                                                        </tr>

                                                        {cart.length === 0 ? 'Cart Empty' :
                                                            cart.map((item, idx) => (




                                                                <tr key={item.productId}>
                                                                    <td>
                                                                        <img
                                                                            src={`http://localhost:8000${item.imagePath}`}
                                                                            alt="slider images"
                                                                            className="img-thumbnail max-w-[70px] min-w-[7px] max-h-[70px]"

                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <p className="fw-semibold my-auto">{item.name}</p>
                                                                    </td>
                                                                    <td>
                                                                        <p className="fw-semibold my-auto">{item.price}</p>
                                                                    </td>
                                                                    <td>
                                                                        <div className='flex max-w-[85px]'>
                                                                            <button className='btn btn-default' onClick={() => UpdateQuntity(item.productId)}>-</button>
                                                                            <input className='max-w-[40px] border-1 border-gray-500 m-3 text-center' type="number" readOnly value={item.quantity} />
                                                                            <button className='btn btn-default' onClick={() => addItem(item.productId)}>+</button>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-danger btn-sm"
                                                                            // Assuming you have a handler function for the delete action
                                                                            onClick={() => handleDelete(item.productId)}
                                                                        >
                                                                            <i className="bi bi-trash-fill me-2"></i>
                                                                            Remove
                                                                        </button>
                                                                    </td>
                                                                </tr>



                                                            ))
                                                        }


                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="">
                                                {/* <form action="#" method="get" class="apply-coupon">
                                                    <input class="search-field" type="text" placeholder="Coupon Code" value="" />
                                                    <a href="#" class="coupon-btn checkout-btn">Apply Coupon</a>
                                                </form> */}



                                                <div class="col-md-12  columns cart-totals">
                                                    <table class="table cart-table test">
                                                        <tbody>
                                                            <tr>
                                                                <th>
                                                                    Cart Subtotal
                                                                </th>
                                                                <td>
                                                                    <strong>{subtotal}</strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>
                                                                    plateform Fess
                                                                </th>
                                                                <td>
                                                                    100
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>
                                                                    Shipping and Handling
                                                                </th>
                                                                <td>
                                                                    100
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>
                                                                    Order Total
                                                                </th>
                                                                <td>
                                                                    <strong>{subtotal + 100 + 100}</strong>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <br />
                                                    <button class="calculate-shipping" onClick={hndlePaymeny}>Checkout</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 shop-sidebar">
                    <div class="sidebar-widgets">
                        <div class="shop-widget">
                            <h4>Categories</h4>
                            <ul class="category-shop-list">
                                <li>
                                    <a class="accordion-link" href="#">Watches <span>(4)</span></a>
                                    <ul class="accordion-list-content">
                                        <li><a href="#">Jackets <span>(7)</span></a></li>
                                        <li><a href="#">Electronics <span>(10)</span></a></li>
                                        <li><a href="#">Sports <span>(12)</span></a></li>
                                        <li><a href="#">Garden <span>(2)</span></a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a class="accordion-link" href="#">Jewellery <span>(8)</span></a>
                                    <ul class="accordion-list-content">
                                        <li><a href="#">Jackets <span>(7)</span></a></li>
                                        <li><a href="#">Electronics <span>(10)</span></a></li>
                                        <li><a href="#">Sports <span>(12)</span></a></li>
                                        <li><a href="#">Garden <span>(2)</span></a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a class="accordion-link" href="#">Technology <span>(6)</span></a>
                                    <ul class="accordion-list-content">
                                        <li><a href="#">Jackets <span>(7)</span></a></li>
                                        <li><a href="#">Electronics <span>(10)</span></a></li>
                                        <li><a href="#">Sports <span>(12)</span></a></li>
                                        <li><a href="#">Garden <span>(2)</span></a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a class="accordion-link" href="#">Kids <span>(5)</span></a>
                                    <ul class="accordion-list-content">
                                        <li><a href="#">Jackets <span>(7)</span></a></li>
                                        <li><a href="#">Electronics <span>(10)</span></a></li>
                                        <li><a href="#">Sports <span>(12)</span></a></li>
                                        <li><a href="#">Garden <span>(2)</span></a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a class="accordion-link" href="#">Electronics <span>(4)</span></a>
                                    <ul class="accordion-list-content">
                                        <li><a href="#">Jackets <span>(7)</span></a></li>
                                        <li><a href="#">Electronics <span>(10)</span></a></li>
                                        <li><a href="#">Sports <span>(12)</span></a></li>
                                        <li><a href="#">Garden <span>(2)</span></a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a class="accordion-link" href="#">Sports <span>(5)</span></a>
                                    <ul class="accordion-list-content">
                                        <li><a href="#">Jackets <span>(7)</span></a></li>
                                        <li><a href="#">Electronics <span>(10)</span></a></li>
                                        <li><a href="#">Sports <span>(12)</span></a></li>
                                        <li><a href="#">Garden <span>(2)</span></a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a class="accordion-link" href="#">Bicycles <span>(7)</span></a>
                                    <ul class="accordion-list-content">
                                        <li><a href="#">Jackets <span>(7)</span></a></li>
                                        <li><a href="#">Electronics <span>(10)</span></a></li>
                                        <li><a href="#">Sports <span>(12)</span></a></li>
                                        <li><a href="#">Garden <span>(2)</span></a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div class="shop-widget">
                            <h4>Popular Products</h4>
                            <ul class="popular-product">
                                <li>
                                    <img alt="" src="images/product.png" />
                                    <div>
                                        <h6><a href="#">Iphone 5 black</a></h6>
                                        <span>$766.00</span>
                                    </div>
                                </li>
                                <li>
                                    <img alt="" src="images/product2.png" />
                                    <div>
                                        <h6><a href="#">Samasung Galaxy note 3</a></h6>
                                        <span>$555.00</span>
                                    </div>
                                </li>
                                <li>
                                    <img alt="" src="images/product3.png" />
                                    <div>
                                        <h6><a href="#">Iphone 5 black</a></h6>
                                        <span>$766.00</span>
                                    </div>
                                </li>
                                <li>
                                    <img alt="" src="images/product4.png" />
                                    <div>
                                        <h6><a href="#">Samasung Galaxy note 3</a></h6>
                                        <span>$555.00</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChekOut