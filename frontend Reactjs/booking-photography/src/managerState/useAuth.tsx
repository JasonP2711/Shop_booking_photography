/////////////////////////////////////////////////////////////////

import { create } from "zustand";
import axios from "axios";
import { devtools } from "zustand/middleware";
import { persist, createJSONStorage } from "zustand/middleware";
import { useNavigate } from "react-router-dom";
const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";
interface isLogin {
  email: string;
  password: string;
}

export const UseAuth = create((set: any, get: any) => {
  return {
    auth: null,
    Login: async ({ email, password }: isLogin) => {
      console.log(email, password);
      try {
        console.log("here!", email, password);
        const loginEmployee = await axios.post(`${URL_ENV}/employee/login`, {
          EmployeeEmail: email,
          password: password,
        });
        if (!loginEmployee) {
          console.log("failure");
        }
        console.log("tk: ", loginEmployee.data);
        const employeeUser = await axios.patch(
          `${URL_ENV}/employee/loginToken/${loginEmployee.data.resultId}`,
          {
            refreshToken: loginEmployee.data.refreshToken,
          }
        );

        set({ auth: loginEmployee.data }, false, {
          type: "auth/login-success",
        });
        if (loginEmployee.data.payload._id) {
        }
      } catch (err) {
        console.log("looix");
        alert("Incorrect password");
      }
    },
  };
});
