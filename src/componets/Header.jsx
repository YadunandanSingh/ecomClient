import React from "react"
import { useState, useEffect, useMemo } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../Features/auth/authSlice"; // adjust path if needed
import { useNavigate } from "react-router-dom";
import { getUser , addCart} from '../Features/auth/authSlice/'
import Cart from "./Cart";
import img1 from '../assets/images/category1.png'
import img2 from '../assets/images/category2.png'




export default function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    
    const { isAuthenticated, isAdmin ,cart,user} = useSelector((state) => state.auth)
    
    useEffect(() => {
        dispatch(getUser());
        
    }, [isAuthenticated, isAdmin, dispatch])
    const onLogout = () => {

        dispatch(logout());
        dispatch(reset());
        navigate("/login"); // redirect to login page
    };


    const [open, setOpen] = useState(false)

    // Example items; replace with your own cart state
    const items = useMemo(
        () => [
            { image: img1,title: "Vintage Tee", price: 24.99, qty: 1, variant: "Black / M" },
            { image: img2,title: "Canvas Tote", price: 18.5, qty: 2, variant: "Natural" },
        ],
        [],
    )
    const itemCount = cart.reduce((sum, it) => sum + (it.qty || 1), 0)


    return (
        <>

            <div className="top-strip">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 user">
                            {isAdmin && isAuthenticated ? <p>
                                Welcome Admin
                            </p> : <p>
                                Welcome to Delicio
                            </p>}

                        </div>
                        <div className="col-md-6 language">
                            <ul>
                               
                               
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Cart open={open} onClose={() => setOpen(false)} items={cart} />
            <div className=" header ">
                <nav id="myNavbar" className="navbar navbar-default" role="navigation">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link to="/"><img src="images/logo.png" alt="logo" /></Link>
                        </div>

                        <div className=" navbar-collapse  in" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li className="active"> <Link to="/">Home</Link></li>

                                <li>  <Link to="/products">products</Link></li>
                                  {isAdmin && isAuthenticated  ?<><li><Link to="/admin">Admin</Link></li>  <li> <Link to="/account">Profile</Link></li></> : isAuthenticated ?  <li>  <Link to="/account">Profile</Link></li> : null} 
                                
                               
                                
                                {/* <li className="dropdown">
                                    <a href="#" data-toggle="dropdown" className="dropdown-toggle">Dropdown</a>
                                    <ul className="dropdown-menu">
                                        <li><a href="#">Lorem</a></li>
                                        <li><a href="#">Ipsum</a></li>
                                        <li><a href="#">Dolor sit amet</a></li>
                                        <li><a href="#">Dropdown</a></li>
                                    </ul>
                                </li> */}
                                {/* <li><a href="about.html">About us</a></li> */}
                                {/* <li><a href="contact.html">Contact</a></li> */}
                                <li>   {isAuthenticated ? <a><button onClick={onLogout} className="text-white">Logout</button> </a>: <Link to="/login" > Login </Link>}
</li>

 <li>
                                    {/* cart button */}
                                    <button
                                        onClick={() => isAuthenticated ? setOpen(true) : alert('Please login to view cart')}
                                        aria-label="Open cart"
                                        className="relative inline-flex items-center justify-center rounded-md border px-3 py-2 hover:bg-muted border-gray-500"
                                    >
                                        {/* Cart icon */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 24 24"
                                            fill="black"
                                            aria-hidden="true"
                                        >
                                            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2ZM7.16 14h9.45c.84 0 1.57-.52 1.86-1.3l2.6-6.77A1 1 0 0 0 20.15 4H6.21L5.27 2H2v2h2.23l3.84 8.14-1.45 2.62C6.23 15.37 6.54 16 7.16 16H20v-2H7.97l.69-1.25Z" />
                                        </svg>
                                        {/* Badge */}
                                        <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-foreground px-1.5 py-0.5 text-center text-[11px] font-semibold leading-none text-background text-white">
                                            {isAuthenticated == false ? '0':itemCount}
                                        </span>
                                    </button>
                                </li>

                            </ul>
                        </div>

                    </div>
                </nav>
            </div>

        </>
    )
}
