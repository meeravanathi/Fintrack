import { useState } from "react";

type ToastProps = {
  title: string;
  description?: string;
};

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = ({ title, description }: ToastProps) => {
    const newToast = { title, description };
    setToasts((prev) => [...prev, newToast]);

    // Auto-clear after 3 seconds (optional)
    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3000);
  };

  return {
    toast,
    toasts, // Optional, if you want to render them manually
  };
}
