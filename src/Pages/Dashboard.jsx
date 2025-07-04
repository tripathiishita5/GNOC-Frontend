/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { getUsers, getAnalytics } from "../htttp/api";
import { Card, List, Avatar, Popover, Statistic, Progress, Table } from "antd";
import { User, Folder } from "lucide-react";
import { Pie } from "@ant-design/plots";
import React from "react";

// Zabbix Static Data
const zabbixData = [
  {
    key: 1,
    serviceName: "AMISP (MDM, S4-WSE and , Ewatch Read IT)",
    zabbix: "AMISP-DC and DR zabbix",
    ip: "172.18.8.75 & 172.19.8.75",
    dataCentre: "CTrls Mum and Hyd",
    version: "7.0.10",
  },
  {
    key: 2,
    serviceName: "Liberty Online2.0",
    zabbix: "AMISP-DC and DR zabbix",
    ip: "172.18.8.75 & 172.19.8.75",
    dataCentre: "CTrls Mum and Hyd",
    version: "7.0.10",
  },
  {
    key: 3,
    serviceName: "BBCool",
    zabbix: "M&C Zabbix",
    ip: "172.16.239.12",
    dataCentre: "Ctrls Noida and Mumbai",
    version: "6.2.9",
  },
  {
    key: 4,
    serviceName: "BBCare",
    zabbix: "M&C Zabbix",
    ip: "172.16.239.12",
    dataCentre: "Ctrls Noida and Mumbai",
    version: "6.2.9",
  },
  {
    key: 5,
    serviceName: "Ewatch Online",
    zabbix: "M&C Zabbix",
    ip: "172.16.239.12",
    dataCentre: "Ld8",
    version: "6.2.9",
  },
  {
    key: 6,
    serviceName: "Ewatch Heat",
    zabbix: "M&C Zabbix",
    ip: "172.16.239.12",
    dataCentre: "Ld8 & Ld9",
    version: "6.2.9",
  },
  {
    key: 7,
    serviceName: "Sugamlite",
    zabbix: "M&C Zabbix",
    ip: "172.16.239.12",
    dataCentre: "Ld8 & Ld9",
    version: "6.2.9",
  },
  {
    key: 8,
    serviceName: "Beanbag Heat",
    zabbix: "M&C Zabbix",
    ip: "172.16.239.12",
    dataCentre: "Ld8 & Ld9",
    version: "6.2.9",
  },
  {
    key: 9,
    serviceName: "Heat Billing-Heat Esco",
    zabbix: "M&C Zabbix",
    ip: "172.16.239.12",
    dataCentre: "Ld8 & Ld9",
    version: "6.2.9",
  },
  {
    key: 10,
    serviceName: "Prod DAST",
    zabbix: "M&C Zabbix",
    ip: "172.16.239.12",
    dataCentre: "Ld8 & Ld9",
    version: "6.2.9",
  },
  {
    key: 11,
    serviceName: "Ewatch read IT-MBC",
    zabbix: "MBC DC zabbix",
    ip: "10.10.119.76",
    dataCentre: "Ctrls Noida and Mumbai",
    version: "7.0.6",
  },
  {
    key: 12,
    serviceName: "Energy Audit- MBC",
    zabbix: "MBC DC zabbix",
    ip: "10.10.119.76",
    dataCentre: "Ctrls Noida and Mumbai",
    version: "7.0.6",
  },
  {
    key: 13,
    serviceName: "EMBC",
    zabbix: "MBC DC zabbix",
    ip: "10.10.119.76",
    dataCentre: "Ctrls Noida and Mumbai",
    version: "7.0.6",
  },
  {
    key: 14,
    serviceName: "GMBC",
    zabbix: "MBC DC zabbix",
    ip: "10.10.119.76",
    dataCentre: "Ctrls Noida and Mumbai",
    version: "7.0.6",
  },
  {
    key: 15,
    serviceName: "MBC Insight",
    zabbix: "MBC DC zabbix",
    ip: "10.10.119.76",
    dataCentre: "Ld8 & Ld9",
    version: "7.0.6",
  },
  {
    key: 16,
    serviceName: "MSEDCL",
    zabbix: "MBC DC zabbix",
    ip: "10.10.119.76",
    dataCentre: "Ctrls Noida and Mumbai",
    version: "7.0.6",
  },
  {
    key: 17,
    serviceName: "NPCL",
    zabbix: "MBC DC zabbix",
    ip: "10.10.119.76",
    dataCentre: "Ctrls Noida and Mumbai",
    version: "7.0.6",
  },
  {
    key: 18,
    serviceName: "Adaptricity",
    zabbix: "MBC DC zabbix",
    ip: "10.10.119.76",
    dataCentre: "Ctrls Noida and Mumbai",
    version: "7.0.6",
  },
  {
    key: 19,
    serviceName: "JBVNL",
    zabbix: "MBC DC zabbix",
    ip: "10.10.119.76",
    dataCentre: "Ctrls Noida and Mumbai",
    version: "7.0.6",
  },
  {
    key: 20,
    serviceName: "LVMV",
    zabbix: "MBC DC zabbix",
    ip: "10.10.119.76",
    dataCentre: "Ctrls Noida and Mumbai",
    version: "7.0.6",
  },
  {
    key: 21,
    serviceName: "L1-AIS",
    zabbix: "Liberty zabbix",
    ip: "192.168.56.43",
    dataCentre: "Ld8 & Ld9",
    version: "7.0.3",
  },
  {
    key: 22,
    serviceName: "L2-ROW",
    zabbix: "Liberty zabbix",
    ip: "192.168.56.43",
    dataCentre: "Ld8 & Ld9",
    version: "7.0.3",
  },
  {
    key: 23,
    serviceName: "L3-EUM",
    zabbix: "Liberty zabbix",
    ip: "192.168.56.43",
    dataCentre: "Ld8 & Ld9",
    version: "7.0.3",
  },
  {
    key: 24,
    serviceName: "L4-Oman",
    zabbix: "Liberty zabbix",
    ip: "192.168.56.43",
    dataCentre: "Ld8 & Ld9",
    version: "7.0.3",
  },
  {
    key: 25,
    serviceName: "Muti Fuel",
    zabbix: "Liberty zabbix",
    ip: "192.168.56.43",
    dataCentre: "Ld8 & Ld9",
    version: "7.0.3",
  },
  {
    key: 26,
    serviceName: "Sahaj Liberty 150",
    zabbix: "Liberty zabbix",
    ip: "192.168.56.43",
    dataCentre: "Ld8 & Ld9",
    version: "7.0.3",
  },
  {
    key: 27,
    serviceName: "Australia P2P-Smart Metering (S2-WSE, Bravo and SFE)",
    zabbix: "Australia zabbix",
    ip: "172.16.192.203",
    dataCentre: "Melbourne and Sydney",
    version: "7.0.6",
  },
  {
    key: 28,
    serviceName: "Bravo MDM Services",
    zabbix: "Australia zabbix",
    ip: "172.16.192.203",
    dataCentre: "Melbourne and Sydney",
    version: "7.0.6",
  },
  {
    key: 29,
    serviceName: "Republic of Ireland-S3WSE",
    zabbix: "S3 zabbix",
    ip: "172.16.201.80",
    dataCentre: "Ld8",
    version: "6.2.9",
  },
  {
    key: 30,
    serviceName: "GBSM (S1-WSE and SFE)",
    zabbix: "SFE zabbix",
    ip: "172.16.150.107",
    dataCentre: "Ld8",
    version: "6.0.35",
  },
  {
    key: 31,
    serviceName: "Monitor IT",
    zabbix: "MonitorIT zabbix",
    ip: "172.22.231.130",
    dataCentre: "",
    version: "6.2.9",
  },
  {
    key: 32,
    serviceName: "DCC-SMETS1",
    zabbix: "",
    ip: "",
    dataCentre: "",
    version: "",
  },
  {
    key: 33,
    serviceName: "Service ERP",
    zabbix: "",
    ip: "",
    dataCentre: "",
    version: "",
  },
  {
    key: 34,
    serviceName: "JVVNL",
    zabbix: "",
    ip: "",
    dataCentre: "",
    version: "",
  },
];


