import { create } from "zustand";
import axios from "axios";
import { axiosClient } from "@/libraries/axiosClient";
import { devtools } from "zustand/middleware";
import { persist, createJSONStorage } from "zustand/middleware";
import router from "next/router";

// const URL_ENV = "http://localhost:9000" || process.env.API_BE_URL;
// const URL_ENV = process.env.API_BE_URL;
interface isLogin {
  email: string;
  password: string;
}
export const userAuth = create(
  devtools(
    persist(
      (set: any, get: any) => {
        // console.log("URL_ENV: ", URL_ENV);
        // let loginData: any = null;
        return {
          auth: null,
          URL_ENV: "https://project-booking-photography.onrender.com",
          login: async ({ email, password }: isLogin) => {
            try {
              console.log("hjkhjk", email, password);
              console.log("as", get().URL_ENV);

              const loginUser = await axios.post(
                `${get().URL_ENV}/customer/login`,
                {
                  email: email,
                  password: password,
                }
              );
              if (!loginUser) {
                console.log("failure");
              }
              // console.log("tk: ", loginUser);
              await axios.patch(
                `${get().URL_ENV}/customer/${loginUser.data.payload._id}`,
                {
                  refreshToken: `${loginUser.data.refreshToken}`,
                }
              );
              window.localStorage.setItem("token", loginUser.data.token);
              window.localStorage.setItem(
                "refreshToken",
                loginUser.data.refreshToken
              );
              set({ auth: loginUser.data }, false, {
                type: "auth/login-success",
              });
              if (loginUser.data.payload._id) {
                router.push("/");
              }
            } catch (err) {
              console.log("looix");
              alert("Incorrect password");
            }
          },

          logout: async () => {
            const auth: any = get().auth;
            localStorage.clear();
            // loginData = null;
            await axios.patch(`${get().URL_ENV}/customer/${auth.payload._id}`, {
              refreshToken: "",
            });
            return set({ auth: null }, false, { type: "auth/logout-success" });
          },
        };
      },
      {
        name: "shopWeb-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
