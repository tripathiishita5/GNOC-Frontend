import { useState, useEffect } from "react";
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
import {
  saveDailyAlertsApi,
  getTodayAlertsApi,
  getAllSavedAlertsApi,
} from "../htttp/api";
import { AlignCenter } from "lucide-react";

const { TextArea } = Input;
const { Title } = Typography;

const SEVERITY_COLORS = {
  ok: "bg-green-500",
  warning: "bg-yellow-400",
  critical: "bg-orange-500",
  disaster: "bg-red-600",
};

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

const MonitoringHealth = () => {
  const [form] = Form.useForm();
  const [alertMap, setAlertMap] = useState({});

  const [savedData, setSavedData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loadingSavedData, setLoadingSavedData] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await getTodayAlertsApi();
        if (res?.data?.alerts) {
          const grouped = {};
          res.data.alerts.forEach((alert) => {
            if (!grouped[alert.service]) grouped[alert.service] = [];
            grouped[alert.service].push(alert);
          });
          setAlertMap(grouped);
        }
      } catch (error) {
        console.error("Failed to fetch today's alerts", error);
        message.error("Failed to fetch today's alerts");
      }
    })();
  }, []);

  const handleAddAlert = (values) => {
    const matchedService = SERVICE_LIST.find(
      (s) =>
        s.service.toLowerCase().trim() === values.service.toLowerCase().trim()
    );
    if (!matchedService) {
      message.error("Service name not found in the predefined list.");
      return;
    }

    const key = matchedService.service;

    const newAlert = {
      ...values,
      environment: matchedService.environment,
    };

    setAlertMap((prev) => {
      const existing = prev[key] || [];
      return {
        ...prev,
        [key]: [...existing, newAlert],
      };
    });

    form.resetFields();
  };

  const handleSaveAllAlerts = async () => {
    const alertsToSave = Object.values(alertMap).flat();
    if (alertsToSave.length === 0) {
      message.info("No alerts to save.");
      return;
    }
    try {
      await saveDailyAlertsApi({ alerts: alertsToSave });
      message.success("Alerts saved successfully.");
      setAlertMap({});
    } catch (error) {
      console.error(error);
      message.error("Failed to save alerts.");
    }
  };

  const handleShowTotalSavedAlerts = async () => {
    setLoadingSavedData(true);
    try {
      const res = await getAllSavedAlertsApi();
      if (res?.data) {
        setSavedData(res.data.docs || []);
        setTotalCount(res.data.totalAlerts || 0);
      } else {
        setSavedData([]);
        setTotalCount(0);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch saved alerts.");
      setSavedData([]);
      setTotalCount(0);
    } finally {
      setLoadingSavedData(false);
    }
  };

  const finalTableData = SERVICE_LIST.map((service) => {
    const alerts = alertMap[service.service] || [];

    const renderLines = (field) =>
      alerts.length > 0 ? (
        alerts.map((a, i) => <div key={i}>{a[field] || "N/A"}</div>)
      ) : (
        <div>{field === "details" ? "No alert" : "N/A"}</div>
      );

    const severities =
      alerts.length > 0 ? (
        <div className="flex flex-col gap-1">
          {alerts.map((a, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-white text-xs rounded w-fit ${SEVERITY_COLORS[a.severity.toLowerCase()] || "bg-gray-400"
                }`}
            >
              {a.severity.toUpperCase()}
            </span>
          ))}
        </div>
      ) : (
        <span className="px-2 py-1 text-white text-xs rounded bg-green-500">
          OK
        </span>
      );

    return {
      key: service.id,
      environment: service.environment,
      service: service.service,
      host: renderLines("host"),
      alertType: renderLines("alertType"),
      severity: severities,
      details: renderLines("details"),
      jira: renderLines("jira"),
      resolver: renderLines("resolver"),
    };
  });

  const columns = [
    { title: "Environment", dataIndex: "environment", key: "environment" },
    { title: "Service Name", dataIndex: "service", key: "service" },
    { title: "Host/IP", dataIndex: "host", key: "host" },
    { title: "Alert Type", dataIndex: "alertType", key: "alertType" },
    { title: "Severity", dataIndex: "severity", key: "severity" },
    { title: "Details", dataIndex: "details", key: "details" },
    { title: "JIRA Ticket", dataIndex: "jira", key: "jira" },
    { title: "Resolver Team", dataIndex: "resolver", key: "resolver" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#840F59] mb-8 text-center">
        Monitoring Health Dashboard
      </h1>


      <div className="bg-white py-1 px-4 rounded shadow-md mt-6">
        <Form form={form} layout="vertical" onFinish={handleAddAlert}>
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

            <Form.Item
              name="host"
              label="Host/IP"
              rules={[{ required: true }]}
            >
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
            <div className="flex justify-end gap-3">
              <Button
                htmlType="submit"
                className="font-semibold"
                style={{
                  backgroundColor: "#5A8199",
                  borderColor: "#5A8199",
                  color: "white",
                  fontWeight: "600",
                }}
              >
                Add Alert
              </Button>
              <Button
                className="font-semibold"
                style={{
                  backgroundColor: "#5A8199",
                  borderColor: "#5A8199",
                  color: "white",
                  fontWeight: "600",
                }}
                onClick={handleSaveAllAlerts}
              >
                Save Dashboard
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>

      <Divider />

      <Button
        type="dashed"
        style={{ marginBottom: 12 }}
        onClick={handleShowTotalSavedAlerts}
        loading={loadingSavedData}
      >
        Show Dashboard (Last 7 Days)
      </Button>

      {savedData.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <strong>
            Total days with saved alerts: {savedData.length} <br />
            Total alerts saved in last 7 days: {totalCount}
          </strong>
          <ul>
            {savedData.map((doc, i) => (
              <li key={doc._id || i}>
                <b>{new Date(doc.date).toLocaleDateString()}</b>:{" "}
                {doc.alerts.length} alert(s)
              </li>
            ))}
          </ul>
        </div>
      )}

      <Title level={4} className="mt-4 mb-4 text-[#5A8199] ">
        GNOC Monitoring Health Dashboard
      </Title>

      <Table
        columns={columns}
        dataSource={finalTableData}
        pagination={false}
        bordered
        scroll={{ x: true }}
        components={{
          header: {
            cell: (props) => (
              <th
                {...props}
                className="text-white"
                style={{
                  backgroundColor: "#840F59",
                  color: "white",
                  ...props.style,
                }}
              />
            ),
          },
        }}
      />
    </div>
  );
};

export default MonitoringHealth;
