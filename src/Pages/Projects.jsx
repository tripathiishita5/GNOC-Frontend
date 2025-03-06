import {
  Badge,
  Button,
  Card,
  Collapse,
  Descriptions,
  Drawer,
  Flex,
  Form,
  Space,
} from "antd";
import { DownloadOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import ProjectForm from "../Components/ProjectForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProject, getAllProjects } from "../htttp/api";
import exportToExcel from "../utility/exportToExcel";

const Projects = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
    placeholderData: (prev) => prev,
  });

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
  const collapseItems =
    data?.data?.map((project, index) => ({
      key: index.toString(),
      label: project.MonitoringProjects,
      children: (
        <div>
          <Descriptions
            title="Project Data"
            bordered
            column={3}
            items={[
              {
                label: "Jira Ticket",
                children: (
                  <Badge status="processing" text={project.jiraTicket} />
                ),
                span: "filled",
              },
              {
                label: "Start Date",
                children: project.startDate,
              },
              {
                label: "Enviornment",
                children: project.enviornment,
                span: "filled",
              },
              {
                label: "Discussion",
                children: (
                  <div
                    style={{
                      backgroundColor: `${project.DiscussionColor}`,
                      color: "black",
                      width: "100%",
                      height: "100%",
                      padding: "5px",
                    }}
                  >
                    {project.Discussion}
                  </div>
                ),
              },
              {
                label: "Pre-Requisites",
                children: (
                  <div
                    style={{
                      backgroundColor: `${project.PreRequisitesColor}`,
                      color: "black",
                      width: "100%",
                      height: "100%",
                      padding: "5px",
                    }}
                  >
                    {project.PreRequisites}
                  </div>
                ),
              },
              {
                label: "Implementation Deployment",
                children: (
                  <div
                    style={{
                      backgroundColor: `${project.implementationDeploymentColor}`,
                      color: "black",
                      width: "100%",
                      height: "100%",
                      padding: "5px",
                    }}
                  >
                    {project.implementationDeployment}
                  </div>
                ),
              },
              {
                label: "review",
                children: (
                  <div
                    style={{
                      backgroundColor: `${project.reviewColor}`,
                      color: "black",
                      width: "100%",
                      height: "100%",
                      padding: "5px",
                    }}
                  >
                    {project.review}
                  </div>
                ),
              },
              {
                label: "goLive",
                children: (
                  <div
                    style={{
                      backgroundColor: `${project.goLiveColor}`,
                      color: "black",
                      width: "100%",
                      height: "100%",
                      padding: "5px",
                    }}
                  >
                    {project.goLive}
                  </div>
                ),
              },
              {
                label: "Completion Date",
                children: project.completionDate,
              },
              {
                label: "Status",
                span: "filled",
                children: project.status,
              },
              {
                label: "Remarks",
                span: "filled",
                children: project.remarks[0]
                  ?.split(",")
                  .map((remark, idx) => <p key={idx}>{remark.trim()}</p>),
              },
            ]}
          />
        </div>
      ),
    })) || [];
  return (
    <div className="">
      <Card title="Project Details">
        <Flex justify="space-between">
          <div></div>
          <div className="mb-4 flex gap-4">
            <Button
              type="primary"
              onClick={() => exportToExcel(data.data)}
              size="default"
              icon={<DownloadOutlined />}
              style={{
                background: "#820C59",
                color: "white",
              }}
            >
              Export
            </Button>
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
        <Collapse items={collapseItems} defaultActiveKey={["1"]} />
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
    </div>
  );
};

export default Projects;
