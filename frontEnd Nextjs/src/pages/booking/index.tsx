import React, { useEffect, useState } from "react";
import axios from "axios";
import { axiosClient } from "@/libraries/axiosClient";
// import { PlusOutlined } from "@ant-design/icons";
import { URL_ENV } from "@/constant/URL";
import { Button, DatePicker, Form, Input, Select, message } from "antd";
// import PhotoPackage from "../photoPackage/[id]";
import { userAuth } from "../../managerState/userAuth";

//lấy ngày theo chuẩn của thư viện dayjs
// import type { Dayjs } from "dayjs";
// import dayjs from "dayjs";
// import customParseFormat from "dayjs/plugin/customParseFormat";

// dayjs.extend(customParseFormat);

type Props = {};

const { RangePicker } = DatePicker;
const { TextArea } = Input;

function Index({}: Props) {
  const { auth } = userAuth((state: any) => state);
  const [province, setProvince] = useState<Array<any>>([]);
  const [provinceChoose, setProvinceChoose] = useState();
  const [district, setDistrict] = useState<Array<any>>([]);
  const [photographyPackage, setPhotographyPackage] = useState<Array<any>>();
  const [checkFull, setCheckFull] = useState<boolean>(true);
  const [bookingForm] = Form.useForm();
  useEffect(() => {
    console.log("call 1");
    const getProvinceData = async () => {
      axios
        .get("https://provinces.open-api.vn/api/?depth=2")
        .then((response) => {
          // console.log("tinh: ", response.data);
          setProvince(response.data);
        });
    };
    const getPackage = async () => {
      axiosClient.get(`${URL_ENV}/photographyPackage`).then((response) => {
        // console.log("package: ", response.data?.results[0]);
        setPhotographyPackage(response.data?.results);
      });
    };
    getProvinceData();
    getPackage();
  }, []);

  useEffect(() => {
    province.map((item: any, index: any) => {
      if (item.name === provinceChoose) {
        console.log(item.districts);
        setDistrict(item.districts);
      }
      // setDistrict((pre) => [...pre, item.districts]);
    });
  }, [provinceChoose]);
  // console.log("province: ", province);

  const handleSubmit = (value: any) => {
    let check = true;
    value.customerId = auth.payload._id;
    value.phone = auth.payload.phoneNumber;
    value.email = auth.payload.email;
    value = {
      ...value,
      status: "WAITING",
      bookingPlace: `${value.address}-${value.district}-${value.province}`,
    };
    console.log("order: ", value);
    for (const key in value) {
      if (value.hasOwnProperty(key) && value[key] === undefined) {
        message.error("Phải hoàn thành tất cả các thông tin trong form!");
        check = false;
        break;
      }
    }
    console.log(check);
    const postOrder = async () => {
      const sub = await axiosClient
        .post(`${URL_ENV}/order`, value)
        .then(async (response) => {
          await axios
            .post(`${URL_ENV}/sendEmail/booking`, {
              email: value.email,
              package: auth.payload.phoneNumber,
              timeBooking: value.dateBooking,
              place: `${value.address}-${value.district}-${value.province}`,
            })
            .then(() => {
              message.success("Tạo đơn hẹn thành công !!", 1.5);
              bookingForm.resetFields();
            });
        })
        .catch((err) => {
          message.error("Tạo đơn hẹn thất bại !!", 1.5);
        });
    };
    if (check) postOrder();
  };

  return (
    <>
      <div
        style={{
          background: "#3E3E3F",
          width: "100%",
          height: "auto",
          paddingTop: "60px",
        }}
      >
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "2% 0%",
            color: "white",
          }}
        >
          Đặt lịch hẹn
        </h2>
        {/* Booking form */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Form
            form={bookingForm}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            // disabled={componentDisabled}
            style={{ width: "50%" }}
            onFinish={handleSubmit}
          >
            <Form.Item label="Khu Vực" name="province">
              <Select
                defaultValue="Tỉnh-Thành phố"
                style={{ width: "100%" }}
                onChange={(value: any) => {
                  setProvinceChoose(value);
                }}
                options={province?.map((item: any) => ({
                  label: item.name,
                  value: item.name,
                }))}
              />
            </Form.Item>
            <Form.Item label="Quận-Huyện" name="district">
              <Select
                style={{ width: "100%" }}
                defaultValue="Quận-Huyện"
                options={district.map((item: any) => ({
                  label: item.name,
                  value: item.name,
                }))}
              />
            </Form.Item>
            <Form.Item label="Địa chỉ" name="address">
              <Input />
            </Form.Item>
            <Form.Item label="Thể loại chụp" name="packageId">
              <Select>
                <Select.Option value="none">Chọn thể loại chụp</Select.Option>
                {photographyPackage &&
                  photographyPackage.map((item: any, index: number) => (
                    <Select.Option key={index} value={item._id}>
                      {item.package}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item label="Ngày chụp" name="dateBooking">
              <RangePicker style={{ width: "100%" }} />
            </Form.Item>
            {/* <Form.Item label="Giờ chụp" name="timeBooking">
              <TimePicker defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")} />
            </Form.Item> */}
            <Form.Item label="Chú thích thêm" name="note">
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item style={{ display: "flex", justifyContent: "center" }}>
              <Button htmlType="submit">Đặt lịch</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Index;
