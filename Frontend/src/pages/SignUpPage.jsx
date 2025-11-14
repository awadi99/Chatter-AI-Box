import { useState } from 'react';
import TextField from '@mui/material/TextField'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MessageCircleDashed, User, Mail, KeyRound } from 'lucide-react'
import InputAdornment from '@mui/material/InputAdornment';
import { Link } from 'react-router'
import { useDispatch } from 'react-redux';
import { login } from './../../redux/slice.js'
import { useNavigate } from 'react-router';
import { showToast } from '../components/Notification_sound.jsx';


export default function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // setFormData((prev)=>({...prev, [name]: value}));
  }

  // const handleSubmit = async (e) => {

  //   e.preventDefault();
  //   //   if (formData.password.length < 6) {
  //   //    toast.error("Password must be at least 6 characters");
  //   //  }
  //   //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   //   if (!emailRegex.test(formData.email)) {
  //   //       toast.error("Please provide a valid email" );
  //   //   }

  //   try {
  //     const res = await axios.post("http://localhost:3000/api/auth/signup", formData);
  //     toast.success(res.data.msg || "Signup successful!")
  //     setFormData({
  //       fullName: "",
  //       email: "",
  //       password: ""
  //     });
  //   } catch (err) {
  //     console.error("Signup error:", err);

  //     // if server sent error message (like "Email already exists")
  //     if (err.response && err.response.data && err.response.data.msg) {
  //       toast.error(err.response.data.msg);
  //     }
  //     // for network or unknown error
  //     else {
  //       toast.error("Server error, please try again later.");
  //     }
  //   }
  // }


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data));

        showToast( data.msg||"Signup successful!","success", {

          onClose: () => navigate("/"),
        });
        dispatch(login(data));
        setFormData({
          fullName: "",
          email: "",
          password: "",
        });


      } else {
        // If server sends a custom error message
        showToast(data.msg || "Signup failed. Please try again.","error");
      }

    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Server error, please try again later.");
    }
  };

  return (

    <div
      className="animate-border container w-auto p-6 md:p-10 flex justify-between items-center flex-wrap rounded-2xl z-10 bg-slate-950"
    >
      <div className="w-full relative max-w-6xl flex flex-col md:flex-row h-auto">
        {/* Left Section (Form) */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex items-center justify-center md:border-r border-gray-600/50">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <MessageCircleDashed className="animate-bounce w-12 h-12 m-auto text-slate-400 mt-10 mb-7" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-7">
                Create Account
              </h2>
              <p className="text-slate-500 text-[18px] md:text-[22px]">
                Sign up for a new account
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <TextField
                id="fullName"
                label="Name"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                name="fullName"
                variant="outlined"
                margin="normal"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <User size={20} color="white" className="animate-pulse" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white", borderRadius: "1rem" },
                    "&:hover fieldset": { borderColor: "#a855f7" },
                    "&.Mui-focused fieldset": { borderColor: "#7c3aed" },
                  },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#a855f7" },
                }}
              />

              {/* Email */}
              <TextField
                id="email"
                label="Email"
                type='email'
                value={formData.email}
                onChange={handleChange}
                placeholder="JohnDoe@gmail.com"
                name="email"
                variant="outlined"
                margin="normal"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={20} color="white" className="animate-pulse" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white", borderRadius: "1rem" },
                    "&:hover fieldset": { borderColor: "#a855f7" },
                    "&.Mui-focused fieldset": { borderColor: "#7c3aed" },
                  },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#a855f7" },
                }}
              />

              {/* Password */}
              <TextField
                id="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="************"
                name="password"
                variant="outlined"
                margin="normal"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyRound size={20} color="white" className="animate-pulse" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white", borderRadius: "1rem" },
                    "&:hover fieldset": { borderColor: "#a855f7" },
                    "&.Mui-focused fieldset": { borderColor: "#7c3aed" },
                  },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#a855f7" },
                }}
              />

              <div className="flex flex-col mt-8 space-y-4">
                <button
                  className="animate-border btn glass w-full h-11"
                  type="submit"
                >
                  Create Account
                </button>

                <div className="animate-pulse border border-violet-500 text-violet-400 text-sm font-medium px-3 py-2 rounded-2xl text-center w-full">
                  <Link to="/login">Already have an account? Sign In</Link>
                </div>


              </div>
            </form>

            <ToastContainer
              position="top-center"
              autoClose={2500}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition={Zoom}
            />
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="w-full md:w-1/2 flex justify-center items-center mt-6 md:mt-0">
          <img
            src="/img/login.png"
            alt="Chat Illustration"
            className="w-full h-auto rounded-2xl opacity-90 hover:opacity-100 transition duration-500"
          />
        </div>
      </div>
    </div>


  )
}
