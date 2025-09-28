import { useState,useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { register, reset } from "../Features/auth/authSlice.js"
import { Eye, EyeOff } from "lucide-react"
import { Link } from "react-router-dom"
import axio from "axios"

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user,message,isError,isSuccess,isLoading} = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      setError(message)
      console.log(message)
    }

    if (isSuccess || user) {
      navigate("/login")
    }
  }, [user, isError, isSuccess, message, navigate, dispatch])
  const [showPassword, setShowPassword] = useState(false)
  // const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
  
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

       const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      if (!passwordRegex.test(formData.password)) {
        setError(
          "Password must be at least 8 characters long and include both letters and numbers."
        )
        return
      }
      
      
      if(!formData.password == formData.confirmPassword){
        setError("Password and Confirm Password must be same")
        return  
      }
      // const response = await axio.post("http://localhost:8000/user/Register", formData)
      // console.log("response :",response.data)
      // Basic validation
      if (!formData.name || !formData.email || !formData.password) {
        setError("Please fill in all required fields.")
        return
      }
        dispatch(register(formData))
        setError(message)
      // Clear form after success
      console.log("Form submitted:", formData)
      alert("Residter successful!")
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      })
      navigate("/login")

    } catch (err) {
      console.error(err)
      setError(err.response?.data?.msg || "An error occurred. Please try again.")
    } 
  }

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

                <div className="text-fields">

                  <div className="float-input">
                    <input
                      name="name"
                      id="name"
                      type="name"
                      placeholder="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <span><i className="fa fa-envelope-o"></i></span>
                  </div>

                  <div className="float-input">
                    <input
                      name="email"
                      id="email"
                      type="email"
                      placeholder="e-mail"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <span><i className="fa fa-envelope-o"></i></span>
                  </div>

                  <div className="float-input">
                    <input
                      name="phone"
                      id="phone"
                      type="phone"
                      placeholder="phone"
                      value={formData.phone}
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

                  <div className="float-input relative">
                    <input
                      name="confirmPassword"
                      id="confirmPassword"
                      type={showPassword ? "text" : "confirmPassword"}
                      placeholder="confirmPassword"
                      value={formData.confirmPassword}
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
                  allredy have an account?
                  <Link to="/login">login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
