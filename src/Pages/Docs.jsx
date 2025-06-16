import { useState } from "react";
import { Form, Button, Card, Drawer, Space, Input, Table, Spin } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createDoc, getDocs } from "../htttp/api";

const Docs = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const { data, isLoading } = useQuery({
    queryKey: ["docs"],
    queryFn: getDocs,
    placeholderData: [],
  });

  const { mutate: addDoc } = useMutation({
    mutationFn: (doc) => createDoc(doc),
    onSuccess: () => {
      form.resetFields();
      queryClient.invalidateQueries(["docs"]);
      onClose();
    },
  });

  const onFinish = (values) => {
    addDoc(values);
  };

  const documents = data?.data?.data || [];

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <a
          href={record.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1677ff", fontWeight: 500 }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      ellipsis: true,
      render: (link) => (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {link}
        </a>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date) => new Date(date).toLocaleString(),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <Button
          onClick={showDrawer}
          style={{
            background: "#820C59",
            color: "white",
          }}
        >
          + ADD
        </Button>
      </div>

      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={documents}
          rowKey="_id"
          pagination={{ pageSize: 6 }}
          bordered
        />
      )}

      <Drawer
        title="Add New Document"
        placement="right"
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button
              onClick={() => form.resetFields()}
              style={{
                background: "#820C59",
                color: "white",
              }}
            >
              Clear
            </Button>
          </Space>
        }
      >
        <Card>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Doc Title"
              name="title"
              rules={[{ required: true, message: "Please input the title!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Doc Link"
              name="link"
              rules={[
                { required: true, message: "Please input the doc link!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button
                style={{
                  background: "#820C59",
                  color: "white",
                }}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Drawer>
    </div>
  );
};

export default Docs;