const columns = [
  {
    title: "Sr. No.",
    dataIndex: "key",
    key: "key",
    width: 80,
  },
  {
    title: "Service Name",
    dataIndex: "serviceName",
    key: "serviceName",
  },
  {
    title: "Zabbix",
    dataIndex: "zabbix",
    key: "zabbix",
  },
  {
    title: "Zabbix IP Address",
    dataIndex: "ip",
    key: "ip",
  },
  {
    title: "Data Centre",
    dataIndex: "dataCentre",
    key: "dataCentre",
  },
  {
    title: "Zabbix Version",
    dataIndex: "version",
    key: "version",
  },
];

function Dashboard() {
  // Fetch Users and Analytics Data
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    placeholderData: (prevData) => prevData,
  });

  const { data: analyticdata } = useQuery({
    queryKey: ["analytics"],
    queryFn: getAnalytics,
    placeholderData: (prevData) => prevData,
  });

  const rolePriority = { manager: 1, engineer: 2, analyst: 3 };
  const sortedUsers = data?.data
    ? [...data.data].sort((a, b) => rolePriority[a.role] - rolePriority[b.role])
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-semibold text-black mb-8 text-center">
        Team Dashboard
      </h1>

      {/* Zabbix Monitoring Table */}
      <Card title="Zabbix Monitoring Services" className="mb-8">
        <Table
          columns={columns}
          dataSource={zabbixData}
          pagination={{ pageSize: 10 }}
          bordered
          scroll={{ x: "max-content" }}
        />
      </Card>

      <div className="flex gap-6">
        {/* Left Side - Team Members */}
        <Card
          title="Team Members"
          style={{ width: "50%", maxHeight: "100%", overflowY: "auto" }}
        >
          <List
            itemLayout="horizontal"
            dataSource={sortedUsers}
            renderItem={(user) => (
              <List.Item>
                <Popover
                  content={
                    <div className="text-sm">
                      <p>Email: {user.email}</p>
                      <p>Active Tickets: 20</p>
                    </div>
                  }
                  title="User Details"
                  trigger="hover"
                >
                  <div className="flex items-center gap-3 cursor-pointer">
                    <Avatar icon={<User />} />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-gray-500 text-sm">{user.role}</p>
                    </div>
                  </div>
                </Popover>
              </List.Item>
            )}
          />
        </Card>

        {/* Right Side - Analytics */}
        <Card title="Project & User Analytics" style={{ width: "50%" }}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Statistic
              title="Total Users"
              value={analyticdata?.data?.totalUsers || 0}
              prefix={<User />}
            />
            <Statistic
              title="Total Projects"
              value={analyticdata?.data?.totalProjects || 0}
              prefix={<Folder />}
            />
          </div>

          {/* Project Status */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Project Status</h2>
            <Progress
              percent={
                ((analyticdata?.data?.projectStatus?.ongoing || 0) /
                  analyticdata?.data?.totalProjects) *
                100
              }
              status="active"
              showInfo
              strokeColor="blue"
              format={() =>
                `Ongoing: ${analyticdata?.data?.projectStatus?.ongoing}`
              }
            />
            <Progress
              percent={
                ((analyticdata?.data?.projectStatus?.onHold || 0) /
                  analyticdata?.data?.totalProjects) *
                100
              }
              status="exception"
              showInfo
              strokeColor="orange"
              format={() =>
                `On Hold: ${analyticdata?.data?.projectStatus?.onHold}`
              }
            />
            <Progress
              percent={
                ((analyticdata?.data?.projectStatus?.completed || 0) /
                  analyticdata?.data?.totalProjects) *
                100
              }
              status="success"
              showInfo
              strokeColor="green"
              format={() =>
                `Completed: ${analyticdata?.data?.projectStatus?.completed}`
              }
            />
          </div>

          {/* Pie Chart */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">
              User Role Distribution
            </h2>
            <Pie
              data={[
                {
                  role: "Managers",
                  value: analyticdata?.data?.userRoles?.managers || 0,
                },
                {
                  role: "Engineers",
                  value: analyticdata?.data?.userRoles?.engineers || 0,
                },
                {
                  role: "Analysts",
                  value: analyticdata?.data?.userRoles?.analysts || 0,
                },
              ]}
              angleField="value"
              colorField="role"
              height={200}
              label={{
                type: "spider",
                labelHeight: 28,
                content: "{name}: {percentage}",
              }}
            />
          </div>

          {/* Recent Projects and Users */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Recent Projects</h2>
              <List
                dataSource={analyticdata?.data?.recentProjects || []}
                renderItem={(project) => (
                  <List.Item>
                    <p>
                      {project.MonitoringProjects} -{" "}
                      <span className="text-gray-500">{project.status}</span>
                    </p>
                  </List.Item>
                )}
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Recent Users</h2>
              <List
                dataSource={analyticdata?.data?.recentUsers || []}
                renderItem={(user) => (
                  <List.Item>
                    <p>
                      {user.name} -{" "}
                      <span className="text-gray-500">{user.role}</span>
                    </p>
                  </List.Item>
                )}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
