import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProduct } from '../Features/products/ProductSlice';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../componets/ProductCard';

function ProductList() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;


    const dispatch = useDispatch()
    const { products } = useSelector((state) => state.Product)

    useEffect(() => {

        dispatch(getProduct())

    }, [dispatch])
    const { id } = useParams()
    console.log('fatch product', id, products)


    window.scrollTo({
        top: 0,

        behavior: 'smooth'
    });


    const Filtered_Category_Products = products.filter(
        (product) => id ? product.Category && product.Category.toLowerCase() == id.toLowerCase() : product.Category && product.Category.toLowerCase() == product.Category.toLowerCase()
    );

    const currentProducts = Filtered_Category_Products.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(Filtered_Category_Products.length / itemsPerPage);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    console.log('Filtered_Category_Products', Filtered_Category_Products);



    return (
        <>
            <div class="page-title">
                <div class="container">
                    <div class="row">
                        <div class="col-md-10 produti">
                            <h4>{id ? id : 'All Products'}</h4>
                        </div>
                        <div class="col-md-2 cart">
                            <h4><a href="#">chart (2 items)</a></h4>
                            <ul>
                                <li><a href="#">home /</a></li>
                                <li><a href="#">products</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="row content">
                    <div class="col-md-9 shop-section">
                        <div class="row">
                            <div class="col-md-12 latest">
                                <h4 class="pull-left">latest first</h4>
                                <ul class="pagination-list pull-right">
                                    {/* Pagination Controls */}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                                        <button key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
                                            <li>
                                                <a class=" m-1">
                                                    {pageNumber}
                                                </a>
                                            </li>
                                        </button>
                                    ))}

                                </ul>
                            </div>

                        </div>

                        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>

                            {currentProducts.map((product) => (
                                <ProductCard key={product.id} Category={product.Category}
                                    Discont_Price={product.Discont_Price}
                                    brand={product.brand}
                                    discription={product.discription}
                                    imagePath={product.imagePath}
                                    name={product.name}
                                    price={product.price}
                                    quantity={product.quantity}
                                    id={product._id} />
                            ))}
                            {Filtered_Category_Products.length === 0 && (
                                <p>No products found for this category.</p>
                            )}
                        </div>
                    </div>

                    <div class="col-md-3 shop-sidebar">
                        <div class="sidebar-widgets">
                            <div class="shop-widget">
                                <h4>Price selector</h4>
                                <div class="price-range">

                                    <div class="noUiSlider">
                                    </div>
                                    <input type="text" id="start-val" />
                                    <input type="text" id="end-val" />
                                </div>
                            </div>
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
        </>
    )
}

export default ProductList