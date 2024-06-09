import {toast} from "react-toastify";

export const errorMessage = (toastMessage: string) => toast.error(toastMessage);
export const notifyMessage = (toastMessage: string) => toast(toastMessage);
export const successMessage = (toastMessage: string) => toast.success(toastMessage);
