import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import { getProduct } from '../Features/products/ProductSlice';

const ProductSection = () => {
    const dispatch = useDispatch()
    const { products } = useSelector((state) => state.Product)

    useEffect(() => {

        dispatch(getProduct())
        products
    }, [dispatch])
    


    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const sliderRef = useRef(null);

    // const products = [
    //     {
    //         imageUrl: 'https://images.unsplash.com/photo-1539840093138-9b3e230e5206?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=765a2eb222b1851840a4a157780fb487&auto=format&fit=crop&w=1534&q=80',
    //         title: 'MAYORAL SUKNJA',
    //         price: '200,00 TK',
    //         oldPrice: '1999',
    //         badge: null
    //     },
    //     {
    //         imageUrl: 'https://images.unsplash.com/photo-1524010349062-860def6649c3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e725946a3f177dce83a705d4b12019c2&auto=format&fit=crop&w=500&q=60',
    //         title: 'MAYORAL KOŠULJA',
    //         price: '800 TK',
    //         oldPrice: null,
    //         badge: null
    //     },
    //     {
    //         imageUrl: 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=04aebe9a22884efa1a5f61e434215597&auto=format&fit=crop&w=500&q=60',
    //         title: 'PANTALONE TERI 2',
    //         price: '4000,00 TK',
    //         oldPrice: '5000,00 TK',
    //         badge: '10%'
    //     },
    //     {
    //         imageUrl: 'https://images.unsplash.com/photo-1531925470851-1b5896b67dcd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=91fe0ca1b5d72338a8aac04935b52148&auto=format&fit=crop&w=500&q=60',
    //         title: 'CVETNA HALJINA',
    //         price: '4000,00 RSD',
    //         oldPrice: null,
    //         badge: null
    //     },
    //     {
    //         imageUrl: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=74065eec3c2f6a8284bbe30402432f1d&auto=format&fit=crop&w=500&q=60',
    //         title: 'MAJICA FOTO',
    //         price: '40,00 TK',
    //         oldPrice: null,
    //         badge: null
    //     },
    //     {
    //         imageUrl: 'https://images.unsplash.com/photo-1532086853747-99450c17fa2e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=61a42a11f627b0d21d0df757d9b8fe23&auto=format&fit=crop&w=500&q=60',
    //         title: 'MAJICA MAYORAL',
    //         price: '100,00 TK',
    //         oldPrice: null,
    //         badge: null
    //     },
    // ];

    // Calculate visible products based on screen size
    const getVisibleCount = () => {
        if (typeof window === 'undefined') return 4;
        const width = window.innerWidth;
        if (width < 640) return 1;
        if (width < 768) return 2;
        if (width < 1024) return 3;
        return 4;
    };

    const [visibleCount, setVisibleCount] = useState(getVisibleCount());

    useEffect(() => {
        const handleResize = () => {
            setVisibleCount(getVisibleCount());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            setActiveIndex((current) =>
                (current + 1) % (products.length - visibleCount + 1)
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [isHovered, products.length, visibleCount]);

    const handlePrev = () => {
        setActiveIndex((current) =>
            current === 0 ? products.length - visibleCount : current - 1
        );
    };

    const handleNext = () => {
        setActiveIndex((current) =>
            (current + 1) % (products.length - visibleCount + 1)
        );
    };

    // Calculate the transform value for the slider
    const getTransformValue = () => {
        // For mobile, each item takes full width
        if (visibleCount === 1) {
            return `-${activeIndex * 100}%`;
        }
        // For other screen sizes
        return `-${activeIndex * (100 / visibleCount)}%`;
    };

    return (
        <>
            {/* Product Slider Header */}

            <div className=" mx-auto">
                <div className="flex flex-wrap" id="slider-text">
                    <div className="w-full overflow-hidden">
                        <Link to='products'>
                            <h2 className="font-normal text-white text-3xl tracking-widest my-8 pl-10 relative after:content-[''] after:absolute after:bottom-[35px] after:w-full after:border-t-2 after:border-gray-300">
                                NEW COLLECTION
                            </h2>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Item Slider */}
            <div className=" mx-auto px-4">
                <div className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    ref={sliderRef}
                >
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(${getTransformValue()})` }}
                        >
                            {products.map((product, index) => (
                                <div
                                    key={index}
                                    className={`flex-none p-2 ${visibleCount === 1 ? 'w-full' :
                                        visibleCount === 2 ? 'w-1/2' :
                                            visibleCount === 3 ? 'w-1/3' : 'w-1/4'
                                        }`}
                                >
                                    <ProductCard Category={product.Category}
                                        Discont_Price={product.Discont_Price}
                                        brand={product.brand}
                                        discription={product.discription}
                                        imagePath={product.imagePath}
                                        name={product.name}
                                        price={product.price}
                                        quantity={product.quantity}
                                        id={product._id} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Slider Controls */}
                    <div className="flex justify-between absolute top-1/2 -translate-y-1/2 w-full -mx-2">
                        <button
                            className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
                            onClick={handlePrev}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
                            onClick={handleNext}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <br />
            <br />


        </>
    );
};

export default ProductSection;


