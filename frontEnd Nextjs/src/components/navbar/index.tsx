import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Style from "./navbarStyle.module.css";
import { Button, message } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { userAuth } from "@/managerState/userAuth";
import { URL_ENV } from "@/constant/URL";

type Props = {};

function Page({}: Props) {
  const router = useRouter();
  const [turnOn, setTurnOn] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const { auth } = userAuth((state: any) => state);
  const { logout } = userAuth((state: any) => state);

  const E_URL = `${URL_ENV}/customer/${auth?.payload?._id}`;

  // console.log("auth: ", auth);
  useEffect(() => {
    if (auth?.payload?._id) setUser(auth?.payload?._id);
    else {
      setUser(null);
    }
  }, [E_URL]);
  // console.log("user: ", user);
  const clickMenu = () => {
    // console.log(turnOn, responsive);
    if (turnOn) {
      setTurnOn(false);
    } else {
      setTurnOn(true);
    }
  };

  const handleNavigation = (path: any) => {
    router.push(path);
  };
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("token");
    // console.log("token: ", token);
  }
  return (
    <>
      <div className={Style.nav}>
        <div className={Style.title} onClick={() => handleNavigation("/")}>
          Tiệm Ảnh
        </div>
        <Button
          className={Style.icon__menu}
          icon={<MenuOutlined />}
          onClick={clickMenu}
        ></Button>
        <ul className={turnOn ? Style.navbar_mobile : Style.navbar}>
          <li
            onClick={() => {
              handleNavigation("/");
            }}
          >
            Home
          </li>

          <li
            onClick={() => {
              if (auth) handleNavigation("/booking");
              else {
                message.warning("Vui lòng đăng nhập !!", 2.5);
                handleNavigation("/login");
              }
            }}
          >
            Liên hệ - Đặt lịch
          </li>
          <li>
            Các dịch vụ
            <ul className={Style.submenu1}>
              <li
                onClick={() => {
                  handleNavigation("/photoPackage/6481fd73d5638359880f4f58");
                }}
              >
                đơn/đôi
              </li>
              <li
                onClick={() => {
                  handleNavigation("/photoPackage/653dee6d5045843a548644b4");
                }}
              >
                Tiệc cưới
              </li>
              <li
                onClick={() => {
                  handleNavigation("/photoPackage/6485bff25570ad344f1a9082");
                }}
              >
                Sự kiện - hội nghị
              </li>
              <li
                onClick={() => {
                  handleNavigation("/photoPackage/6485c0365570ad344f1a9084");
                }}
              >
                Kỷ yếu tập thể
              </li>
              <li
                onClick={() => {
                  handleNavigation("/photoPackage/6485c07d5570ad344f1a9086");
                }}
              >
                Quảng cáo
              </li>
              <li
                onClick={() => {
                  handleNavigation("/photoPackage/6485c0fc5570ad344f1a9088");
                }}
              >
                Tour du lịch
              </li>
            </ul>
          </li>
          {user && (
            <>
              <li
                onClick={() => {
                  handleNavigation("/account");
                }}
              >
                Cá nhân
              </li>
              <li
                onClick={() => {
                  logout();
                  setUser(null);
                  message.info("Logout success!");
                  handleNavigation("/login");
                }}
              >
                Đăng xuất
              </li>
            </>
          )}
          {user === null && (
            <>
              <li
                onClick={() => {
                  handleNavigation("/login");
                }}
              >
                Đăng nhập
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default Page;
