import { Card, Table } from "antd";
import { useEffect, useState } from "react";
import { zabbixData } from "../utility/constant";

const columns = [
  { title: "Sr. No.", dataIndex: "key", key: "key", width: 80 },
  { title: "Service Name", dataIndex: "serviceName", key: "serviceName" },
  { title: "Zabbix", dataIndex: "zabbix", key: "zabbix" },
  { title: "Zabbix IP Address", dataIndex: "ip", key: "ip" },
  { title: "Data Centre", dataIndex: "dataCentre", key: "dataCentre" },
  { title: "Zabbix Version", dataIndex: "version", key: "version" },
];

const PAGE_SIZE = 10;

function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);

  // Autoplay pagination logic
  useEffect(() => {
    const totalPages = Math.ceil(zabbixData.length / PAGE_SIZE);
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev < totalPages ? prev + 1 : 1));
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-semibold text-[#840F59] mb-8 text-center">
        Global Network Operation Centre
      </h1>

      <Card title="Zabbix Monitoring Services" className="mb-8">
        <Table
          columns={columns}
          dataSource={zabbixData}
          pagination={{
            pageSize: PAGE_SIZE,
            current: currentPage,
            onChange: (page) => setCurrentPage(page),
          }}
          bordered
          scroll={{ x: "max-content" }}
        />
      </Card>
    </div>
  );
}

export default Dashboard;
