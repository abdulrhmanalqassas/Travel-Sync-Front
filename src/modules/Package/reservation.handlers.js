import { instance } from "../../network/axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const confirmed = () =>
  toast.success("The reservation confirmed successfully.");

async function Reserve(setIsLoading, values) {
  const cookie = Cookies.get("auth-token-data");
  const token = JSON.parse(cookie ? cookie : "null")?.token;
  setIsLoading(true);
  try {
    let data = await instance.post(`/api/reservations/custom-package`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data?.status === 201) {
      confirmed();
      // callback()
    }
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
}

export { Reserve };
