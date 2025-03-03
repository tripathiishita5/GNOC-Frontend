import { Card, Form, Input, Select, DatePicker } from "antd";

const ProjectForm = () => {
  return (
    <div className="flex flex-col gap-4">
      <Card title="Project Information">
        <Form.Item
          label="Jira Ticket"
          name="jiraTicket"
          rules={[{ required: true, message: "Please input the Jira Ticket!" }]}
        >
          <Input placeholder="Enter Jira Ticket" />
        </Form.Item>
        <Form.Item
          label="Start Date"
          name="startDate"
          rules={[{ required: true, message: "Please select the Start Date!" }]}
        >
          <DatePicker
            placeholder="Select Start Date"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          label="Monitoring Projects"
          name="MonitoringProjects"
          rules={[
            { required: true, message: "Please input Monitoring Projects!" },
          ]}
        >
          <Input placeholder="Enter Monitoring Projects" />
        </Form.Item>
        <Form.Item
          label="Environment"
          name="enviornment"
          rules={[{ required: true, message: "Please input the Environment!" }]}
        >
          <Input placeholder="Enter Environment" />
        </Form.Item>
      </Card>

      <Card title="Project Details">
        <Form.Item
          label="Discussion"
          name="Discussion"
          rules={[
            { required: true, message: "Please input Discussion details!" },
          ]}
        >
          <Input.TextArea placeholder="Enter Discussion details" />
        </Form.Item>
        <Form.Item
          label="Pre-Requisites"
          name="PreRequisites"
          rules={[{ required: true, message: "Please input Pre-Requisites!" }]}
        >
          <Input.TextArea placeholder="Enter Pre-Requisites" />
        </Form.Item>
        <Form.Item
          label="Implementation Deployment"
          name="implementationDeployment"
          rules={[
            {
              required: true,
              message: "Please input Implementation Deployment!",
            },
          ]}
        >
          <Input.TextArea placeholder="Enter Implementation Deployment" />
        </Form.Item>
        <Form.Item
          label="Review"
          name="review"
          rules={[{ required: true, message: "Please input Review details!" }]}
        >
          <Input.TextArea placeholder="Enter Review details" />
        </Form.Item>
        <Form.Item
          label="Go Live"
          name="goLive"
          rules={[{ required: true, message: "Please input Go Live details!" }]}
        >
          <Input.TextArea placeholder="Enter Go Live details" />
        </Form.Item>
        <Form.Item
          label="Completion Date"
          name="completionDate"
          rules={[
            { required: true, message: "Please select Completion Date!" },
          ]}
        >
          <DatePicker
            placeholder="Select Completion Date"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select Project Status!" }]}
        >
          <Select placeholder="Select Status">
            <Select.Option value="ongoing">Ongoing</Select.Option>
            <Select.Option value="completed">Completed</Select.Option>
            <Select.Option value="onHold">On Hold</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Remarks"
          name="remarks"
          rules={[{ required: true, message: "Please input Remarks!" }]}
        >
          <Input.TextArea placeholder="Enter Remarks (comma-separated)" />
        </Form.Item>
      </Card>
    </div>
  );
};

export default ProjectForm;
