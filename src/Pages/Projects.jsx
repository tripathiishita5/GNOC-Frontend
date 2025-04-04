import {
  Badge,
  Button,
  Card,
  Collapse,
  Descriptions,
  Drawer,
  Flex,
  Form,
  Popconfirm,
  Space,
} from "antd";
import {
  DownloadOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import ProjectForm from "../Components/ProjectForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProject,
  deleteProject,
  getAllProjects,
  updateProject,
} from "../htttp/api";
import exportToExcel from "../utility/exportToExcel";
import dayjs from "dayjs";

const Projects = () => {
  const [form] = Form.useForm();
  const [editProject, setEditProject] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setUpdating(false);
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
  const { mutate: updateMutation } = useMutation({
    mutationFn: (value) => updateProject({ id: editProject._id, data: value }),
    onSuccess: () => {
      setEditProject(null);
      form.resetFields();
      onClose();
      queryClient.invalidateQueries(["projects"]);
    },
  });
  const { mutate: deleteMutation } = useMutation({
    mutationFn: (id) => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
    },
  });
  const handleCreateProject = async () => {
    if (updating) {
      const values = await form.validateFields();
      updateMutation(values);
      return;
    }
    const values = await form.validateFields();
    createP(values);
  };
  const handleEdit = (project) => {
    setUpdating(true);
    showDrawer();
    form.setFieldsValue({
      ...project,
      completionDate: project.completionDate
        ? dayjs(project.completionDate)
        : null,
      startDate: project.startDate ? dayjs(project.startDate) : null,
    });
  };
  const handledelete = (value) => {
    deleteMutation(value._id);
  };
  const collapseItems =
    data?.data?.map((project, index) => ({
      key: index.toString(),
      label: project.MonitoringProjects,
      children: (
        <div>
          <Descriptions
            title={
              <Flex justify="space-between">
                <>{"Project Data"}</>
                <div className="flex gap-4">
                  <Button
                    onClick={() => {
                      setEditProject(project), handleEdit(project);
                    }}
                  >
                    Edit
                  </Button>
                  <Popconfirm
                    onConfirm={() => handledelete(project)}
                    title="Delete the project"
                    description="Are you sure to delete this project?"
                    icon={
                      <QuestionCircleOutlined
                        style={{
                          color: "red",
                        }}
                      />
                    }
                  >
                    <Button>Delete</Button>
                  </Popconfirm>
                </div>
              </Flex>
            }
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
        <div>
          <Collapse items={collapseItems} defaultActiveKey={["1"]} />
        </div>
      </Card>
      <Drawer
        title={updating ? "Upadate the project" : "Create a new Project"}
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
              {updating ? "Update" : "Submit"}
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
