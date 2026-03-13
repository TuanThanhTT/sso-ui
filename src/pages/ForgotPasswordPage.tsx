import "../styles/global.css";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dthuLogo from "../assets/DTHU.png";
import ModernAlert from "../components/ModernAlert";

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

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setAlert(null);

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/password/request-reset`,
        username,
        {
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
          },
        }
      );

      setAlert({
        message: "Nếu tài khoản tồn tại, email đã được gửi.",
        type: "success",
      });
    } catch {
      setAlert({
        message: "Có lỗi xảy ra. Vui lòng thử lại.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[var(--background)] flex items-center justify-center p-4 overflow-hidden">

      {/* Background Layer */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(var(--primary)_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full blur-3xl" style={{ background: 'var(--primary)', opacity: 0.4 }} />
        <div className="absolute -bottom-40 right-[-200px] w-[700px] h-[400px] rounded-full blur-3xl" style={{ background: 'var(--secondary)', opacity: 0.4 }} />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative w-full max-w-6xl bg-[var(--card)]/80 backdrop-blur-xl rounded-3xl shadow-[var(--shadow)] border border-[var(--border)] overflow-hidden grid grid-cols-1 md:grid-cols-2"
      >
        {/* LEFT BRAND */}
        <motion.div
          variants={itemVariants}
          className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-white p-12"
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

        {/* RIGHT FORM */}
        <motion.div
          variants={itemVariants}
          className="p-8 md:p-12 flex flex-col justify-center"
        >
          <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text)' }}>
            Quên mật khẩu
          </h3>

          {alert && (
            <ModernAlert
              message={alert.message}
              type={alert.type}
              onClose={() => setAlert(null)}
            />
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>
              Tên đăng nhập hoặc Email
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập username hoặc email..."
              className="w-full border border-[var(--border)] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            disabled={loading}
            onClick={handleSubmit}
            className="w-full bg-[var(--primary)] hover:bg-[var(--secondary)] text-white font-semibold py-3 rounded-xl transition disabled:bg-gray-400"
          >
            {loading ? "Đang gửi..." : "Gửi yêu cầu"}
          </motion.button>

          <p className="text-center text-sm mt-6" style={{ color: 'var(--text)' }}>
            Nhớ mật khẩu?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[var(--primary)] font-semibold cursor-pointer hover:underline"
            >
              Đăng nhập
            </span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}