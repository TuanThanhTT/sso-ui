import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  message: string;
  type?: "success" | "error";
  duration?: number;
  onClose?: () => void;
}

export default function ModernAlert({
  message,
  type = "success",
  duration = 4000,
  onClose,
}: Props) {
  const isSuccess = type === "success";
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = 50;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          onClose?.();
          return 0;
        }
        return prev - step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`relative mb-6 px-5 py-4 rounded-xl text-sm font-medium flex items-start gap-3 shadow-lg border backdrop-blur-md
          ${isSuccess
              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
              : "bg-red-50 border-red-200 text-red-700"
            }`}
        >
          {/* Icon */}
          <div className="text-lg mt-0.5">
            {isSuccess ? "✓" : "⚠"}
          </div>

          {/* Message */}
          <div className="flex-1">{message}</div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-sm"
          >
            ✕
          </button>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-transparent">
            <motion.div
              className={`h-full ${isSuccess ? "bg-emerald-400" : "bg-red-400"
                }`}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.05 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}