import React from "react";
import Image from "next/image";
import { Card } from "antd";
import Style from "./style.module.css";
import { URL_ENV } from "@/constant/URL";
import {
  FacebookFilled,
  InstagramFilled,
  TwitterSquareFilled,
} from "@ant-design/icons";

// const URL = "http://localhost:9000" || process.env.API_BE_URL;

type Props = {
  data: {
    firstName: string;
    lastName: string;
    position: string;
    imageUrl: string;
  }[];
};

function CardMember({ data }: Props) {
  return (
    <>
      {data &&
        data?.map((item, index) => {
          return (
            <>
              <Card
                style={{ width: 300 }}
                key={index}
                className={Style.item__card}
              >
                <Image
                  src={`${URL_ENV}${item?.imageUrl}`}
                  alt="My Image"
                  width={250}
                  height={200}
                  // style={{ width: "500", height: "300" }}
                  className={Style.obj__img}
                />
                <span className={Style.name__title}>
                  {item.firstName} {item.lastName}
                </span>
                <span className={Style.name__position}>{item.position}</span>
                <div className={Style.social__icon}>
                  <i>
                    <FacebookFilled />
                  </i>
                  <i>
                    <InstagramFilled />
                  </i>
                  <i>
                    <TwitterSquareFilled />
                  </i>
                </div>
              </Card>
            </>
          );
        })}
    </>
  );
}

export default CardMember;
