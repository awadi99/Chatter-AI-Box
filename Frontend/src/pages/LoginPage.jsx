import { useState } from "react";
import TextField from "@mui/material/TextField";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mail, KeyRound } from "lucide-react";
import InputAdornment from "@mui/material/InputAdornment";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from './../../redux/slice.js'
import { showToast } from './../components/Notification_sound.jsx';
import {socket} from "../socket.js"

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // setFormData((prev)=>({...prev, [name]: value}));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await fetch("http://localhost:3000/api/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const data = await res.json();

  //     if (res.ok) {
  //       toast.success(data.msg || "Signup successful!");
  //       setFormData({
  //         email: "",
  //         password: "",
  //       });
  //     } else {
  //       // If server sends a custom error message
  //       toast.error(data.msg || "Signup failed. Please try again.");
  //   }

  //   } catch (err) {
  //     console.error("Signup error:", err);
  //     toast.error("Server error, please try again later.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData, {
        withCredentials: true
      }
      );

      localStorage.setItem("user", JSON.stringify(res.data));
      dispatch(login(res.data));
      socket.connect();
      showToast("Login successful!","success", {
        onClose: () => navigate("/"),
      });
      setFormData({
        email: "",
        password: "",
      });
    } catch (err) {
      console.error("Login error ", err);
      showToast(err.response?.data?.msg || "Invalid Credentials.","error");    }
  };
  return (
    <div className="animate-border container w-auto p-12 md:p-12 flex justify-between items-center flex-wrap rounded-2xl z-10 bg-slate-950">
      <div className="w-full relative max-w-6xl flex flex-col md:flex-row h-auto">

        {/* Left Section (Image) */}
        <div className="w-full md:w-1/2 p-12 md:p-12 flex items-center justify-center md:border-r border-gray-600/50">
          <div className="w-full max-w-md">
            <img
              src="/img/signup.png"
              alt="Chat Illustration"
              className="bg-cover w-full min-h-130 rounded-2xl opacity-90 hover:opacity-100 transition duration-500"
            />
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="w-full md:w-1/2 p-10 md:p-10 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <img src="/img/icon/icon-removebg-preview.png" className="animate-bounce w-20 h-20 m-auto text-slate-400 mt-10 mb-7 "alt="" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-7">
                Welcome Back
              </h2>
              <p className="text-slate-500 text-[18px] md:text-[22px]">
                Login to access your account
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <TextField
                id="email"
                label="Email"
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
                <button className="animate-border btn glass w-full h-11" type="submit">
                  Sign In
                </button>

                <div className="animate-pulse border border-violet-500 text-violet-400 text-sm font-medium px-3 py-2 rounded-2xl text-center w-full">
                  <Link to="/signup">Don't have an account? Sign Up</Link>
                </div>
              </div>
            </form>

            <ToastContainer
              position="top-center"
              autoClose={2000}
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
      </div>
    </div>

  );
}
