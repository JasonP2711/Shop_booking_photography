import React, { useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { URL_ENV } from "@/constant/URL";
import { useRouter } from "next/router";
import style from "./style.module.css";
import Brand from "@/components/brand/page";
import Quality from "@/components/Quality/index";

// const URL_ENV = "http://localhost:9000";

type Props = {
  dataPackage: any;
};

export default function PhotoPackage({ dataPackage }: Props) {
  console.log("anh package: ", `${URL_ENV}${dataPackage?.results?.imageUrl}`);
  const router = useRouter();
  console.log("data: ", dataPackage);
  return (
    <>
      <div
        style={{
          paddingTop: "50px",
          background: "white",
          position: "relative",
        }}
      >
        <div>
          <Image
            src={`${URL_ENV}${dataPackage?.results?.imageUrl}`}
            alt="My Image"
            width={500}
            height={300}
            style={{
              width: "100%",
              height: "40rem",
              opacity: "0.6",
              objectFit: "cover",
            }}
          />
          <span className={style.title_bg}>{dataPackage.results.package}</span>
          <button
            className={style.button_bg}
            onClick={() => router.push("/booking")}
          >
            Đặt lịch
          </button>
        </div>

        <div className={style.list_img}>
          {dataPackage?.results?.listImg.map((item: string, index: number) => {
            return (
              <Image
                key={index}
                alt=""
                width={290}
                height={300}
                src={`${URL_ENV}${item}`}
                style={{ marginLeft: "1px", marginTop: "1%" }}
              ></Image>
            );
          })}
        </div>
        <div className={style.container_contents}>
          <div className={style.contents}>
            {dataPackage.results.description}
          </div>

          <Image
            src={`${URL_ENV}${dataPackage?.results?.imageUrl}`}
            alt=" "
            width={350}
            height={320}
            className={style.picture}
          ></Image>
        </div>
        <div>
          <Quality />
        </div>
        <div>
          <Brand />
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const myPackage = await axios
    .get(`${URL_ENV}/photographyPackage`)
    .then((response) => {
      return response.data;
    });
  const paths = myPackage?.results?.map((items: any, index: any) => ({
    params: {
      id: `${items._id}`,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1

  const dataPackage = await axios
    .get(`${URL_ENV}/photographyPackage/${params.id}`)
    .then((response) => {
      return response.data;
    });

  return {
    props: {
      dataPackage: dataPackage,
    },
  };
}
