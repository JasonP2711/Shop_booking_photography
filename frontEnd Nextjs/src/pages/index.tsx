import { axiosClient } from "@/libraries/axiosClient";
// import { Element, scroller } from "react-scroll";
import { URL_ENV } from "@/constant/URL";
import Image from "next/image";
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import anhNen from "../pages/pexels-george-milton-7014941.jpg";
import Package1 from "../pages/chup-anh-ky-yeu-tai-SON-LA-9-1536x1024.jpg";
import Package4 from "../pages/270177061_2541293302682192_5456219052033157020_n-1.jpg";
import Package2 from "../pages/pexels-hywel-jones-2744193.jpg";
import Package3 from "../pages/pexels-riccardo-307006.jpg";
import Package5 from "../pages/pexels-rdne-stock-project-7713163.jpg";
import Package6 from "../pages/KFC-3861-1639018052.jpg";
import { useRouter } from "next/router";
import Brand from "../components/brand/page";
import Slider from "../components/slider/page";
import CardMember from "../components/CardMember/page";
import Quality from "../components/Quality/index";
import { useEffect, useState } from "react";

type Props = {
  data: any;
  staff: any;
};

// const URL_ENV = process.env.API_BE_URL;
// const URL_ENV = "http://localhost:9000" || process.env.API_BE_URL;

export default function Home({ data, staff }: Props) {
  const [scrollY, setScrollY] = useState<any>();
  const [scrollYSlider, setScrollYSlider] = useState<boolean>(false);
  const [scrollYlove, setScrollYlove] = useState<boolean>(false);
  const [scrollYmember, setScrollYmember] = useState<boolean>(false);

  const router = useRouter();
  const handleScroll = () => {
    setScrollY(window.scrollY);
    console.log("scroll: ", window.scrollY);
    if (window.scrollY >= 250 && scrollYSlider === false) {
      setScrollYSlider(true);
    }
    if (window.scrollY >= 700 && scrollYlove === false) {
      setScrollYlove(true);
    }
    if (window.scrollY >= 1500 && scrollYmember === false) {
      setScrollYmember(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.topbg}>
          <Image
            src={anhNen}
            alt="My Image"
            width={500}
            height={300}
            style={{ width: "500", height: "300" }}
            className={styles.bg_1}
          />
          <span className={styles.titleBg}>Save the memory</span>
          <span className={styles.titleBg2}>Keep soul</span>
        </div>

        <div className={styles.title}>
          <span className={styles.title1}>Welcome to TiệmẢnh studio</span>
        </div>
        <div className={styles.slider}>
          {scrollYSlider === true && (
            <>
              <div className={styles.showSlide}>
                <Slider Slidedata={data} />
              </div>
            </>
          )}
        </div>
        <div className={styles.title__2}>
          <p style={{ width: "70%", textAlign: "center" }}>
            Luôn luôn lắng nghe sự góp ý của quý khách để tự hoàn thiện mình,
            luôn tìm tòi và học hỏi thêm kinh nghiệm để sáng tạo ra những góc
            chụp đẹp
          </p>
        </div>
        <div className={styles.typePackage}>
          <div className="d-flex justify-content-center">
            <h2>Thể loại được yếu thích</h2>
          </div>
          {scrollYlove === true && (
            <>
              <div className={styles.lovePackage}>
                <div className={styles.imgPackage1}>
                  <Image
                    src={Package1}
                    alt="My Image"
                    width={450}
                    height={300}
                    onClick={() =>
                      router.push("/photoPackage/6485c0365570ad344f1a9084")
                    }
                  />
                </div>

                <div className={styles.imgPackage2}>
                  <Image
                    src={Package2}
                    alt="My Image"
                    width={300}
                    height={380}
                    onClick={() =>
                      router.push("/photoPackage/6485c07d5570ad344f1a9086")
                    }
                  />
                </div>

                <div className={styles.imgPackage3}>
                  <Image
                    src={Package3}
                    alt="My Image"
                    width={450}
                    height={300}
                    onClick={() =>
                      router.push("/photoPackage/6481fd73d5638359880f4f58")
                    }
                  />
                </div>

                <div className={styles.imgPackage4}>
                  <Image
                    src={Package4}
                    alt="My Image"
                    width={300}
                    height={380}
                    onClick={() =>
                      router.push("/photoPackage/6485bfb05570ad344f1a9080")
                    }
                  />
                </div>

                <div className={styles.imgPackage5}>
                  <Image
                    src={Package5}
                    alt="My Image"
                    width={500}
                    height={300}
                    onClick={() =>
                      router.push("/photoPackage/6485c0365570ad344f1a9084")
                    }
                  />
                </div>

                <div className={styles.imgPackage6}>
                  <Image
                    src={Package6}
                    alt="My Image"
                    width={300}
                    height={380}
                    onClick={() =>
                      router.push("/photoPackage/6485c0fc5570ad344f1a9088")
                    }
                  />
                </div>
              </div>
            </>
          )}
        </div>
        {/* <h2 className={styles.title__team}>Team</h2> */}
        <div className={styles.memberDiv}>
          {scrollYmember === true && (
            <>
              <div className={styles.memberShow}>
                <div className={styles.card__member}>
                  <CardMember data={staff?.result} />
                </div>
              </div>
            </>
          )}
        </div>

        <div className={styles.element}>
          <Quality />
        </div>
        <div className={styles.brand}>
          <Brand />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const data = await axiosClient.get(`/photographyPackage`).then((response) => {
    return response.data;
  });

  const staff = await axiosClient.get(`/employee`).then((response) => {
    return response.data;
  });

  return {
    props: {
      data: data,
      staff: staff,
    },
  };
}
