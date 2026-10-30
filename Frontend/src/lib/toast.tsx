import { toast as sonnerToast, type ExternalToast } from "sonner";

type ToastOptions = ExternalToast & {
  duration?: number;
};

export function toast(message: string, options?: ToastOptions) {
  return sonnerToast(message, {
    duration: 3000,
    ...options,
  });
}

// Success notification
toast.success = (message: string, options?: ToastOptions) => {
  return sonnerToast.success(message, {
    duration: 3000,
    ...options,
  });
};

// Error notification
toast.error = (message: string, options?: ToastOptions) => {
  return sonnerToast.error(message, {
    duration: 3000,
    ...options,
  });
};

// Info notification
toast.info = (message: string, options?: ToastOptions) => {
  return sonnerToast.info(message, {
    duration: 3000,
    ...options,
  });
};

// Warning notification
toast.warning = (message: string, options?: ToastOptions) => {
  return sonnerToast.warning(message, {
    duration: 3000,
    ...options,
  });
};

// Promise-based toast for async actions
toast.promise = sonnerToast.promise;

// Dismiss all toasts
toast.dismiss = sonnerToast.dismiss;
