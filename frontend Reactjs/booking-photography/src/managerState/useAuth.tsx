import { create } from "zustand";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";
interface islogin {
  email: string;
  password: string;
}
const useAuth = create((set: any, get: any) => {
  const navigate = useNavigate();
  return {
    auth: null,
    login: async ({ email, password }: islogin) => {
      try {
        const loginEmployee = await axios.post(`${URL_ENV}/employee/login`, {
          EmployeeEmail: email,
          password: password,
        });
        if (!loginEmployee) {
          console.log("failed!!");
        }
        await axios.patch(
          `${URL_ENV}/employee/${loginEmployee.data.resultId}`,
          {
            refreshToken: loginEmployee.data.refreshToken,
          }
        );
        set({ auth: loginEmployee.data.payload }, false, {
          type: "auth/login-success",
        });
        if (loginEmployee.data.payload._id) {
          //code
          navigate("/");
        }
      } catch {}
    },
  };
});

export { useAuth };
