import { Card, Form, Input, Select, DatePicker, Radio } from "antd";

const colorOptions = [
  { label: "Red", value: "#FF0000" },
  { label: "Yellow", value: "#FFFF00" },
  { label: "Green", value: "#00FF00" },
  { label: "Gray", value: "#808080" },
];

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
        {[
          "Discussion",
          "PreRequisites",
          "implementationDeployment",
          "review",
          "goLive",
        ].map((field) => (
          <>
            <Form.Item
              key={field}
              label={field.replace(/([A-Z])/g, " $1").trim()}
              name={field}
              rules={[
                { required: true, message: `Please input ${field} details!` },
              ]}
            >
              <Input.TextArea placeholder={`Enter ${field} details`} />
            </Form.Item>
            <Form.Item
              key={`${field}Color`}
              // label={`${field} Color`}
              name={`${field}Color`}
              style={{ margin: "5px", marginLeft: "auto" }}
              rules={[
                { required: true, message: `Please select ${field} color!` },
              ]}
            >
              <Radio.Group options={colorOptions} optionType="button" />
            </Form.Item>
          </>
        ))}

        <Form.Item label="Completion Date" name="completionDate">
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
