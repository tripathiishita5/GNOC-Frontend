import {
  Button,
  Card,
  Drawer,
  Flex,
  Form,
  Popconfirm,
  Space,
  Table,
} from "antd";
import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getUsers, register, updateUser } from "../htttp/api";
import RegisterForm from "../Components/registerForm";
const { Search } = Input;
const Users = () => {
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
    {
      title: "Action",
      key: "action",
      render: (_, values) => (
        <Space size="middle">
          <a
            onClick={() => {
              setEditUser(values), handleEdit(values);
            }}
          >
            Edit
          </a>
          <Popconfirm
            onConfirm={() => handledelete(values)}
            title="Delete the task"
            description="Are you sure to delete this task?"
            icon={
              <QuestionCircleOutlined
                style={{
                  color: "red",
                }}
              />
            }
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const onSearchRes = (value) => console.log(value);
  const queryClient = useQueryClient();
  const [editUser, setEditUser] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setUpdating(false);
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
      queryClient.invalidateQueries(["users"]);
    },
  });
  const { mutate: updateMutation } = useMutation({
    mutationFn: (value) => updateUser({ id: editUser._id, data: value }),
    onSuccess: () => {
      setEditUser(null);
      form.resetFields();
      onClose();
      queryClient.invalidateQueries(["users"]);
    },
  });
  const { mutate: deleteMutation } = useMutation({
    mutationFn: (id) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
  if (!data) return <h2>Loading....</h2>;
  const handleCreatUser = async () => {
    if (updating) {
      const values = await form.validateFields();
      updateMutation(values);
      return;
    }
    const values = await form.validateFields();
    createUser(values);
  };
  const handleEdit = (value) => {
    setUpdating(true);
    showDrawer();
    form.setFieldsValue(value);
  };
  const handledelete = (value) => {
    deleteMutation(value._id);
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
        title={updating ? "Upadate the user" : "Create a new user"}
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
              {updating ? "Update" : "Submit"}
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
          <RegisterForm updating={updating} />
        </Form>
      </Drawer>
    </div>
  );
};

export default Users;
