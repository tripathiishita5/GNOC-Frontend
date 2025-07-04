import { useState } from "react";
import {
  Form,
  Button,
  Card,
  Drawer,
  Space,
  Input,
  Table,
  Spin,
  Select,
  message,
} from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createDoc, getDocs, deleteDoc, updateDoc } from "../htttp/api";
const Docs = () => {
  const [open, setOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const showDrawer = () => setOpen(true);
  const onClose = () => {
    setOpen(false);
    setEditMode(false);
    setEditingDoc(null);
    form.resetFields();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["docs"],
    queryFn: getDocs,
    placeholderData: [],
  });

  const { mutate: addDoc } = useMutation({
    mutationFn: (doc) => createDoc(doc),
    onSuccess: () => {
      message.success("Document added");
      form.resetFields();
      queryClient.invalidateQueries(["docs"]);
      onClose();
    },
  });

  const { mutate: updateMutation } = useMutation({
    mutationFn: ({ id, data }) => updateDoc({ id, data }),
    onSuccess: () => {
      message.success("Document updated");
      queryClient.invalidateQueries(["docs"]);
      onClose();
    },
  });

  const { mutate: deleteMutation } = useMutation({
    mutationFn: (id) => deleteDoc(id),
    onSuccess: () => {
      message.success("Document deleted");
      queryClient.invalidateQueries(["docs"]);
    },
  });

  const handleDelete = (id) => {
    deleteMutation(id);
  };

  const handleEdit = (doc) => {
    setEditMode(true);
    setEditingDoc(doc);
    form.setFieldsValue(doc);
    setOpen(true);
  };

  const onFinish = (values) => {
    if (editMode && editingDoc) {
      updateMutation({ id: editingDoc._id, data: values });
    } else {
      addDoc(values);
    }
  };

  const allDocuments = data?.data?.data || [];

  const documents = allDocuments.filter((doc) => {
    const matchesTag = selectedTag ? doc.tags === selectedTag : true;
    const matchesTitle = doc.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesTag && matchesTitle;
  });

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
      title: "Tag",
      dataIndex: "tags",
      key: "tags",
      render: (tag) => (
        <span style={{ color: "#13c2c2", fontWeight: 500 }}>{tag}</span>
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
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      {/* Filter and Add Button Row */}
      <div className="flex justify-between flex-wrap gap-2 mb-4">
        <div className="flex gap-2">
          <Select
            allowClear
            style={{ width: 200 }}
            placeholder="Filter by tag"
            onChange={(value) => setSelectedTag(value)}
            options={[
              { value: "Monitoring Projects", label: "Monitoring Projects" },
              { value: "Zabbix Server", label: "Zabbix Server" },
              { value: "Zabbix Agent", label: "Zabbix Agent" },
              { value: "css", label: "Monitoring Types" },
              { value: "html", label: "HTML" },
            ]}
          />
          <Input.Search
            placeholder="Search by title"
            allowClear
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 250 }}
          />
        </div>

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
        title={editMode ? "Update Document" : "Add New Document"}
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
            <Form.Item
              label="Doc Tag"
              name="tags"
              rules={[{ required: true, message: "Please input the doc tag!" }]}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Select or add tags"
                options={[
                  { value: "Monitoring Projects" },
                  { value: "Zabbix Server" },
                  { value: "Zabbix Agent" },
                  { value: "Monitoring Types" },
                  { value: "html" },
                ]}
              />
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
                {editMode ? "Update" : "Submit"}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Drawer>
    </div>
  );
};

export default Docs;
