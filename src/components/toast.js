import toast from "react-hot-toast";

export const notify = (msg) => {
  toast(msg);
  toast.success("Test notification");
};
