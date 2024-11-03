import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const showError = (errorMsg) => {
  toast.error(errorMsg, {
    position: "top-right",
    theme: "light",
    toastId: "toastError",
    closeOnClick: true,
  });
};

export const showSuccess = (successMsg) => {
  toast.success(successMsg, {
    position: "top-right",
    theme: "light",
    toastId: "toastSuccess",
    closeOnClick: true,
  });
};

export const showPending = (loadingMsg) => {
  toast.loading(loadingMsg, {
    position: "top-right",
    theme: "light",
    toastId: "toastPending",
    closeOnClick: true,
  });
};

export const removePending = () => {
  toast.dismiss({ id: "toastPending" });
};
