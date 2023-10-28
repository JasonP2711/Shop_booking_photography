import React, { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import {
  Space,
  Table,
  Modal,
  Button,
  Form,
  Input,
  Popconfirm,
  Pagination,
  message,
  Select,
  InputNumber,
  Upload,
  DatePickerProps,
  DatePicker,
} from "antd";

import customParseFormat from "dayjs/plugin/customParseFormat";

import type { ColumnsType } from "antd/es/table";
import {
  FilterOutlined,
  UndoOutlined,
  FileAddOutlined,
  PlusOutlined,
} from "@ant-design/icons";
const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";
type Props = {};
dayjs.extend(customParseFormat);

const dateFormat = "YYYY/MM/DD";

interface listTableType {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phoneNumber: string;
  address: string;
  _id: string;
  imageUrl: string;
  position: string;
}

type formType = {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phoneNumber: string;
  address: string;
  _id: string;
  imageUrl: string;
  position: string;
  birthday: Date;
  password: string;
};

function Index({}: Props) {
  /////////////////////////////
  const [listEmployee, setListEmployee] = useState<Array<listTableType>>([]);
  const [idEmployeeUpdate, setIdEmployeeUpdate] = useState<string>("");

  const [popupUpdate, setPopupUpdate] = useState<boolean>(false);
  const [popupCreate, setPopupCreate] = useState<boolean>(false);
  const [fieldDelete, setFieldDelete] = useState<string>();
  const [reload, setReload] = useState<number>(0);
  const [file, setFile] = useState<any>(null);

  ///////////////////////////////
  const [updateForm] = Form.useForm();
  const [createForm] = Form.useForm();

  const columns: ColumnsType<listTableType> = [
    {
      title: () => (
        <>
          <span>First Name</span>
        </>
      ),
      dataIndex: "firstName",
      key: "firstName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
    },
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
    },
    {
      title: () => (
        <>
          <span>Action</span>
          <Button
            className="ml-4"
            onClick={() => {
              setPopupCreate(true);
            }}
          >
            <FileAddOutlined />
          </Button>
        </>
      ),
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              console.log("record: ", record);
              setIdEmployeeUpdate(record._id);
              setPopupUpdate(true);
              updateForm.setFieldsValue(record);
            }}
          >
            Update
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              onClick={() => {
                console.log("record: ", record);
                setFieldDelete(record._id);
              }}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  /////////////////////0

  useEffect(() => {
    const getEmployeeLisst = async () => {
      const list = await axios.get(`${URL_ENV}/employee`);
      console.log("list: ", list?.data?.result);
      setListEmployee(list?.data?.result);
    };
    getEmployeeLisst();
  }, [reload]);

  const confirm = (e: any) => {
    deleteEmployee();
    message.success("Delete success!");
  };

  const cancel = (e: any) => {
    console.log(e);
    // message.error("Click on No");
  };

  const handleOk = () => {
    setPopupUpdate(false);
  };

  const handleCancel = async () => {
    setPopupUpdate(false);
  };

  const handleOk2 = () => {
    setPopupCreate(false);
  };

  const handleCancel2 = async () => {
    setPopupCreate(false);
  };

  const onFinishUpdate = (value: formType) => {
    axios
      .patch(`${URL_ENV}/employee/${idEmployeeUpdate}`, value)
      .then((results) => {
        message.success("Update success!");
      })
      .catch(() => {
        message.error("Update failure!!!");
      });
    setIdEmployeeUpdate("");
    setReload((pre) => pre + 1);
  };

  const onFinishCreate = useCallback(
    async (value: formType) => {
      // console.log("value: ", value);
      await axios
        .post(`${URL_ENV}/employee`, value)
        .then(async (results) => {
          console.log("results: ", results);
          console.log("results: ", results?.data?.results?._id);

          //upload image
          ///////////////////////////////////update img file
          const formData = new FormData();
          formData.append("file", file);
          console.log("file: ", file);
          if (file && file.uid && file.type)
            await axios.post(
              `http://localhost:9000/upload/employees/${results?.data?.results?._id}/image`,
              formData
            );
          message.success("Create success!");
        })
        .catch(() => {
          message.error("Create failure!!!");
        });
      createForm.resetFields();
      // setFile("");
      setReload((pre) => pre + 1);
    },
    [file]
  );

  const deleteEmployee = useCallback(async () => {
    await axios.delete(`${URL_ENV}/employee/${fieldDelete}`);

    setReload((prev) => prev + 1);
  }, [fieldDelete]);

  return (
    <>
      <Table columns={columns} dataSource={listEmployee} />;{/* //// */}
      <Modal
        title="Update Information"
        open={popupUpdate}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/* /////////////Form Update data /////// */}
        <Form
          form={updateForm}
          name="updateForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinishUpdate}
          // onFinishFailed={onFinishFailed}
          // autoComplete="off"
        >
          <Form.Item<formType>
            label="firstName"
            name="firstName"
            rules={[{ required: true, message: "Please input the package!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<formType>
            label="lastName"
            name="lastName"
            rules={[
              { required: true, message: "Please input time for Packaga!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<formType>
            label="age"
            name="age"
            rules={[
              { required: true, message: "Please input age of employee!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<formType>
            label="email"
            name="email"
            rules={[
              { required: true, message: "Please input email of employee!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<formType>
            label="phoneNumber"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please input discount of package!" },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item<formType>
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input address of package!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<formType>
            label="position"
            name="position"
            rules={[
              {
                required: true,
                message: "Please input position of package!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item label="Ảnh" name="file">
            <Upload
              maxCount={1}
              listType="picture-card"
              showUploadList={true}
              beforeUpload={(file) => {
                setFile(file);
                return false;
              }}
              onRemove={() => {
                setFile("");
              }}
            >
              {!file ? (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              ) : (
                ""
              )}
            </Upload>
          </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* ///////////////////ADD EMPLOYEE///////////////////////// */}
      <Modal
        title="Create new employee"
        open={popupCreate}
        onOk={handleOk2}
        onCancel={handleCancel2}
      >
        <Form
          form={createForm}
          name="createForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: false }}
          onFinish={onFinishCreate}
        >
          <Form.Item<formType>
            label="First name"
            name="firstName"
            rules={[
              { required: true, message: "Please input the first name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<formType>
            label="Last name"
            name="lastName"
            rules={[{ required: true, message: "Please input Last name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<formType>
            label="Age"
            name="age"
            rules={[
              { required: true, message: "Please input age of employee!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<formType>
            label="email"
            name="email"
            rules={[
              { required: true, message: "Please input email of employee!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<formType>
            label="Number phone"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please input number phone(03....) of package!",
              },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item<formType>
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input address!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<formType>
            label="Position"
            name="position"
            rules={[
              {
                required: true,
                message: "Please input position!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<formType>
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input password!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<formType>
            label="Birthday"
            name="birthday"
            rules={[
              {
                required: true,
                message: "Please input birthday!",
              },
            ]}
          >
            <DatePicker
              defaultValue={dayjs("2015/01/01", dateFormat)}
              format={dateFormat}
            />
          </Form.Item>
          <Form.Item label="Ảnh" name="file">
            <Upload
              maxCount={1}
              listType="picture-card"
              showUploadList={true}
              beforeUpload={(file) => {
                console.log("setfile: ", file);
                setFile(file);
                return false;
              }}
              onRemove={() => {
                setFile("");
              }}
            >
              {!file ? (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              ) : (
                ""
              )}
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Index;
