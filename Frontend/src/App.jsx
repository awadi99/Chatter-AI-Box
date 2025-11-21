import { Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AuthOnline from "./components/authOnline";
function App() {
  return (
    <>
    <AuthOnline/>
      <div className="min-h-screen w-full animate-gradient-diagonal flex items-center justify-center text-white text-3xl font-bold p-4 contrast-150 ">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
        <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px] " />

        <Routes>
          <Route path="/" element={<ChatPage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/signup" element={<SignUpPage />} />

        </Routes>
      </div>
    </>
  )
}
export default App;