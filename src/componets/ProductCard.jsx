import React, { useState, useEffect, useRef } from 'react'
// import img2 from '../../assets/img/1.jpg'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getUser, addCart } from '../Features/auth/authSlice/'

function ProductCard(props) {
  const dispatch = useDispatch()
  const { isAuthenticated, isAdmin, cart,user } = useSelector((state) => state.auth)

  const addProductCart = (product) => {
    const data ={
      userId: user._id, // Assuming 'user' is accessible in this scope
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imagePath: product.imagePath
    };
    dispatch(addCart(data))
  }

  return (
    <div className="overflow-hidden w-full">

      <div
        className="flex transition-transform duration-500 ease-in-out w-full" >
        <div

          className={`flex-none p-2 w-full `}
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden w-full relative">
            <a href="#" className="block relative">
              <img
                src={'http://localhost:8000' + props.imagePath}
                className="w-full h-64 object-cover"
                alt={props.name}
              />
            </a>
            {/* {props.badge && (
                    <span className="bg-red-700 text-white absolute h-10 w-10 rounded-full flex items-center justify-center text-sm font-light border-2 border-white shadow-md top-3 right-3">
                      {props.badge}
                    </span>
                  )} */}
            <div className="p-4">
              <h4 className="font-normal text-sm my-2 text-center line-clamp-1">
                {props.name}
              </h4>
              <div className="flex justify-center items-center space-x-2">
                <h5 className="font-bold text-sm text-center text-gray-800">
                  {props.price}
                </h5>
                {props.Discont_Price && (
                  <h6 className="font-light text-xs text-center text-gray-500 line-through">
                    {props.Discont_Price}
                  </h6>
                )}
              </div>
            </div>
            <Link to='/Detail' className='w-full  btn btn-default' state={props}>
              <p>

                view
              </p>
            </Link>
            <button className='btn w-full btn-default' onClick={() => addProductCart(props)}>Add cart</button>            </div>
        </div>
      </div>
    </div>

  )
}

export default ProductCard