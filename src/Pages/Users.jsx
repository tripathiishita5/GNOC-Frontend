import { Button, Card, Drawer, Flex, Form, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { register } from "../htttp/api";
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
  const { mutate: createUser } = useMutation({
    mutationFn: (value) => register(value),
    onSuccess: () => {
      form.resetFields();
      onClose();
    },
  });
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
