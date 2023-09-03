import React from "react";
import style from "./style.module.css";
import { Button, Checkbox, Form, Input } from "antd";

type FieldType = {
  username?: string;
  password?: string;
};
type Props = {};

function Index({}: Props) {
  const onFinish = (value: FieldType) => {
    console.log(value);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <body className="bg-teal-500 h-screen">
      <div className="flex justify-center items-center h-screen ">
        <div className="bg-white h-60 pt-10 pr-20 h-1/2 w-1/2">
          <h1 className="flex justify-center text-4xl mb-8 font-semibold">
            LOGIN
          </h1>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                // type="primary"
                htmlType="submit"
                className="decoration-gray-200 "
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </body>
  );
}

export default Index;
