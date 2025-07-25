import { useState } from "react";
import {
    Form,
    Input,
    Select,
    Button,
    Table,
    Typography,
    Divider,
} from "antd";

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

    const handleAddAlert = (values) => {
        const matchedService = SERVICE_LIST.find(
            (s) => s.service.toLowerCase().trim() === values.service.toLowerCase().trim()
        );

        if (!matchedService) {
            alert("Service name not found in the predefined list.");
            return;
        }

        const key = matchedService.service;

        const newEntry = {
            host: values.host,
            alertType: values.alertType,
            severity: values.severity,
            details: values.details,
            jira: values.jira,
            resolver: values.resolver,
        };

        setAlertMap((prev) => {
            const existing = prev[key] || [];
            return {
                ...prev,
                [key]: [...existing, newEntry],
            };
        });

        form.resetFields();
    };

    const finalTableData = SERVICE_LIST.map((service) => {
        const alerts = alertMap[service.service] || [];

        const renderLines = (field) =>
            alerts.length > 0
                ? alerts.map((a, i) => <div key={i}>{a[field] || "N/A"}</div>)
                : <div>{field === "details" ? "No alert" : "N/A"}</div>;

        const severities = alerts.length > 0 ? (
            <div className="flex flex-col gap-1">
                {alerts.map((a, index) => (
                    <span
                        key={index}
                        className={`px-2 py-1 text-white text-xs rounded w-fit ${SEVERITY_COLORS[a.severity]}`}
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
        {
            title: "Environment",
            dataIndex: "environment",
            key: "environment",
        },
        {
            title: "Service Name",
            dataIndex: "service",
            key: "service",
        },
        {
            title: "Host/IP",
            dataIndex: "host",
            key: "host",
        },
        {
            title: "Alert Type",
            dataIndex: "alertType",
            key: "alertType",
        },
        {
            title: "Severity",
            dataIndex: "severity",
            key: "severity",
        },
        {
            title: "Details",
            dataIndex: "details",
            key: "details",
        },
        {
            title: "JIRA Ticket",
            dataIndex: "jira",
            key: "jira",
        },
        {
            title: "Resolver",
            dataIndex: "resolver",
            key: "resolver",
        },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <Title level={3} className="text-center">
                Monitoring Health Dashboard
            </Title>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleAddAlert}
                className="bg-white p-6 rounded shadow-md mt-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Form.Item name="service" label="Service Name" rules={[{ required: true }]}>
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

                    <Form.Item name="alertType" label="Alert Type" rules={[{ required: true }]}>
                        <Select placeholder="Select">
                            <Select.Option value="Network">Network</Select.Option>
                            <Select.Option value="Database">Database</Select.Option>
                            <Select.Option value="Application">Application</Select.Option>
                            <Select.Option value="IT Infra">IT Infra</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="severity" label="Severity" rules={[{ required: true }]}>
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
                    <Button type="primary" htmlType="submit">
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
                dataSource={finalTableData}
                pagination={false}
                bordered
                scroll={{ x: true }}
            />
        </div>
    );
};

export default MonitoringHealth;
