import { Card, Form, Input, Select } from "antd";

const RegisterForm = () => {
  return (
    <div className="flex flex-col gap-4">
      <Card title="User Information">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input the user name!" }]}
        >
          <Input placeholder="Enter the user's Name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input the user email!" },
            { type: "email", message: "The input is not valid E-mail!" },
          ]}
        >
          <Input placeholder="Enter the user's Email" />
        </Form.Item>
      </Card>
      <Card title="Credentials">
        <Form.Item
          label="Employee ID"
          name="empId"
          rules={[{ required: true, message: "Please input the employee id!" }]}
        >
          <Input placeholder="Enter employee id " />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input the user password!",
            },
            {
              min: 6,
              message: "Password must be at least 6 characters long!",
            },
          ]}
        >
          <Input placeholder="Enter the user's Password" />
        </Form.Item>
        <Form.Item label="Role" name="role">
          <Select placeholder="Select a role">
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="user">User</Select.Option>
          </Select>
        </Form.Item>
      </Card>
    </div>
  );
};

export default RegisterForm;
