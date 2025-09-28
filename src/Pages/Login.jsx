import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { login, reset } from "../Features/auth/authSlice.js"

import { Eye, EyeOff } from "lucide-react"
import { Link } from "react-router-dom"
import axios from "axios"

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const { user, isLoading, isError, isSuccess, message,token } = useSelector(
    (state) => state.auth
  )
 const handleSubmit = async (e) => {
    e.preventDefault()
    // setIsLoading(true)
    // setError("")


    try {

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Basic validation
      if (!formData.email || !formData.password) {
        setError("Please fill in all required fields.")
        return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address.")
        return
      }



      // const response = await axios.post("http://localhost:8000/user/login", formData)
      // console.log(response.data)
      // Clear form after success
      dispatch(login(formData))
      if (isError) {
        setError(message || "Login failed. Please try again.")
        return
      }

      setError(message)
      if (isSuccess || user) {
        navigate("/")
      }
      console.log("Form submitted:", formData)
      setFormData({

        email: "",

        password: "",
      })
     



    } catch (err) {
      console.error(err)
      setError(message || "An error occurred. Please try again.")
    }
  }
  useEffect(() => {
    if(isSuccess ){
      navigate("/")
    }
    if (isError) {
      setError(message)
      // console.log(message)
    }

    

    // Reset the state on component unmount or when dependencies change
    return () => {

      dispatch(reset())
    }
  }, [user, isError, isSuccess, message, navigate, dispatch,handleSubmit])


  const [showPassword, setShowPassword] = useState(false)
  // const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

 

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="container">
      <div className="row content flex justify-center">
        <div className="col-md-8 col-sm-12 col-xs-12">
          <div className="row contact-all">
            <div className="triggerAnimation animated" data-animate="fadeInLeft">
              <form id="contact-form" onSubmit={handleSubmit}>
                <h1>Login</h1>

                {error && <p style={{ color: "red" }}>{error}</p>}
                {/* {isError && <div className="error-message">{message}</div>} */}


                <div className="text-fields">


                  <div className="float-input">
                    <input
                      name="email"
                      id="email"
                      type="email"
                      placeholder="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <span><i className="fa fa-envelope-o"></i></span>
                  </div>



                  <div className="float-input relative">
                    <input
                      name="password"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <span><i className="fa fa-envelope-o"></i></span>
                  </div>

                  <div className="float-input">
                    <input
                      type="submit"
                      id="submit_contact"
                      className="main-button"
                      value={isLoading ? "Logging in..." : "Submit"}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <p>
                  Don’t have an account?{" "}
                  <Link to="/register">Register</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
