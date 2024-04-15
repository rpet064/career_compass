import {toast} from "react-hot-toast";

export const errorMessage = (toastMessage: string) => toast.error(toastMessage);
export const notifyMessage = (toastMessage: string) => toast(toastMessage);
export const successMessage = (toastMessage: string) => toast.success(toastMessage);
