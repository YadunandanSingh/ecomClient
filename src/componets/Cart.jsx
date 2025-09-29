import React from 'react'
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { logout, reset, addCart, updateCartQuntity,removeCartItem } from "../Features/auth/authSlice"; // adjust path if needed
import { Link } from 'react-router-dom';

function Cart({ open, onClose, items = [] }) {
  const dispatch = useDispatch()
  const { isAuthenticated, isAdmin, cart, user } = useSelector((state) => state.auth)

  const panelRef = useRef(null)
  const closeButtonRef = useRef(null)


  useEffect(() => {
    if (open && closeButtonRef.current) {
      closeButtonRef.current.focus()
    }
  }, [open])

  // Close on Escape key
  useEffect(() => {
    if (!open) return
    function onKeyDown(e) {
      if (e.key === "Escape") onClose?.()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, onClose])

  const subtotal = items.reduce((sum, it) => sum + (it.price || 0) * (it.quantity || 1), 0)

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
  return (
    <div>
      <div aria-hidden={!open} className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
        {/* Overlay */}
        <div
          onClick={onClose}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        />

        {/* Slide-over Panel (right to left) */}
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-title"
          ref={panelRef}
          className={`absolute bg-white inset-y-0 right-0 flex w-full sm:max-w-sm md:max-w-md transform transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="ml-auto flex h-full w-full flex-col bg-background text-foreground shadow-xl">
            {/* Header */}
            <header className="flex items-center justify-between border-b p-4">
              <h2 id="cart-title" className="text-lg font-semibold text-pretty">
                Your Cart
              </h2>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close cart"
                className="inline-flex items-center justify-center rounded-md border px-2.5 py-1.5 text-sm hover:bg-muted"
              >
                {/* X icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <p className="text-sm text-muted-foreground">Your cart is empty.</p>
              ) : (
                <ul className="space-y-4">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>

                        <th scope="col">Quantity</th>

                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    {items.map((item, idx) => (
                      <tbody>
                        {/* Make sure heroSlides is not empty before mapping */}


                        <tr key={item.productId}>
                          <td>
                            <img
                              src={import.meta.env.VITE_API_URL + `${item.imagePath}`}
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

                      </tbody>
                      // <li key={idx} className="flex gap-3">
                      //   <img
                      //     src={item.image}
                      //     alt={item.title ? `Image of ${item.title}` : "Product image"}
                      //     className="h-16 w-16 rounded border object-cover"
                      //   />
                      //   <div className="flex-1">
                      //     <div className="flex items-start justify-between gap-2">
                      //       <h3 className="text-sm font-medium leading-6">{item.title || "Product"}</h3>
                      //       <span className="text-sm font-semibold">
                      //         ${((item.price || 0) * (item.qty || 1)).toFixed(2)}
                      //       </span>
                      //     </div>
                      //     <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      //       <span>Qty: {item.qty || 1}</span>
                      //       {item.variant ? <span className="inline-block">• {item.variant}</span> : null}
                      //     </div>
                      //   </div>
                      // </li>
                    ))}
                  </table>
                </ul>
              )}
            </div>

            {/* Footer */}
            <footer className="border-t p-4">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex gap-2">
                <Link to='/checkout'
                  className="flex-1 border m-2 border-black rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90"
                
                >
                  Checkout
                </Link>
                <button
                  className="flex-1 rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
                  onClick={onClose}
                >
                  Continue Shopping
                </button>
              </div>
            </footer>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Cart