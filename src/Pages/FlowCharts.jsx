import { useState } from "react";
import { Card, Modal } from "antd";

const FlowCharts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-5">
      <Card
        title="NOC Flowchart"
        hoverable
        className="cursor-pointer rounded-lg"
        onClick={() => setIsModalOpen(true)}
      >
        <p>Click to view the full organizational flowchart</p>
      </Card>

      <Modal
        title="Services - Network Operation Center Organogram"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={1100}
      >
        <div className="flex flex-col items-center gap-6 mt-6">
          {/* Top Level */}
          <div className="bg-yellow-300 px-6 py-3 rounded-md font-semibold text-black shadow">
            Service Operation Head
          </div>

          {/* Connector */}
          <div className="w-1 h-6 bg-black" />

          {/* Manager */}
          <div className="bg-gray-300 px-6 py-3 rounded-md font-semibold text-black shadow">
            NOC Manager
          </div>

          {/* Engineers and Analysts */}
          <div className="flex flex-row justify-center gap-10 mt-8 flex-wrap">
            {/* Left Block - Engineer & Analysts */}
            <div className="flex flex-col items-center gap-4">
              <div className="bg-green-200 px-4 py-2 rounded-md font-semibold text-black shadow">
                NOC Engineer
              </div>
              <div className="bg-blue-200 px-4 py-2 rounded-md text-black shadow">
                NOC Analyst
              </div>
              <div className="bg-blue-200 px-4 py-2 rounded-md text-black shadow">
                NOC Analyst
              </div>
              <div className="bg-blue-200 px-4 py-2 rounded-md text-black shadow">
                NOC Analyst
              </div>
            </div>

            {/* Center Block - Analysts */}
            <div className="flex flex-col items-center gap-4">
              <div className="bg-blue-200 px-4 py-2 rounded-md text-black shadow">
                NOC Analyst
              </div>
              <div className="bg-blue-200 px-4 py-2 rounded-md text-black shadow">
                NOC Analyst
              </div>
            </div>

            {/* Right Block - Engineer & Analysts */}
            <div className="flex flex-col items-center gap-4">
              <div className="bg-green-200 px-4 py-2 rounded-md font-semibold text-black shadow">
                NOC Engineer
              </div>
              <div className="bg-blue-200 px-4 py-2 rounded-md text-black shadow">
                NOC Analyst
              </div>
              <div className="bg-blue-200 px-4 py-2 rounded-md text-black shadow">
                NOC Analyst
              </div>
              <div className="bg-blue-200 px-4 py-2 rounded-md text-black shadow">
                NOC Analyst
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FlowCharts;
