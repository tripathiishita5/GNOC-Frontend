import { Button, Card, Drawer, Flex, Form, Space, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUsers, register } from "../htttp/api";
import RegisterForm from "../Components/registerForm";
const { Search } = Input;
const Users = () => {
  const onSearchRes = (value) => console.log(value);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    placeholderData: (prevData) => prevData,
  });
  const { mutate: createUser } = useMutation({
    mutationFn: (value) => register(value),
    onSuccess: () => {
      form.resetFields();
      onClose();
    },
  });
  if (!data) return <h2>Loading....</h2>;
  const handleCreatUser = async () => {
    const values = await form.validateFields();
    createUser(values);
  };
  return (
    <div className="">
      <Card>
        <Flex justify="space-between">
          <div>
            <Search
              placeholder="Search user"
              onChange={(e) => onSearchRes(e.target.value)}
            />
          </div>
          <div>
            <Button
              type="primary"
              onClick={showDrawer}
              size="default"
              icon={<PlusOutlined />}
              style={{
                background: "#820C59",
                color: "white",
              }}
            >
              Create
            </Button>
          </div>
        </Flex>
      </Card>
      <Table
        className="pt-5"
        dataSource={data.data}
        columns={columns}
        pagination={{ pageSize: 7 }}
      />
      <Drawer
        title="Create a new user"
        width={520}
        onClose={() => {
          onClose();
          form.resetFields();
        }}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleCreatUser} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            name: "",
            email: "",
            empId: "",
            password: "",
            role: "",
          }}
        >
          <RegisterForm />
        </Form>
      </Drawer>
    </div>
  );
};

export default Users;

const columns = [
  {
    title: "Sr. No.",
    key: "serialNumber",
    render: (_, __, index) => index + 1, // Index starts from 0, so add 1
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Emplyee ID",
    dataIndex: "empId",
    key: "empId",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
];
