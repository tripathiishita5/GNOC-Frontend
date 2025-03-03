import { Button, Card, Drawer, Flex, Form, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import ProjectForm from "../Components/ProjectForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../htttp/api";

const Projects = () => {
  // Sample list of projects
  // eslint-disable-next-line no-unused-vars
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Beanbag Heat-New Infra",
      startDate: "1/2/2025",
      status: "Completed",
      jiraTicket: "TSI-522",
      environment: "Production",
      completionDate: "2/6/2025",
      remarks: "",
    },
    {
      id: 2,
      name: "S2 WSE DR",
      startDate: "1/23/2025",
      status: "In Progress",
      jiraTicket: "TSI-392",
      environment: "Production",
      remarks: "",
    },
    // Add more projects as needed
  ]);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const { mutate: createP } = useMutation({
    mutationFn: (value) => createProject(value),
    onSuccess: () => {
      form.resetFields();
      onClose();
      queryClient.invalidateQueries(["projects"]);
    },
  });
  const handleCreateProject = async () => {
    const values = await form.validateFields();
    createP(values);
  };
  return (
    <div className="">
      <Card>
        <Flex justify="space-between">
          <div></div>
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
        title="Create a new project"
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
            <Button onClick={handleCreateProject} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            jiraTicket: "",
            startDate: "",
            MonitoringProjects: "",
            enviornment: "",
            Discussion: "",
            PreRequisites: "",
            implementationDeployment: "",
            review: "",
            goLive: "",
            completionDate: "",
            status: "",
            remarks: "",
          }}
        >
          <ProjectForm />
        </Form>
      </Drawer>
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Project List
      </h1>
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-white shadow-lg rounded-lg mb-6 p-6 border border-gray-200"
        >
          <h2 className="text-2xl font-semibold text-gray-900">
            {project.name}
          </h2>
          <div className="space-y-2 mt-4 text-gray-700">
            <p>
              <strong>Start Date:</strong> {project.startDate}
            </p>
            <p>
              <strong>Status:</strong> {project.status}
            </p>
            <p>
              <strong>Jira Ticket:</strong> {project.jiraTicket}
            </p>
            <p>
              <strong>Environment:</strong> {project.environment}
            </p>
          </div>

          <div className="mt-4">
            <label
              htmlFor={`remarks-${project.id}`}
              className="block text-gray-700 font-medium mb-2"
            >
              Remarks:
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
