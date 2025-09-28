import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../Features/auth/authSlice";

function UserAccount() {
    
    const { user ,isAdmin} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
        console.log("User admin:", isAdmin);
    }, [dispatch ,isAdmin] );



    return (
        <div className="container checking-area h-screen">
            <div className="row">
                <div className="col-md-12 checkout-accordion">
                    <div className="col-md-12 bg-white">
                        <div class="panel-heading">
                             <h1 className="text-lg p-5 text-white"> User Account </h1>
                        </div>
                        <div  className="flex flex-col">
                            <div class="col-md-6 flex items-center gap-5  ">
                                <h4 className="font-bold">User Name :</h4>

                                <p class="text-amber-950 text-2xl font-bold">
                                   { user ? user.name : "Loading..." }
                                </p>
                            </div>
                             <div class="col-md-6 flex items-center gap-5  ">
                                <h4 className="font-bold">User E-mail :</h4>

                                <p class="text-amber-950 text-2xl font-bold">
                                   { user ? user.email : "Loading..." }
                                </p>
                            </div>
                             <div class="col-md-6 flex items-center gap-5  ">
                                <h4 className="font-bold">User phone number :</h4>

                                <p class="text-amber-950 text-2xl font-bold">
                                   { user ? user.phone : "Loading..." }
                                </p>
                            </div>
                             <div class="col-md-6 flex items-center gap-5  ">
                                <h4 className="font-bold">User Role :</h4>

                                <p class="text-amber-950 text-2xl font-bold">
                                   { user ? (user.role == '0'? "USER" : "Admin") : "Loading..." }
                                </p>
                            </div>
                            {/* <div class="col-md-6 check-name">
                                <h4>returning costumer</h4>
                                <div>
                                    <form class="form-horizontal" role="form">
                                        <div class="form-group">
                                            <div class="col-sm-12">
                                                <input type="email" class="form-control" placeholder="your name" />
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-sm-12">
                                                <input type="password" class="form-control" placeholder="your e-mail" />
                                            </div>
                                        </div>
                                    </form>
                                    <a href="#">forgot your pasword ?</a>
                                    <br />
                                    <a href="#"><span>Log in</span></a>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default UserAccount;
