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
      <h1 className="text-4xl font-semibold text-[#840F59] mb-8 text-center">
        Global Network Operation Centre
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
    </div>
  );
}

export default Dashboard;
