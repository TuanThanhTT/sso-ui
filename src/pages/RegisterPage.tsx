
import "../styles/global.css";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dthuLogo from "../assets/DTHU.png";

// ================= VARIANTS =================

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// ================= COMPONENT =================

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/Auth/register`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
          },
        }
      );

      setMessage("Đăng ký thành công! Vui lòng đăng nhập.");
      setForm({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
      });

      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setMessage("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4 overflow-hidden">

      {/* ===== MODERN BACKGROUND LAYER ===== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-blue-200/40 blur-3xl rounded-full" />
        <div className="absolute -bottom-40 right-[-200px] w-[700px] h-[400px] bg-indigo-200/40 blur-3xl rounded-full" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative w-full max-w-6xl 
        bg-white/80 backdrop-blur-xl
        rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.12)]
        border border-white/60
        overflow-hidden grid grid-cols-1 md:grid-cols-2"
      >
        {/* ================= LEFT BRAND ================= */}
        <motion.div
          variants={itemVariants}
          className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-12"
        >
          <motion.img
            src={dthuLogo}
            alt="Logo"
            className="w-80 h-80 object-contain drop-shadow-2xl mb-6"
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 250 }}
          />

          <h2 className="text-3xl font-bold text-center mb-3">
            Tra cứu văn bằng
          </h2>

          <p className="text-blue-100 text-center max-w-sm">
            Hệ thống tra cứu văn bằng / chứng chỉ
          </p>
          <p className="text-blue-100 text-center max-w-sm">
            Trường Đại học Đồng Tháp
          </p>
        </motion.div>

        {/* ================= RIGHT FORM ================= */}
        <motion.div
          variants={itemVariants}
          className="p-8 md:p-12 flex flex-col justify-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Đăng ký tài khoản
          </h3>

          {message && (
            <div className="mb-4 text-sm text-blue-600 bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg text-center">
              {message}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              name="username"
              placeholder="Tên đăng nhập"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="firstName"
                placeholder="Họ"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="lastName"
                placeholder="Tên"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <input
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="Mật khẩu"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-blue-600"
              >
                {showPass ? "Ẩn" : "Hiện"}
              </button>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              disabled={loading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:bg-gray-400"
            >
              {loading ? "Đang đăng ký..." : "Đăng ký"}
            </motion.button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Đã có tài khoản?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
            >
              Đăng nhập
            </span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}