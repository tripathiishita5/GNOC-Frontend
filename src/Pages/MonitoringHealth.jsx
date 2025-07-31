import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Form,
  Input,
  Select,
  Button,
  Table,
  Typography,
  Divider,
  message,
} from "antd";
import { creatAlert, getAlerts } from "../htttp/api"; // Fixed import

const { TextArea } = Input;
const { Title } = Typography;

const SERVICE_LIST = [
  { id: 1, environment: "DR", service: "AMISP - DR" },
  { id: 2, environment: "DC", service: "AMISP - DC" },
  { id: 3, environment: "DC", service: "EMBC" },
  { id: 4, environment: "DC", service: "GBSM - UK (SFE and WSE)" },
  { id: 5, environment: "DC", service: "Ireland (SFE an WSE)" },
  { id: 6, environment: "DC", service: "Australia" },
  { id: 7, environment: "DC", service: "Bean Bag Care" },
  { id: 8, environment: "DC", service: "M&C" },
  { id: 9, environment: "DC", service: "Liberty Projects" },
];

const SEVERITY_COLORS = {
  ok: "bg-green-500",
  warning: "bg-yellow-400",
  critical: "bg-orange-500",
  disaster: "bg-red-600",
};

const MonitoringHealth = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["alerts"],
    queryFn: async () => {
      const res = await getAlerts();
      return res.data.alerts;
    },
  });

  const mutation = useMutation({
    mutationFn: async (values) => {
      const matchedService = SERVICE_LIST.find(
        (s) =>
          s.service.toLowerCase().trim() === values.service.toLowerCase().trim()
      );
      if (!matchedService) {
        throw new Error("Service not found!");
      }
      return creatAlert({
        ...values,
        environment: matchedService.environment,
      });
    },
    onSuccess: () => {
      message.success("Alert added!");
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
      form.resetFields();
    },
    onError: (err) => {
      message.error(err?.response?.data?.message || "Failed to add alert.");
    },
  });

  const columns = [
    { title: "Environment", dataIndex: "environment", key: "environment" },
    { title: "Service Name", dataIndex: "service", key: "service" },
    { title: "Host/IP", dataIndex: "host", key: "host" },
    { title: "Alert Type", dataIndex: "alertType", key: "alertType" },
    {
      title: "Severity",
      dataIndex: "severity",
      key: "severity",
      render: (severity) => (
        <span
          className={`px-2 py-1 text-white text-xs rounded w-fit ${
            SEVERITY_COLORS[severity?.toLowerCase()] || "bg-gray-400"
          }`}
        >
          {severity?.toUpperCase() || "N/A"}
        </span>
      ),
    },
    { title: "Details", dataIndex: "details", key: "details" },
    { title: "JIRA Ticket", dataIndex: "jira", key: "jira" },
    { title: "Resolver", dataIndex: "resolver", key: "resolver" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Title level={3} className="text-center">
        Monitoring Health Dashboard
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={mutation.mutate}
        className="bg-white p-6 rounded shadow-md mt-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Form.Item
            name="service"
            label="Service Name"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              placeholder="Select a service"
              options={SERVICE_LIST.map((s) => ({
                label: s.service,
                value: s.service,
              }))}
            />
          </Form.Item>
          <Form.Item name="host" label="Host/IP" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="alertType"
            label="Alert Type"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select">
              <Select.Option value="Network">Network</Select.Option>
              <Select.Option value="Database">Database</Select.Option>
              <Select.Option value="Application">Application</Select.Option>
              <Select.Option value="IT Infra">IT Infra</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="severity"
            label="Severity"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select">
              <Select.Option value="ok">OK</Select.Option>
              <Select.Option value="warning">Warning</Select.Option>
              <Select.Option value="critical">Critical</Select.Option>
              <Select.Option value="disaster">Disaster</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="resolver" label="Resolver Party">
            <Input />
          </Form.Item>
          <Form.Item name="jira" label="JIRA Ticket Number">
            <Input />
          </Form.Item>
          <Form.Item
            name="details"
            label="Details"
            className="md:col-span-3"
            rules={[{ required: true }]}
          >
            <TextArea rows={3} />
          </Form.Item>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={mutation.isLoading}>
            Add Alert
          </Button>
        </Form.Item>
      </Form>

      <Divider />

      <Title level={4} className="mt-8 mb-4">
        Alert Status Table (All Services)
      </Title>

      <Table
        columns={columns}
        dataSource={data || []}
        rowKey={(record) => record._id || record.id} // mongo default _id, fallback id
        pagination={false}
        bordered
        scroll={{ x: true }}
        loading={isLoading}
      />
    </div>
  );
};

export default MonitoringHealth;
