import { Card, Pagination } from "antd";
import { useEffect, useState } from "react";
import { zabbixData } from "../utility/constant";
import { ArrowLeftCircle } from "lucide-react";

const PAGE_SIZE = 6;

const isBay2 = (zabbix) => {
  const bay2Zabbix = ["Australia zabbix", "S3 zabbix", "SFE zabbix"];
  return bay2Zabbix.includes(zabbix);
};

function Dashboard() {
  const [selectedService, setSelectedService] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [autoPlay, setAutoPlay] = useState(true);

  // Split data by Bay
  const bay1Data = zabbixData.filter((d) => !isBay2(d.zabbix));
  const bay2Data = zabbixData.filter((d) => isBay2(d.zabbix));

  // Paginate each Bay separately
  const paginatedBay1 = [];
  for (let i = 0; i < bay1Data.length; i += PAGE_SIZE) {
    paginatedBay1.push({
      bay: "Bay 1",
      data: bay1Data.slice(i, i + PAGE_SIZE),
    });
  }

  const paginatedBay2 = [];
  for (let i = 0; i < bay2Data.length; i += PAGE_SIZE) {
    paginatedBay2.push({
      bay: "Bay 2",
      data: bay2Data.slice(i, i + PAGE_SIZE),
    });
  }

  const allPages = [...paginatedBay1, ...paginatedBay2];
  const totalPages = allPages.length;

  // Auto-rotate slides
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev < totalPages ? prev + 1 : 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [autoPlay, totalPages]);

  const currentSlide = allPages[currentPage - 1];

  const handleCardClick = (record) => {
    setSelectedService(record);
  };

  const handleBack = () => {
    setSelectedService(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-semibold text-[#840F59] mb-8 text-center">
        Global Network Operation Centre
      </h1>

      {!selectedService ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-semibold text-[#840F59]">
              {currentSlide?.bay}
            </span>
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className="px-4 py-2 bg-[#840F59] text-white rounded shadow hover:bg-[#a73f7f] transition"
            >
              {autoPlay ? "Stop" : "Start"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {currentSlide?.data.map((service) => (
              <Card
                key={service.key}
                title={service.serviceName}
                onClick={() => handleCardClick(service)}
                className="cursor-pointer border border-[#840F59] shadow-md hover:shadow-xl transition duration-300"
                style={{ backgroundColor: "#fce7f2" }}
                headStyle={{ color: "#840F59" }}
              >
                <p className="text-[#840F59] font-medium">
                  Zabbix: {service.zabbix || "N/A"}
                </p>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <Pagination
              current={currentPage}
              total={totalPages * PAGE_SIZE}
              pageSize={PAGE_SIZE}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
            />
          </div>
        </>
      ) : (
        <Card
          title={selectedService.serviceName}
          extra={
            <ArrowLeftCircle
              className="text-[#840F59] cursor-pointer"
              size={28}
              onClick={handleBack}
            />
          }
          className="border border-[#840F59] shadow-lg mt-4"
          style={{ backgroundColor: "#fce7f2" }}
          headStyle={{ color: "#840F59" }}
        >
          <p>
            <strong>Zabbix:</strong> {selectedService.zabbix || "N/A"}
          </p>
          <p>
            <strong>IP Address:</strong> {selectedService.ip || "N/A"}
          </p>
          <p>
            <strong>Data Centre:</strong> {selectedService.dataCentre || "N/A"}
          </p>
          <p>
            <strong>Version:</strong> {selectedService.version || "N/A"}
          </p>
          <p>
            <strong>Helpdesk:</strong> {selectedService.primaryTeam || "N/A"}
          </p>
          <p>
            <strong>Resolver Team:</strong>{" "}
            {selectedService.resolverTeam || "N/A"}
          </p>
          <p>
            <strong>Escalation Team:</strong>{" "}
            {selectedService.escalationTeam || "N/A"}
          </p>
          <p>
            <strong>Technical Architect:</strong>{" "}
            {selectedService.technicalArchitect || "N/A"}
          </p>
        </Card>
      )}
    </div>
  );
}

export default Dashboard;
